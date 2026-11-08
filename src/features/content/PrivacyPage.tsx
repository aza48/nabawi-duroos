import Link from "next/link";
import { Breadcrumbs, PageBand } from "@/components/ui";
import { RETENTION_DAYS } from "@/lib/privacy";
import type { Locale } from "@/lib/locale";
import { PrivacyControls } from "./PrivacyControls";

export const PRIVACY_UPDATED = "9 November 2026";
const PRIVACY_UPDATED_AR = "9 نوفمبر 2026";

type Block = { title: string; body: React.ReactNode };

function Section({ title, body }: Block) {
  return (
    <section className="rounded-3xl border border-line bg-card p-6 md:p-8">
      <h2 className="font-heading text-2xl font-bold">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed">{body}</div>
    </section>
  );
}

const li = "flex gap-3";
const dot = <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold-bright" />;

function en(helpContact: string): Block[] {
  return [
    {
      title: "In short",
      body: (
        <>
          <p>MESH counts visits so the admins can see which pages help and which need work. The count is anonymous: no account, no name, no email address and no IP address is kept. Nothing is sold, shared with advertisers or used for adverts. There are no adverts on this site.</p>
          <p>Everything below applies to medinahub.org in English and Arabic.</p>
        </>
      ),
    },
    {
      title: "What is counted when you browse",
      body: (
        <>
          <p>The site keeps a random id in your browser. It is a string of letters and numbers with nothing about you in it, and it is not shared with any other site. With that id the site records:</p>
          <ul className="grid gap-2">
            <li className={li}>{dot}<span>the pages you open and when, how long each page was open and how far down you scrolled</span></li>
            <li className={li}>{dot}<span>the links and buttons you tap: the text on them and where they led</span></li>
            <li className={li}>{dot}<span>where your visit started: only the name of the site that sent you, such as Google or WhatsApp, never the full address</span></li>
            <li className={li}>{dot}<span>your country, region and city, worked out from your connection by the hosting service; the address itself is not stored</span></li>
            <li className={li}>{dot}<span>the kind of device, browser and system, the screen width and the browser language</span></li>
          </ul>
          <p>Visits are deleted automatically after {RETENTION_DAYS} days. Only the admins see them, as page totals and short visit summaries. The data lives in the site's own database in Frankfurt and is never handed to an analytics company.</p>
        </>
      ),
    },
    {
      title: "What stays on your phone only",
      body: (
        <>
          <p>A few settings are saved in your browser so the site remembers them next time. They never leave your device:</p>
          <ul className="grid gap-2">
            <li className={li}>{dot}<span>your language, English or Arabic (a cookie and a browser setting, kept for one year)</span></li>
            <li className={li}>{dot}<span>light or dark theme</span></li>
            <li className={li}>{dot}<span>the steps you tick off in a guide and the checklists you fill in</span></li>
            <li className={li}>{dot}<span>which phone alerts you switched on</span></li>
          </ul>
        </>
      ),
    },
    {
      title: "Phone alerts",
      body: (
        <>
          <p>If you turn on the morning brief or change alerts, your browser gives the site a delivery address and two keys for it. They are saved so the alerts can reach you, together with the topics you chose. Nothing else is attached to them. Turn alerts off with the same button and the address is deleted. An address that stops working is removed automatically.</p>
          <p>Alerts are free and need no account. Manage them on <Link href="/more#alerts" className="font-semibold text-primary underline-offset-2 hover:underline">the More page</Link> or on a shaykh's page.</p>
        </>
      ),
    },
    {
      title: "Videos, maps and library files",
      body: (
        <>
          <p>A video inside a guide loads from YouTube only when you press play, in YouTube's privacy mode. Course books in the library open on Google Drive, and livestreams open on YouTube, Mixlr or Telegram. Once you are on one of those services, its own rules apply.</p>
        </>
      ),
    },
    {
      title: "Admins",
      body: (
        <p>Only the admins have accounts. Their sign-in uses a session cookie and a passkey or a code from an authenticator app, and every change they make to the site is written to an audit log. None of this touches readers.</p>
      ),
    },
    {
      title: "Switch counting off",
      body: (
        <>
          <p>Use the button below to stop counting on this device. The random id is removed at once and no new one is created. The choice is kept in this browser, so repeat it on each device you use. If your browser sends the Global Privacy Control signal, counting is off automatically.</p>
          <PrivacyControls />
        </>
      ),
    },
    {
      title: "Questions",
      body: (
        <p>
          To ask about any of this, or to have a visit removed, please message Admin on WhatsApp at{" "}
          <a href={`https://wa.me/${helpContact.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline-offset-2 hover:underline" dir="ltr">{helpContact}</a>.
          This page was last updated on {PRIVACY_UPDATED}.
        </p>
      ),
    },
  ];
}

function arabic(helpContact: string): Block[] {
  return [
    {
      title: "باختصار",
      body: (
        <>
          <p>يعدّ MESH الزيارات ليعرف المشرفون أي الصفحات تنفع القراء وأيها تحتاج إلى عمل. العدّ مجهول الهوية: لا حساب ولا اسم ولا بريد إلكتروني ولا عنوان IP محفوظ. لا يُباع شيء ولا يُشارك مع المعلنين ولا يُستخدم للإعلانات. لا إعلانات في هذا الموقع.</p>
          <p>كل ما يلي ينطبق على medinahub.org بالعربية والإنجليزية.</p>
        </>
      ),
    },
    {
      title: "ما يُعدّ أثناء التصفح",
      body: (
        <>
          <p>يحفظ الموقع معرّفًا عشوائيًا في متصفحك. هو سلسلة من الحروف والأرقام لا تحمل شيئًا عنك، ولا يُشارك مع أي موقع آخر. بهذا المعرّف يسجل الموقع:</p>
          <ul className="grid gap-2">
            <li className={li}>{dot}<span>الصفحات التي تفتحها ووقتها، ومدة بقاء كل صفحة مفتوحة، ومقدار ما نزلت فيها</span></li>
            <li className={li}>{dot}<span>الروابط والأزرار التي تضغطها: نصها ووجهتها</span></li>
            <li className={li}>{dot}<span>من أين بدأت زيارتك: اسم الموقع الذي أرسلك فقط، مثل Google أو WhatsApp، لا العنوان الكامل</span></li>
            <li className={li}>{dot}<span>بلدك ومنطقتك ومدينتك، تُستنتج من اتصالك بواسطة خدمة الاستضافة؛ أما العنوان نفسه فلا يُحفظ</span></li>
            <li className={li}>{dot}<span>نوع الجهاز والمتصفح والنظام، وعرض الشاشة، ولغة المتصفح</span></li>
          </ul>
          <p>تُحذف الزيارات تلقائيًا بعد {RETENTION_DAYS} يومًا. لا يراها إلا المشرفون، في صورة مجاميع للصفحات وملخصات قصيرة للزيارات. تُحفظ البيانات في قاعدة بيانات الموقع نفسه في فرانكفورت، ولا تُسلَّم لأي شركة تحليلات.</p>
        </>
      ),
    },
    {
      title: "ما يبقى في جهازك فقط",
      body: (
        <>
          <p>تُحفظ بعض الإعدادات في متصفحك ليتذكرها الموقع في المرة القادمة، ولا تغادر جهازك أبدًا:</p>
          <ul className="grid gap-2">
            <li className={li}>{dot}<span>لغتك، العربية أو الإنجليزية (ملف تعريف ارتباط وإعداد في المتصفح لمدة سنة)</span></li>
            <li className={li}>{dot}<span>المظهر الفاتح أو الداكن</span></li>
            <li className={li}>{dot}<span>الخطوات التي تضع عليها علامة في الأدلة والقوائم التي تملؤها</span></li>
            <li className={li}>{dot}<span>التنبيهات التي فعّلتها</span></li>
          </ul>
        </>
      ),
    },
    {
      title: "تنبيهات الجوال",
      body: (
        <>
          <p>إذا فعّلت ملخص الصباح أو تنبيهات التغييرات، يعطي متصفحك الموقع عنوان تسليم ومفتاحين له. تُحفظ ليصلك التنبيه، مع المواضيع التي اخترتها، ولا يُربط بها شيء آخر. أوقف التنبيهات بالزر نفسه فيُحذف العنوان. والعنوان الذي يتوقف عن العمل يُحذف تلقائيًا.</p>
          <p>التنبيهات مجانية ولا تحتاج إلى حساب. أدرها من <Link href="/ar/more#alerts" className="font-semibold text-primary underline-offset-2 hover:underline">صفحة المزيد</Link> أو من صفحة الشيخ.</p>
        </>
      ),
    },
    {
      title: "الفيديو والخرائط وملفات المكتبة",
      body: (
        <p>الفيديو داخل الدليل لا يُحمَّل من YouTube إلا عند الضغط على التشغيل، وبوضع الخصوصية. كتب المكتبة تُفتح على Google Drive، والبث المباشر يُفتح على YouTube أو Mixlr أو Telegram. وحين تنتقل إلى إحدى هذه الخدمات تسري قواعدها هي.</p>
      ),
    },
    {
      title: "المشرفون",
      body: (
        <p>لا حسابات إلا للمشرفين. يدخلون بملف جلسة ومفتاح مرور أو رمز من تطبيق المصادقة، وكل تغيير يجرونه على الموقع يُكتب في سجل المراجعة. لا علاقة لشيء من هذا بالقراء.</p>
      ),
    },
    {
      title: "إيقاف العدّ",
      body: (
        <>
          <p>استخدم الزر أدناه لإيقاف العدّ على هذا الجهاز. يُحذف المعرّف العشوائي فورًا ولا يُنشأ غيره. يُحفظ اختيارك في هذا المتصفح، فكرره على كل جهاز تستخدمه. وإذا كان متصفحك يرسل إشارة Global Privacy Control فالعدّ متوقف تلقائيًا.</p>
          <PrivacyControls locale="ar" />
        </>
      ),
    },
    {
      title: "أسئلة",
      body: (
        <p>
          للسؤال عن أي مما سبق، أو لطلب حذف زيارة، راسل المشرف على واتساب:{" "}
          <a href={`https://wa.me/${helpContact.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline-offset-2 hover:underline" dir="ltr">{helpContact}</a>.
          آخر تحديث لهذه الصفحة: {PRIVACY_UPDATED_AR}.
        </p>
      ),
    },
  ];
}

export function PrivacyPage({ helpContact, locale = "en" }: { helpContact: string; locale?: Locale }) {
  const ar = locale === "ar";
  const blocks = ar ? arabic(helpContact) : en(helpContact);
  return (
    <>
      <PageBand
        title={ar ? "الخصوصية" : "Privacy"}
        subtitle={ar ? "ما يحتفظ به الموقع عن زيارتك، ولماذا، وكيف توقفه." : "What this site keeps about your visit, why, and how to switch it off."}
      >
        <div className="mt-5">
          <Breadcrumbs tone="band" rtl={ar} items={[[ar ? "الرئيسية" : "Home", ar ? "/ar" : "/"], [ar ? "المزيد" : "More", ar ? "/ar/more" : "/more"], [ar ? "الخصوصية" : "Privacy"]]} />
        </div>
      </PageBand>
      <div className="shell mt-10 md:mt-14">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {blocks.map((b) => (
            <Section key={b.title} {...b} />
          ))}
        </div>
      </div>
    </>
  );
}
