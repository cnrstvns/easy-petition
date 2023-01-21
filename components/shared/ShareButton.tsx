import React, { useState, useCallback } from 'react';
import { ShareIcon, CheckIcon } from '@heroicons/react/20/solid';
import copy from 'copy-to-clipboard';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    setCopied(true);

    copy(window.location.toString());

    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm focus:bg-indigo-800 focus:outline-none"
    >
      {!copied && (
        <ShareIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
      )}
      {copied && (
        <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
      )}
      {!copied && 'Share'}
      {copied && 'Copied'}
    </button>
  );
}
