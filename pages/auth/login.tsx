import { signIn } from 'next-auth/react';
import React, { useCallback } from 'react';

export default function Login() {
  const handleSignIn = useCallback(() => signIn('discord'), []);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center px-5 py-20 bg-white space-y-5">
      <div
        className="hidden sm:absolute sm:inset-y-0 sm:block sm:h-full sm:w-full overflow-hidden"
        aria-hidden="true"
      >
        <div className="relative mx-auto h-full max-w-7xl">
          <svg
            className="absolute right-full translate-y-1/4 translate-x-1/4 transform lg:translate-x-1/2"
            width={404}
            height={784}
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={784}
              fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
            />
          </svg>
          <svg
            className="absolute left-full -translate-y-3/4 -translate-x-1/4 transform md:-translate-y-1/2 lg:-translate-x-1/2"
            width={404}
            height={784}
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={784}
              fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
            />
          </svg>
        </div>
      </div>

      <div className="text-gray-800 font-medium opacity-90 text-2xl mx-auto">
        Log in to Easy Petition
      </div>
      <button
        className="relative w-72 flex mx-auto text-center items-center text-white font-medium h-10 justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 hover:bg-indigo-700 md:py-3 md:px-10 md:text-lg"
        type="button"
        onClick={handleSignIn}
      >
        Sign in with Discord
      </button>
    </div>
  );
}
