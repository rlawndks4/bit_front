import { useEffect } from 'react';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/manager/kakao-channel') {
      router.push('/manager/kakao-channel/list');
    }
  });
  return null;
}
