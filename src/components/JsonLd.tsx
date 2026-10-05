/**
 * Renders a JSON-LD block. Server-rendered so structured data is present in
 * the initial HTML, which is what crawlers read.
 */
export function JsonLd({ json }: { json: string }) {
  return (
    <script
      type="application/ld+json"
      // Content is produced by our own serialiser from typed content objects,
      // never from user input.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
