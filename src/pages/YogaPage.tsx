
import React from 'react';
import Layout from '@/components/Layout';
import YogaSessionTracker from '@/components/Yoga/YogaSessionTracker';

const YogaPage = () => {
  return (
    <Layout>
      <div className="space-y-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold">7-Minute Yoga</h1>
        <p className="text-muted-foreground">
          Follow along with this simple yoga routine designed to improve flexibility and mindfulness.
        </p>
        <YogaSessionTracker />
      </div>
    </Layout>
  );
};

export default YogaPage;
