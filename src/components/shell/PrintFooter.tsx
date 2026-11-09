import QRCode from "qrcode";
import type { Locale } from "@/lib/locale";
import { PRINT_SCAN_LABEL, printLink } from "./print-link";

/**
 * Shown on paper only (print.css): the page address and a QR code that opens it on a phone.
 * Server only: the QR is drawn as an inline SVG at render time, so printing needs no script.
 */
export async function PrintFooter({ path, locale = "en" }: { path: string; locale?: Locale }) {
  const { href, label } = printLink(path);
  const svg = await QRCode.toString(href, { type: "svg", margin: 0, errorCorrectionLevel: "M" });
  return (
    <aside className="print-footer" data-print-footer aria-hidden="true">
      <span className="print-qr" dangerouslySetInnerHTML={{ __html: svg }} />
      <span className="print-footer-text">
        <span className="print-footer-label">{PRINT_SCAN_LABEL[locale === "ar" ? "ar" : "en"]}</span>
        <span className="print-footer-url" dir="ltr">{label}</span>
      </span>
    </aside>
  );
}
