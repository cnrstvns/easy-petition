import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PencilSquareIcon, CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { signPetition } from '../../services/petition';

export default function SignPetition() {
  const router = useRouter();
  const { status, data: session } = useSession();
  const { register, handleSubmit } = useForm();
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { mutate } = useSWR(['/api/v1/signatures', { petition: router.query.id }]);
  const { data: petition } = useSWR(router.query.id && ['/api/v1/petitions', { id: router.query.id }]);
  const { data: signature } = useSWR(router.query.id && ['/api/ajax/signatures', { petition: router.query.id }]);

  const onSubmit = React.useCallback((values) => {
    setLoading(true);

    return signPetition(petition.id, values.content)
      .then(() => mutate())
      .then(() => setIsOpen(false));
  }, [petition]);

  const handleClick = React.useCallback(() => {
    if (status === 'unauthenticated') router.push('/auth/login');
    else setIsOpen(!isOpen);
  }, [status]);

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={!!signature}
        className={clsx('inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:bg-gray-100 focus:outline-none', {
          'cursor-not-allowed': !!signature,
        })}
      >
        {(!signature && !session) && <ArrowRightIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />}
        {(!signature && session) && <PencilSquareIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />}
        {signature && <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />}
        <span>{session ? signature ? 'Signed petition' : 'Sign petition' : 'Sign in'}</span>
      </button>

      <Transition show={isOpen} as={React.Fragment}>
        <Dialog
          className="relative z-50"
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="fixed inset-0 flex items-center justify-center">
                <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
                  <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                          <Dialog.Title className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Sign petition</Dialog.Title>
                          <Dialog.Description className="mt-2 text-sm text-gray-500">
                            Are you sure you want to sign the "
                            {petition?.title}
                            " petition? This action cannot be undone.
                          </Dialog.Description>
                        </div>
                      </div>
                      <div className="mt-3">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                          Leave a comment
                          <div className="mt-1">
                            <textarea
                              rows={4}
                              name="content"
                              placeholder="This is what I have to say..."
                              id="content"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              {...register('content', { required: true })}
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        {loading ? (
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                        ) : 'Sign'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </div>
            </form>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
