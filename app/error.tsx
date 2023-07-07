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
    <div className={'w-full bg-white text-slate'}>
      <div>ERROR</div>
      <p>Something went wrong!</p>
      <button onClick={() => reset()}>Reset error boundary</button>
    </div>
  );
}
