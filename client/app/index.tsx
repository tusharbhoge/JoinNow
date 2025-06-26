import { useQuery } from '@tanstack/react-query';
import { getClient } from '../src/lib/graphqlClient';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

const EVENTS_QUERY = `query {
  events {
    id
    name
    location
  }
}`;

export default function EventList() {
  const { data, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const client = getClient();
      const res = await client.request<{ events: { id: string; name: string; location: string }[] }>(EVENTS_QUERY);
      return res.events;
    },
  });

  const router = useRouter();

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => router.push(`/event/${item.id}`)}>
          <View style={{ padding: 16, borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text>{item.location}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
