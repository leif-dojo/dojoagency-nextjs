'use client';
import '../styles/globals.scss'
import { useEffect } from 'react';


export default function Error({
  error,
  reset
}: {
  error: any,
  reset: any
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={'w-full bg-white text-slate px-50 md:px-100 py-200'}>
      <div className={`text-70 leading-none text-center`}>ERROR</div>
      <div className={`text-30 leading-none text-center`}> Something went wrong!</div>
      <button onClick={() => reset()}>Reset error boundary</button>
    </div>
  );
}
