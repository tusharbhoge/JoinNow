import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { getClient } from '../../src/lib/graphqlClient';
import { View, Text, Button, FlatList } from 'react-native';
import { useAuth } from '../../src/state/authStore';
import { io } from 'socket.io-client';

const JOIN_EVENT = `mutation JoinEvent($eventId: String!) {
  joinEvent(eventId: $eventId) {
    id
    attendees {
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

  useEffect(() => {
    socket.on('attendeeUpdate', ({ eventId: updatedId, attendees }) => {
      if (updatedId === eventId) setAttendees(attendees);
    });

    return () => {
      socket.off('attendeeUpdate');
    };
  }, []);

  const joinEvent = async () => {
    const client = getClient();
    const res = await client.request<{ joinEvent: { attendees: { name: string; email: string }[] } }>(JOIN_EVENT, { eventId });
    setAttendees(res.joinEvent.attendees);
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Join Event" onPress={joinEvent} />
      <Text style={{ marginTop: 20, fontSize: 18 }}>Attendees:</Text>
      <FlatList
        data={attendees}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => <Text>{item.name} ({item.email})</Text>}
      />
    </View>
  );
}
