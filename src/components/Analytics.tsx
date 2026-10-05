import Script from 'next/script';
import { site } from '@/content/site';

/**
 * Google Analytics 4 loader (SRS §16).
 *
 * Renders nothing at all unless NEXT_PUBLIC_GA_ID is set, so the site ships no
 * third-party script — and sets no cookies — until analytics is deliberately
 * switched on. IP anonymisation is off by default in GA4, but no personal data
 * is sent from this site: conversion events carry only an action label.
 */
export function Analytics() {
  const gaId = site.analytics.gaId;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
