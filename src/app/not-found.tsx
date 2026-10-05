import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * Site-wide 404 for URLs that do not match a language route at all
 * (for example `/services` without an `/en` or `/mr` prefix).
 *
 * This file sits above the `[lang]` root layout, so it has to render its own
 * document. Content is shown in both languages because we cannot know the
 * visitor's preference here — in-language 404s are handled by
 * `[lang]/not-found.tsx`, which does know.
 */
export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <html lang="en-IN">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FBF8F2',
          color: '#15120E',
          fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
          padding: '2rem',
        }}
      >
        <main style={{ maxWidth: '32rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A86E14', margin: 0 }}>
            404
          </p>

          <h1 style={{ fontSize: '1.75rem', margin: '0.75rem 0 0', lineHeight: 1.25 }}>
            Page not found
          </h1>
          <p style={{ color: '#3A342C', marginTop: '0.75rem', lineHeight: 1.6 }}>
            The page you asked for does not exist. It may have been moved or renamed.
          </p>

          <h2 style={{ fontSize: '1.25rem', margin: '2rem 0 0', lineHeight: 1.3 }}>
            पान सापडले नाही
          </h2>
          <p lang="mr" style={{ color: '#3A342C', marginTop: '0.75rem', lineHeight: 1.7 }}>
            तुम्ही शोधलेले पान अस्तित्वात नाही. ते हलवले गेले असेल किंवा त्याचे नाव बदलले असेल.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
            <Link
              href="/en"
              style={{
                background: '#2B5A37',
                color: '#fff',
                padding: '0.7rem 1.15rem',
                borderRadius: '0.25rem',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Go to homepage
            </Link>
            <Link
              href="/mr"
              style={{
                border: '1px solid rgba(43,90,55,0.35)',
                color: '#22472C',
                padding: '0.7rem 1.15rem',
                borderRadius: '0.25rem',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              मुख्यपृष्ठावर जा
            </Link>
          </div>

          <p style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#6B6358' }}>
            Om Agrosphere ·{' '}
            <a href="mailto:omagrosphere@gmail.com" style={{ color: '#2B5A37' }}>
              omagrosphere@gmail.com
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}
