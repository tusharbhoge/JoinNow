import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { getClient } from '../../src/lib/graphqlClient';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '../../src/state/authStore';
import { io } from 'socket.io-client';

const GET_EVENT = `query GetEvent($eventId: ID!) {
  event(id: $eventId) {
    id
    name
    location
    attendees {
      id
      name
      email
    }
  }
}`;

const JOIN_EVENT = `mutation JoinEvent($eventId: String!) {
  joinEvent(eventId: $eventId) {
    id
    name
    location
    attendees {
      id
      name
      email
    }
  }
}`;

const LEAVE_EVENT = `mutation LeaveEvent($eventId: String!) {
  leaveEvent(eventId: $eventId) {
    id
    name
    location
    attendees {
      id
      name
      email
    }
  }
}`;

const socket = io('http://localhost:8000');

export default function EventDetail() {
  const { id: eventId } = useLocalSearchParams();
  const { userId } = useAuth();
  const [attendees, setAttendees] = useState<any[]>([]);
  const [eventInfo, setEventInfo] = useState({ name: '', location: '' });
  const [loading, setLoading] = useState(true);
  const [isAttending, setIsAttending] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const client = getClient();
        const res = await client.request<{
          event: {
            id: string;
            name: string;
            location: string;
            attendees: { id: string; name: string; email: string }[];
          };
        }>(GET_EVENT, { eventId });

        setEventInfo({
          name: res.event.name,
          location: res.event.location
        });
        setAttendees(res.event.attendees);
        setIsAttending(res.event.attendees.some(attendee => attendee.email === userId));
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();

    socket.on('attendeeUpdate', ({ eventId: updatedId, attendees }) => {
      if (updatedId === eventId) {
        setAttendees(attendees);
        setIsAttending(attendees.some((attendee: { email: string }) => attendee.email === userId));
      }
    });

    return () => {
      socket.off('attendeeUpdate');
    };
  }, [eventId, userId]);

  const handleAttendance = async () => {
    setActionLoading(true);
    try {
      const client = getClient();
      if (isAttending) {
        const res = await client.request<{
          leaveEvent: {
            id: string;
            name: string;
            location: string;
            attendees: { id: string; name: string; email: string }[];
          };
        }>(LEAVE_EVENT, { eventId });
        setAttendees(res.leaveEvent.attendees);
      } else {
        const res = await client.request<{
          joinEvent: {
            id: string;
            name: string;
            location: string;
            attendees: { id: string; name: string; email: string }[];
          };
        }>(JOIN_EVENT, { eventId });
        setAttendees(res.joinEvent.attendees);
      }
    } catch (error) {
      console.error('Error updating attendance:', error);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eventName}>{eventInfo.name}</Text>
          <Text style={styles.eventLocation}>{eventInfo.location}</Text>
        </View>
        <Text style={styles.attendeeCount}>{attendees.length} Attending</Text>
      </View>

      <Text style={styles.attendeeTitle}>Attendees:</Text>
      <FlatList
        data={attendees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.attendeeItem}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name?.charAt(0).toUpperCase()}</Text>
            </View>
            <Text style={styles.attendeeName}>{item.name}</Text>
          </View>
        )}
        contentContainerStyle={styles.attendeeList}
      />

      
      <TouchableOpacity 
        style={[
          styles.attendanceButton, 
          isAttending ? styles.leaveButton : styles.joinButton,
          actionLoading && styles.disabledButton
        ]} 
        onPress={handleAttendance}
        disabled={actionLoading}
      >
        {actionLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.attendanceButtonText}>
            {isAttending ? 'Leave Event' : 'Join Event'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  eventName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  eventLocation: {
    fontSize: 16,
    color: '#666',
  },
  attendeeCount: {
    fontSize: 16,
    color: '#444',
  },
  attendeeTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '600',
  },
  attendeeList: {
    paddingBottom: 20,
  },
  attendeeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    backgroundColor: '#ccc',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  attendeeName: {
    fontSize: 16,
  },
  attendanceButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto',
  },
  joinButton: {
    backgroundColor: '#007bff',
  },
  leaveButton: {
    backgroundColor: '#dc3545',
  },
  disabledButton: {
    backgroundColor: '#6c757d',
  },
  attendanceButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});