import useSWR from 'swr';
import { useRouter } from 'next/router';
import React from 'react';
import {
  LockOpenIcon,
  CalendarIcon,
  ChatBubbleLeftEllipsisIcon,
  CheckCircleIcon,
  PencilSquareIcon,
} from '@heroicons/react/20/solid';
import clsx from 'clsx';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import Layout from '../../components/shared/Layout';
import SignPetition from '../../components/petitions/SignPetition';
import ShareButton from '../../components/shared/ShareButton';

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

export default function Petitions() {
  const router = useRouter();
  const { data: petition } = useSWR(['/api/v1/petitions', { id: router.query.id }]);
  const { data: signatures } = useSWR(['/api/v1/signatures', { petition: router.query.id }]);

  const goalMet = petition?.signature_goal < petition?._count.signatures;

  return (
    <Layout>
      <div className="flex min-h-full">
        <div className="flex w-0 flex-1 flex-col">
          <main className="flex-1">
            <div className="py-8 xl:py-10">
              <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 xl:grid xl:max-w-5xl xl:grid-cols-3">
                <div className="xl:col-span-2 xl:border-r xl:border-gray-200 xl:pr-8">
                  <div className="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full mr-3" src={petition?.user.avatar} />
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900">{petition?.title}</h1>
                        <div className="text-sm text-gray-500">
                          proposed by
                          {' '}
                          <a href="#" className="font-medium text-gray-900">
                            {petition?.user.username}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-3 md:mt-0">
                      <ShareButton />
                      <SignPetition />
                    </div>
                  </div>
                  <aside className="mt-8 xl:hidden">
                    <div className="space-y-5">
                      <div className="flex items-center space-x-2">
                        {goalMet
                          ? <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
                          : <LockOpenIcon className="h-5 w-5 text-red-400" aria-hidden="true" />}
                        <span className={clsx(
                          'text-sm font-medium text-green-700',
                          {
                            'text-green-700': goalMet,
                            'text-red-700': !goalMet,
                          },
                        )}
                        >
                          Goal
                          {!goalMet && ' not'}
                          {' '}
                          reached
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span className="text-sm font-medium text-gray-900">
                          {petition?._count.signatures}
                          {' '}
                          signature
                          {petition?._count.signatures > 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span className="text-sm font-medium text-gray-900">
                          Created on
                          {' '}
                          {dayjs(petition?.created).format('LLL')}
                        </span>
                      </div>
                    </div>

                  </aside>
                  <div className="py-5 xl:pt-6 xl:pb-0">
                    <span className="text-lg font-medium text-gray-900">
                      Description
                    </span>
                    <div className="prose max-w-none opacity-80">
                      {petition?.description}
                    </div>
                  </div>
                  <section className="mt-8 xl:mt-10">
                    <div className="divide-y divide-gray-200">
                      <div className="pb-4">
                        <h2 className="text-lg font-medium text-gray-900">
                          Signatures
                        </h2>
                      </div>
                      <div className="pt-6">
                        <div className="flow-root">
                          <ul className="-mb-8">
                            {signatures?.map((signature, itemIdx) => (
                              <li key={signature.user.id}>
                                <div className="relative pb-8">
                                  {itemIdx !== signatures.length - 1 ? (
                                    <span
                                      className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                                      aria-hidden="true"
                                    />
                                  ) : null}
                                  <div className="relative flex items-start space-x-3">
                                    <>
                                      <div className="relative">
                                        <img
                                          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                                          src={signature.user.avatar}
                                          alt=""
                                        />
                                      </div>
                                      <div className="min-w-0 flex-1">
                                        <div>
                                          <div className="text-sm">
                                            <div className="font-medium text-gray-900">
                                              {signature.user.username}
                                            </div>
                                          </div>
                                          <div className="mt-0.5 text-sm text-gray-500">
                                            Signed
                                            {' '}
                                            {dayjs(signature.created).fromNow()}
                                          </div>
                                        </div>
                                        <div className="mt-2 text-sm text-gray-700">
                                          <div>{signature.content}</div>
                                        </div>
                                      </div>
                                    </>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                <aside className="hidden xl:block xl:pl-8">
                  <div className="space-y-5">
                    <div className="flex items-center space-x-2">
                      {goalMet
                        ? <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
                        : <LockOpenIcon className="h-5 w-5 text-red-400" aria-hidden="true" />}
                      <span className={clsx(
                        'text-sm font-medium text-green-700',
                        {
                          'text-green-700': goalMet,
                          'text-red-700': !goalMet,
                        },
                      )}
                      >
                        Goal
                        {' '}
                        {!goalMet && 'not'}
                        {' '}
                        reached
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <PencilSquareIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span className="text-sm font-medium text-gray-900">
                        {petition?._count.signatures}
                        /
                        {petition?.signature_goal}
                        {' '}
                        signatures
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span className="text-sm font-medium text-gray-900">
                        Created on
                        {' '}
                        {dayjs(petition?.created).format('LLL')}
                      </span>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}
