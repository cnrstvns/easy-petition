import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

export default function ActionCall() {
  return (
    <div className="bg-indigo-700 rounded-md mb-8">
      <div className="mx-auto max-w-2xl py-12 px-8 text-center sm:px-10 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          <span className="block">Vote your friends out of a Discord server.</span>
          <span className="block">Get started today.</span>
        </h2>
        <button
          type="button"
          className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50 sm:w-auto"
        >
          Create a petition now
          <ArrowRightIcon className="block h-6 w-6 ml-1" />
        </button>
      </div>
    </div>
  );
}
