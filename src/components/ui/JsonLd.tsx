/**
 * Renders schema.org structured data as a JSON-LD script tag. Angle brackets
 * are escaped so that no value can close the script element early.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data).replace(/</g, '\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
