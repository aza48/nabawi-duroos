/**
 * Server-rendered JSON-LD structured-data block. `<` is escaped so
 * user-generated text can never break out of the script element.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
