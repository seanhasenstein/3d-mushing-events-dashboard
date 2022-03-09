import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function useAuthSession() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login');
    },
  });

  return { session, isLoading: status === 'loading' };
}
