import React from 'react';
import Layout from '@/components/Layout';
import YogaSessionTracker from '@/components/Yoga/YogaSessionTracker';

const YogaPage = () => {
  return (
    <Layout>
      <div className="overflow-y-auto min-h-screen px-4">
        <div className="space-y-4 max-w-md mx-auto py-8">
          <h1 className="text-2xl font-bold text-center md:text-left">7-Minute Yoga</h1>
          <p className="text-muted-foreground text-center md:text-left">
            Follow along with this simple yoga routine designed to improve flexibility and mindfulness.
          </p>
          <YogaSessionTracker />
        </div>
      </div>
    </Layout>
  );
};

export default YogaPage;
