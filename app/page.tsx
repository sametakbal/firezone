// File: app/(main)/page.tsx
import Feed from '@/components/feed';
import MainLayout from '@/layout/main-layout';

export default function HomePage() {
  return (
    <MainLayout>
      <Feed />
    </MainLayout>
  );
}