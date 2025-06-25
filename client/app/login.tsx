import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useAuth } from '../src/state/authStore';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const { setUserId } = useAuth();
  const router = useRouter();

  const login = () => {
    setUserId(email);
    router.replace('/');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Enter your email:</Text>
      <TextInput value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginVertical: 10 }} />
      <Button title="Login" onPress={login} />
    </View>
  );
}
