import { Slot, useRouter, useSegments } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from '../src/state/authStore';
import { useEffect, useState } from 'react';

const queryClient = new QueryClient();

function AuthGate({ children }: { children: React.ReactNode }) {
  const { userId } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  const [ready, setReady] = useState(false);
  const isInAuthGroup = segments[0] === 'login';

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    if (!userId && !isInAuthGroup) {
      router.replace('/login');
    } else if (userId && isInAuthGroup) {
      router.replace('/');
    }
  }, [ready, userId, isInAuthGroup]);

  return <>{children}</>;
}

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthGate>
        <Slot />
      </AuthGate>
    </QueryClientProvider>
  );
}
