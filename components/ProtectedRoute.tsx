import React from 'react';
import useAuthSession from '../hooks/useAuthSession';

type Props = {
  children: JSX.Element;
};

export default function ProtectedRoute({ children }: Props) {
  const { isLoading } = useAuthSession();
  if (isLoading) return <div />;
  return children;
}
