import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getClient } from '../src/lib/graphqlClient';
import { FlatList, Text, TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const EVENTS_QUERY = `query {
  events {
    id
    name
    location
    attendees {
      id
    }
  }
}`;

const socket = io('http://localhost:8000'); 

export default function EventList() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const client = getClient();
      const res = await client.request<{ 
        events: { 
          id: string; 
          name: string; 
          location: string; 
          attendees: { id: string }[]; 
        }[] 
      }>(EVENTS_QUERY);
      return res.events;
    },
  });

  useEffect(() => {
    socket.on('attendeeUpdate', ({ eventId, attendees }) => {
      queryClient.setQueryData(['events'], (oldEvents: any) => {
        return oldEvents?.map((event: any) => {
          if (event.id === eventId) {
            return { ...event, attendees };
          }
          return event;
        });
      });
    });

    return () => {
      socket.off('attendeeUpdate');
    };
  }, [queryClient]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/event/${item.id}`)}>
            <View style={styles.card}>
              <View style={styles.cardRow}>
                <View>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.location}>{item.location}</Text>
                </View>
                <Text style={styles.count}>{item.attendees.length} Joined</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    maxWidth: 500, 
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
  },
  card: {
    padding: 16,
    width:350,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2, 
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#555',
  },
  cardRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
count: {
  fontSize: 16,
  fontWeight: '500',
  color: '#333',
},

});
