import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
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
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.heading}>Login</Text>
        <Text style={styles.label}>Enter your email:</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="tushar@email.com"
          placeholderTextColor="#888"
          style={styles.input}
          keyboardType="email-address"
        />
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={login} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  box: {
    width: '100%',
    maxWidth: 400, 
    alignSelf: 'center',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
