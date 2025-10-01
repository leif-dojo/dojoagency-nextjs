// app/components/LazyWidgets.tsx
'use client';

import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

const CookieConsent = dynamic(() => import('@/components/generic/cookie_consent/cookie_consent'), { ssr: false });
const MouseCursor = dynamic(() => import('@/components/generic/mouse_cursor/mouse_cursor'), { ssr: false });
//const InstallPrompt = dynamic(() => import('@/components/InstallPrompt'), { ssr: false });

export default function LazyWidgets({ data }: { data: any }) {
    return (
        <Suspense fallback={null}>
            <MouseCursor />
            <CookieConsent data={data.consent} />
            
        </Suspense>
    );
}
