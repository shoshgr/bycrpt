'use client'

import React from 'react';
import UserPage from '@/app/components/UserPage';

interface UserPageProps {
  params: {
    userId: string;
  };
}

const page: React.FC<UserPageProps> = ({ params }) => {
  return (
    <div>

      <UserPage userId={params.userId} />
    </div>
  );
};

export default page;
