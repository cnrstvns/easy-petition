import React from 'react';
import PetitionList from '../../components/petitions/PetitionList';
import Layout from '../../components/shared/Layout';
import ActionCall from '../../components/petitions/ActionCall';

export default function Petitions() {
  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mx-auto max-w-5xl">
          <ActionCall />
        </div>
        <div className="mx-auto max-w-3xl">
          <PetitionList />
        </div>
      </div>
    </Layout>
  );
}
