"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export type MeshLang = "en" | "ar";
export type MeshTheme = "light" | "dark";

const en: Record<string, string> = {
  "brand.sub": "Medinah English Students Hub",
  "nav.home": "Home", "nav.browse": "Browse Discussions", "nav.gettingStarted": "Getting Started",
  "nav.login": "Log In", "nav.logout": "Log out", "nav.ask": "Ask a Question",
  "nav.searchPh": "Search questions…", "nav.searchAria": "Search discussions", "nav.main": "Main", "nav.footer": "Footer", "nav.menu": "Menu", "nav.close": "Close menu",
  "theme.toggle": "Toggle dark mode", "lang.toggle": "Switch language",
  "footer.tag": "Medinah English Students Hub — student community, not affiliated with any university or government service.",
  "footer.about": "About", "footer.guidelines": "Community Guidelines", "footer.contact": "Contact", "footer.privacy": "Privacy",
  "demo.banner": "Demonstration mode — sample content shown. Live posting and voting activate when the database is connected.",
  "demo.note": "Sample / demonstration content is shown below and labelled as such.",
  "hero.kicker": "MESH · Medinah English Students Hub",
  "hero.h1a": "New to Madinah?", "hero.h1b": "Find your footing.",
  "hero.sub": "Practical answers, local knowledge, and advice from students who’ve been there.",
  "hero.browse": "Browse Discussions", "hero.ask": "Ask a Question",
  "home.recent": "Recent Discussions", "home.recentSub": "Questions, answers, and advice from the MESH community.",
  "home.searchPh": "Search discussions…", "home.viewAll": "View all discussions",
  "home.browseTopic": "Browse by Topic", "home.browseTopicSub": "Start with the stage you are in, then narrow by subcategory on each category page.",
  "home.help": "Know an answer?", "home.helpLink": "Help another student by answering a question.",
  "home.explore": "Explore", "home.categoriesAria": "Main categories",
  "sort.recent": "Recent", "sort.top": "Most Upvoted", "sort.unanswered": "Unanswered", "sort.aria": "Sort discussions",
  "filter.all": "All",
  "disc.votes": "votes", "disc.answers": "answers", "disc.answer": "answer", "disc.solved": "Solved", "disc.sample": "Sample",
  "disc.emptyTitle": "No discussions found", "disc.emptySub": "Try a different search or category, or ask the first question.",
  "time.now": "just now",
  "browse.title": "Browse Discussions", "browse.sub": "Search and filter questions from students in Madinah.", "browse.subDemo": "Showing sample / demonstration content.",
  "browse.searchPh": "Search titles, answers, tags…", "browse.allSubcats": "All subcategories", "browse.loadMore": "Load more", "browse.remaining": "remaining", "browse.loading": "Loading…",
  "cat.notFound": "Category not found", "cat.backBrowse": "Back to browse", "cat.searchPh": "Search within this category…", "cat.searchAria": "Search in category",
  "cat.notAffiliated": "MESH is a student community and is not affiliated with or endorsed by Nafath, Absher, any university, or any government service. Always confirm procedures on the official source.",
  "common.loading": "Loading…", "common.home": "Home",
  "ask.title": "Ask a Question", "ask.helper": "Describe your situation, what you've tried, and what you need help with. Avoid sharing private documents or sensitive personal information.",
  "ask.needAccount": "You need an account to post, so answers and votes stay trustworthy.", "ask.loginToAsk": "Log in to ask", "ask.createAccount": "Create account",
  "ask.dbNote": "Note: the database is not connected yet, so posting is in demonstration mode.",
  "ask.fieldTitle": "Question title", "ask.titlePh": "e.g. Can I complete Nafath registration before my Iqama is issued?", "ask.titleHint": "A specific title helps the right students find and answer your question.",
  "ask.mainCat": "Main category", "ask.subCat": "Subcategory (optional)", "ask.none": "— None —", "ask.details": "Details", "ask.tags": "Tags (comma separated, optional)", "ask.tagsPh": "Nafath, Absher",
  "ask.errTitle": "Title must be at least 10 characters — be specific about what you need.", "ask.errBody": "Please add more detail (at least 20 characters).",
  "ask.errDemo": "Demonstration mode: live posting activates when the database is connected. Your question was not saved.", "ask.errSignin": "Please sign in to post a question.", "ask.errPost": "Could not post question.",
  "ask.posting": "Posting…", "ask.post": "Post Question",
  "auth.loginTitle": "Log in to MESH", "auth.signupTitle": "Create your MESH account", "auth.welcome": "Welcome back.", "auth.signupSub": "Use any display name — you do not need to use your legal name.",
  "auth.displayName": "Display name", "auth.email": "Email", "auth.password": "Password", "auth.pwHint": "At least 8 characters.",
  "auth.wait": "Please wait…", "auth.loginBtn": "Log in", "auth.signupBtn": "Create account",
  "auth.haveAccount": "Already have an account?", "auth.newTo": "New to MESH?", "auth.createOne": "Create an account", "auth.loginLink": "Log in",
  "auth.resetNote": "Password reset is handled by the site administrator while the community is in its early phase — contact us via the About page.",
  "auth.errAccounts": "Accounts activate when the database is connected. You can still browse all sample discussions without an account.", "auth.errGeneric": "Something went wrong.",
  "q.notFound": "Question not found", "q.browse": "Browse discussions", "q.sampleNote": "Sample / demonstration content — this question and its answers are seeded examples, not verified official guidance.",
  "q.askedBy": "Asked by", "q.answers": "Answers", "q.answer": "Answer", "q.noAnswers": "No answers yet. If you know this from experience, your answer could help the next student.",
  "q.yourAnswer": "Your answer", "q.answerPh": "Share what worked for you, and note where people should check the official source.",
  "q.postAnswer": "Post Answer", "q.errEmpty": "Answer cannot be empty.", "q.errDemo": "Demonstration mode: posting activates when the database is connected.", "q.errPost": "Could not post answer.",
  "q.markSolution": "Mark as solution", "q.removeSolution": "Remove solution", "q.delete": "Delete", "q.edit": "Edit", "q.save": "Save", "q.cancel": "Cancel", "q.report": "Report", "q.submitReport": "Submit report",
  "q.reportThanks": "Report submitted. Thank you.", "q.reportDemo": "Reporting activates when the database is connected.",
  "q.accepted": "Accepted answer", "q.related": "Related discussions", "q.deleteConfirm": "Delete this answer?",
  "q.signinDemo": "Sign-in and posting activate when the database is connected. You can browse everything without an account.", "q.signin": "Sign in to answer this question.", "q.loginToAnswer": "Log in to answer",
  "report.spam": "Spam", "report.personal": "Personal information", "report.harassment": "Harassment", "report.incorrect": "Incorrect / unsafe advice", "report.other": "Other", "report.aria": "Report reason",
  "vote.upvote": "Upvote", "vote.remove": "Remove upvote", "vote.signIn": "Sign in to vote", "vote.activates": "Voting activates when the database is connected.",
  "profile.notFound": "Profile not found", "profile.memberSince": "Member since", "profile.answersContributed": "answers contributed", "profile.questionsPosted": "Questions posted",
  "auth.iuHint": "Use an email you actually check — we'll send a 6-digit code there to verify it's yours. Students from any institution in Madinah are welcome.",
  "auth.verifyTitle": "Check your university inbox", "auth.verifyBody": "We sent a 6-digit code to {email}. Enter it below to activate your account. The code expires in 15 minutes.",
  "auth.codeLabel": "Verification code", "auth.codePh": "123456", "auth.verifyBtn": "Verify and log in",
  "auth.resend": "Resend code", "auth.resendIn": "Resend code in {s}s", "auth.resent": "A new code is on its way — check your inbox.",
  "auth.errInvalidEmail": "Please enter a valid email address.",
  "auth.errInvalidCode": "That code is not right, or it has expired. Check your inbox and try again.",
  "auth.errNotVerified": "Your email is not verified yet. Enter the code we sent to your university inbox.",
  "auth.errTooMany": "Too many attempts. Request a new code and try again.",
  "auth.errResendSoon": "Please wait a minute before requesting another code.",
  "auth.errEmailConfig": "Email sending is not configured yet, so accounts cannot be verified right now. Please try again later.",
  "auth.forgotLink": "Forgot password?", "auth.forgotTitle": "Reset your password", "auth.forgotSub": "Enter your university email and we will send you a 6-digit reset code.",
  "auth.forgotSend": "Send reset code", "auth.forgotSent": "If an account exists for that email, a reset code is on its way. Enter the code and choose a new password.",
  "auth.newPassword": "New password", "auth.resetBtn": "Set new password", "auth.resetDone": "Password updated. You can log in with your new password.",
  "auth.backToLogin": "Back to log in",
  "settings.title": "Profile settings", "settings.bio": "Bio", "settings.personalEmail": "Backup email (optional)", "settings.personalEmailHint": "Optional second email for account recovery and reset codes, in case you ever lose access to your main email. Never shown publicly.",
  "settings.country": "Country", "settings.countryPh": "e.g. Malaysia", "settings.save": "Save changes", "settings.saved": "Saved.",
  "badge.mandoob": "Mandoob", "badge.admin": "Admin", "badge.since": "IU since {year}", "badge.yrs": "{years} yrs", "badge.yr": "1 yr", "badge.sinceAr": "في الجامعة منذ {year}هـ",
  "guidelines.title": "Community Guidelines", "privacy.title": "Privacy", "about.title": "About MESH", "about.contact": "Contact", "guidelines.back": "Back to discussions",
};

const ar: Record<string, string> = {
  "brand.sub": "مجتمع طلاب المدينة الناطقين بالإنجليزية",
  "nav.home": "الرئيسية", "nav.browse": "تصفح المناقشات", "nav.gettingStarted": "البدء والوصول",
  "nav.login": "تسجيل الدخول", "nav.logout": "تسجيل الخروج", "nav.ask": "اطرح سؤالًا",
  "nav.searchPh": "ابحث في الأسئلة…", "nav.searchAria": "بحث في المناقشات", "nav.main": "القائمة الرئيسية", "nav.footer": "تذييل الموقع", "nav.menu": "القائمة", "nav.close": "إغلاق القائمة",
  "theme.toggle": "تبديل الوضع الداكن", "lang.toggle": "تبديل اللغة",
  "footer.tag": "مجتمع طلاب المدينة الناطقين بالإنجليزية — مجتمع طلابي، غير تابع لأي جامعة أو جهة حكومية.",
  "footer.about": "حول MESH", "footer.guidelines": "إرشادات المجتمع", "footer.contact": "اتصل بنا", "footer.privacy": "الخصوصية",
  "demo.banner": "وضع العرض التجريبي — تُعرض محتويات تجريبية. سيتم تفعيل النشر والتصويت عند اتصال قاعدة البيانات.",
  "demo.note": "يُعرض أدناه محتوى تجريبي/توضيحي وهو موسوم بذلك.",
  "hero.kicker": "MESH · مجتمع طلاب المدينة الناطقين بالإنجليزية",
  "hero.h1a": "جديد في المدينة المنورة؟", "hero.h1b": "اعثر على طريقك.",
  "hero.sub": "إجابات عملية ومعرفة محلية ونصائح من طلاب مرّوا بالتجربة قبلك.",
  "hero.browse": "تصفح المناقشات", "hero.ask": "اطرح سؤالًا",
  "home.recent": "أحدث المناقشات", "home.recentSub": "أسئلة وإجابات ونصائح من مجتمع MESH.",
  "home.searchPh": "ابحث في المناقشات…", "home.viewAll": "عرض كل المناقشات",
  "home.browseTopic": "تصفح حسب الموضوع", "home.browseTopicSub": "ابدأ بالمرحلة التي أنت فيها، ثم ضيّق النطاق بالفئات الفرعية في صفحة كل فئة.",
  "home.help": "تعرف إجابة؟", "home.helpLink": "ساعد طالبًا آخر بالإجابة عن سؤال.",
  "home.explore": "استكشف", "home.categoriesAria": "الفئات الرئيسية",
  "sort.recent": "الأحدث", "sort.top": "الأكثر تصويتًا", "sort.unanswered": "بدون إجابات", "sort.aria": "ترتيب المناقشات",
  "filter.all": "الكل",
  "disc.votes": "أصوات", "disc.answers": "إجابات", "disc.answer": "إجابة", "disc.solved": "تم الحل", "disc.sample": "نموذج تجريبي",
  "disc.emptyTitle": "لا توجد مناقشات", "disc.emptySub": "جرّب بحثًا أو فئة مختلفة، أو اطرح أول سؤال.",
  "time.now": "الآن",
  "browse.title": "تصفح المناقشات", "browse.sub": "ابحث وصفِّ أسئلة الطلاب في المدينة المنورة.", "browse.subDemo": "يُعرض محتوى تجريبي/توضيحي.",
  "browse.searchPh": "ابحث في العناوين والإجابات والوسوم…", "browse.allSubcats": "كل الفئات الفرعية", "browse.loadMore": "تحميل المزيد", "browse.remaining": "متبقية", "browse.loading": "جاري التحميل…",
  "cat.notFound": "الفئة غير موجودة", "cat.backBrowse": "عودة إلى التصفح", "cat.searchPh": "ابحث داخل هذه الفئة…", "cat.searchAria": "بحث في الفئة",
  "cat.notAffiliated": "MESH مجتمع طلابي وغير تابع لنفاذ أو أبشر أو أي جامعة أو جهة حكومية، ولا يحظى بتأييد أي منها. تأكد دائمًا من الإجراءات من المصدر الرسمي.",
  "common.loading": "جاري التحميل…", "common.home": "الرئيسية",
  "ask.title": "اطرح سؤالًا", "ask.helper": "صِف وضعك، وما جرّبته، وما تحتاج إلى مساعدة فيه. تجنّب مشاركة مستندات خاصة أو معلومات شخصية حساسة.",
  "ask.needAccount": "تحتاج إلى حساب للنشر، حتى تبقى الإجابات والتصويت جديرين بالثقة.", "ask.loginToAsk": "سجل الدخول للسؤال", "ask.createAccount": "إنشاء حساب",
  "ask.dbNote": "ملاحظة: قاعدة البيانات غير متصلة بعد، لذا النشر في وضع العرض التجريبي.",
  "ask.fieldTitle": "عنوان السؤال", "ask.titlePh": "مثال: هل يمكنني إكمال تسجيل نفاذ قبل إصدار إقامتي؟", "ask.titleHint": "العنوان المحدد يساعد الطلاب المناسبين على العثور على سؤالك والإجابة عنه.",
  "ask.mainCat": "الفئة الرئيسية", "ask.subCat": "الفئة الفرعية (اختياري)", "ask.none": "— لا شيء —", "ask.details": "التفاصيل", "ask.tags": "الوسوم (مفصولة بفواصل، اختياري)", "ask.tagsPh": "نفاذ، أبشر",
  "ask.errTitle": "يجب أن يكون العنوان ١٠ أحرف على الأقل — كن محددًا بشأن ما تحتاجه.", "ask.errBody": "أضف مزيدًا من التفاصيل (٢٠ حرفًا على الأقل).",
  "ask.errDemo": "وضع العرض التجريبي: سيتم تفعيل النشر عند اتصال قاعدة البيانات. لم يُحفظ سؤالك.", "ask.errSignin": "سجل الدخول لنشر سؤال.", "ask.errPost": "تعذر نشر السؤال.",
  "ask.posting": "جاري النشر…", "ask.post": "نشر السؤال",
  "auth.loginTitle": "تسجيل الدخول إلى MESH", "auth.signupTitle": "إنشاء حسابك في MESH", "auth.welcome": "مرحبًا بعودتك.", "auth.signupSub": "استخدم أي اسم عرض — لست مضطرًا لاستخدام اسمك القانوني.",
  "auth.displayName": "اسم العرض", "auth.email": "البريد الإلكتروني", "auth.password": "كلمة المرور", "auth.pwHint": "٨ أحرف على الأقل.",
  "auth.wait": "يرجى الانتظار…", "auth.loginBtn": "تسجيل الدخول", "auth.signupBtn": "إنشاء الحساب",
  "auth.haveAccount": "لديك حساب بالفعل؟", "auth.newTo": "جديد في MESH؟", "auth.createOne": "إنشاء حساب", "auth.loginLink": "تسجيل الدخول",
  "auth.resetNote": "يتولى مسؤول الموقع إعادة تعيين كلمة المرور أثناء المرحلة الأولى للمجتمع — تواصل معنا عبر صفحة «حول».",
  "auth.errAccounts": "تُفعّل الحسابات عند اتصال قاعدة البيانات. لا يزال يمكنك تصفح كل المناقشات التجريبية دون حساب.", "auth.errGeneric": "حدث خطأ ما.",
  "q.notFound": "السؤال غير موجود", "q.browse": "تصفح المناقشات", "q.sampleNote": "محتوى تجريبي/توضيحي — هذا السؤال وإجاباته أمثلة مُعدّة مسبقًا، وليست إرشادات رسمية موثقة.",
  "q.askedBy": "سأل بواسطة", "q.answers": "الإجابات", "q.answer": "إجابة", "q.noAnswers": "لا توجد إجابات بعد. إذا كنت تعرف ذلك من تجربتك، فقد تساعد إجابتك الطالب التالي.",
  "q.yourAnswer": "إجابتك", "q.answerPh": "شارك ما نجح معك، واذكر أين يجب التحقق من المصدر الرسمي.",
  "q.postAnswer": "نشر الإجابة", "q.errEmpty": "لا يمكن أن تكون الإجابة فارغة.", "q.errDemo": "وضع العرض التجريبي: سيتم تفعيل النشر عند اتصال قاعدة البيانات.", "q.errPost": "تعذر نشر الإجابة.",
  "q.markSolution": "تحديد كحل", "q.removeSolution": "إزالة الحل", "q.delete": "حذف", "q.edit": "تعديل", "q.save": "حفظ", "q.cancel": "إلغاء", "q.report": "إبلاغ", "q.submitReport": "إرسال البلاغ",
  "q.reportThanks": "تم إرسال البلاغ. شكرًا لك.", "q.reportDemo": "سيتم تفعيل الإبلاغ عند اتصال قاعدة البيانات.",
  "q.accepted": "الإجابة المقبولة", "q.related": "مناقشات ذات صلة", "q.deleteConfirm": "حذف هذه الإجابة؟",
  "q.signinDemo": "تُفعّل إمكانية تسجيل الدخول والنشر عند اتصال قاعدة البيانات. يمكنك تصفح كل شيء دون حساب.", "q.signin": "سجل الدخول للإجابة عن هذا السؤال.", "q.loginToAnswer": "سجل الدخول للإجابة",
  "report.spam": "محتوى مزعج (سبام)", "report.personal": "معلومات شخصية", "report.harassment": "مضايقة", "report.incorrect": "نصيحة غير صحيحة / غير آمنة", "report.other": "أخرى", "report.aria": "سبب الإبلاغ",
  "vote.upvote": "تصويت مؤيد", "vote.remove": "إزالة التصويت", "vote.signIn": "سجل الدخول للتصويت", "vote.activates": "سيتم تفعيل التصويت عند اتصال قاعدة البيانات.",
  "profile.notFound": "الملف غير موجود", "profile.memberSince": "عضو منذ", "profile.answersContributed": "إجابات ساهم بها", "profile.questionsPosted": "الأسئلة المنشورة",
  "auth.iuHint": "استخدم بريدًا إلكترونيًا تتابعه فعلًا — سنرسل إليه رمزًا من ٦ أرقام للتحقق منه. طلاب جميع المؤسسات في المدينة مرحّب بهم.",
  "auth.verifyTitle": "تحقق من بريدك الجامعي", "auth.verifyBody": "أرسلنا رمزًا من ٦ أرقام إلى {email}. أدخله أدناه لتفعيل حسابك. ينتهي الرمز بعد ١٥ دقيقة.",
  "auth.codeLabel": "رمز التحقق", "auth.codePh": "123456", "auth.verifyBtn": "تأكيد وتسجيل الدخول",
  "auth.resend": "إعادة إرسال الرمز", "auth.resendIn": "إعادة الإرسال بعد {s} ثانية", "auth.resent": "رمز جديد في طريقه إليك — تحقق من بريدك.",
  "auth.errInvalidEmail": "يرجى إدخال بريد إلكتروني صحيح.",
  "auth.errInvalidCode": "هذا الرمز غير صحيح أو انتهت صلاحيته. تحقق من بريدك وحاول مرة أخرى.",
  "auth.errNotVerified": "لم يتم تأكيد بريدك بعد. أدخل الرمز الذي أرسلناه إلى بريدك الجامعي.",
  "auth.errTooMany": "محاولات كثيرة جدًا. اطلب رمزًا جديدًا وحاول مرة أخرى.",
  "auth.errResendSoon": "يرجى الانتظار دقيقة قبل طلب رمز آخر.",
  "auth.errEmailConfig": "إرسال البريد غير مُعدّ بعد، لذا لا يمكن تأكيد الحسابات الآن. حاول مرة أخرى لاحقًا.",
  "auth.forgotLink": "نسيت كلمة المرور؟", "auth.forgotTitle": "إعادة تعيين كلمة المرور", "auth.forgotSub": "أدخل بريدك الجامعي وسنرسل إليك رمز إعادة تعيين من ٦ أرقام.",
  "auth.forgotSend": "إرسال رمز إعادة التعيين", "auth.forgotSent": "إذا وجد حساب لهذا البريد، فرمز إعادة التعيين في طريقه إليك. أدخل الرمز واختر كلمة مرور جديدة.",
  "auth.newPassword": "كلمة المرور الجديدة", "auth.resetBtn": "تعيين كلمة المرور الجديدة", "auth.resetDone": "تم تحديث كلمة المرور. يمكنك تسجيل الدخول بكلمة المرور الجديدة.",
  "auth.backToLogin": "عودة إلى تسجيل الدخول",
  "settings.title": "إعدادات الملف الشخصي", "settings.bio": "نبذة", "settings.personalEmail": "بريد احتياطي (اختياري)", "settings.personalEmailHint": "بريد ثانٍ اختياري لاسترداد الحساب ورموز إعادة التعيين إذا فقدت الوصول إلى بريدك الأساسي. لا يظهر للعامة أبدًا.",
  "settings.country": "الدولة", "settings.countryPh": "مثال: ماليزيا", "settings.save": "حفظ التغييرات", "settings.saved": "تم الحفظ.",
  "badge.mandoob": "مندوب", "badge.admin": "مسؤول", "badge.since": "في الجامعة منذ {year}", "badge.yrs": "{years} سنوات", "badge.yr": "سنة واحدة", "badge.sinceAr": "في الجامعة منذ {year}هـ",
  "guidelines.title": "إرشادات المجتمع", "privacy.title": "الخصوصية", "about.title": "حول MESH", "about.contact": "اتصل بنا", "guidelines.back": "عودة إلى المناقشات",
};

export const dicts: Record<MeshLang, Record<string, string>> = { en, ar };

export const staticContent = {
  en: {
    guidelinesIntro: "MESH works when students share honest experience and treat each other well. By posting, you agree to these rules.",
    guidelines: [
      "Never share private identity documents — yours or anyone else's — including Iqama numbers, passport scans, or university IDs.",
      "Do not post another student's personal information.",
      "No harassment, personal attacks, or discriminatory language.",
      "No spam or commercial solicitation.",
      "Do not present unverified administrative advice as official policy. Say when something is your personal experience, and link or point to the official source where you can.",
      "Administrative and residency requirements change — always check current official requirements before acting on an answer.",
      "Keep questions specific and answers practical. One clear question per post helps everyone.",
    ],
    guidelinesOutro: "Moderators may hide or remove content that breaks these rules. Use the Report button on any question or answer.",
    privacyIntro: "MESH is designed to need as little personal information as possible.",
    privacy: [
      "We ask only for a display name, email address, and password to create an account. You do not need to use your legal name as your display name.",
      "We never ask for Iqama numbers, passport numbers, university IDs, or other sensitive personal documents — do not post them publicly.",
      "Your email address is never shown on public profiles. Public profiles show only your display name, optional bio, join date, questions, and answer count.",
      "Passwords are stored only as salted hashes, never in plain text.",
      "Browsing questions and answers does not require an account.",
      "If you want your account or content removed, contact us via the About page.",
    ],
    about: [
      "MESH — Medinah English Students Hub — is a community forum for English-speaking international students living in, studying in, or preparing to move to Madinah, Saudi Arabia.",
      "Useful answers about university administration, residency procedures, accommodation, transport, and daily life are often scattered across chat groups and old posts. MESH organises that knowledge into searchable categories — Getting Started, Getting Settled, and Getting Ready to Leave — so the next student can find it.",
      "MESH is a student community project. It is not affiliated with the Islamic University of Madinah, any other university, the Saudi government, Nafath, or Absher. Community answers describe personal experience, not verified official guidance — always confirm current procedures on the official source.",
      "Content labelled “Sample” is seeded demonstration content included so new visitors can see how the forum works. It is not presented as live member activity.",
    ],
    aboutContact: "Questions about MESH, moderation, or privacy: post in the forum if it is a general student question, or ask an existing member to pass a message to the moderators. A dedicated contact inbox will be listed here once the live database phase launches.",
  },
  ar: {
    guidelinesIntro: "يعمل MESH جيدًا عندما يشارك الطلاب تجاربهم بصدق ويعاملون بعضهم بعضًا بلطف. بنشرك محتوى فأنت توافق على هذه القواعد.",
    guidelines: [
      "لا تشارك أبدًا مستندات هوية خاصة — لك أو لأي شخص آخر — بما في ذلك أرقام الإقامة أو صور جواز السفر أو بطاقات الجامعة.",
      "لا تنشر المعلومات الشخصية لطالب آخر.",
      "ممنوع المضايقة أو الهجمات الشخصية أو اللغة التمييزية.",
      "ممنوع المحتوى المزعج (السبام) أو الترويج التجاري.",
      "لا تقدّم نصيحة إدارية غير موثقة وكأنها سياسة رسمية. اذكر عندما يكون أمرٌ ما من تجربتك الشخصية، وأشر إلى المصدر الرسمي كلما أمكن.",
      "تتغير متطلبات الشؤون الإدارية والإقامة — تحقق دائمًا من المتطلبات الرسمية الحالية قبل التصرف بناءً على إجابة.",
      "اجعل الأسئلة محددة والإجابات عملية. سؤال واضح واحد في كل منشور يساعد الجميع.",
    ],
    guidelinesOutro: "يمكن للمشرفين إخفاء أو إزالة المحتوى الذي يخالف هذه القواعد. استخدم زر الإبلاغ على أي سؤال أو إجابة.",
    privacyIntro: "صُمم MESH ليحتاج إلى أقل قدر ممكن من المعلومات الشخصية.",
    privacy: [
      "نطلب فقط اسم عرض وبريدًا إلكترونيًا وكلمة مرور لإنشاء حساب. لست مضطرًا لاستخدام اسمك القانوني اسمًا للعرض.",
      "لا نطلب أبدًا أرقام الإقامة أو أرقام جوازات السفر أو بطاقات الجامعة أو غيرها من المستندات الشخصية الحساسة — لا تنشرها علنًا.",
      "لا يُعرض بريدك الإلكتروني أبدًا في الملفات العامة. تُظهر الملفات العامة فقط اسم العرض ونبذة اختيارية وتاريخ الانضمام وأسئلتك وعدد إجاباتك.",
      "تُحفظ كلمات المرور على هيئة تجزئات مملّحة فقط، ولا تُحفظ أبدًا كنص صريح.",
      "لا يتطلب تصفح الأسئلة والإجابات حسابًا.",
      "إذا أردت حذف حسابك أو محتواك، تواصل معنا عبر صفحة «حول».",
    ],
    about: [
      "MESH — مركز طلاب المدينة الناطقين بالإنجليزية — هو منتدى مجتمعي للطلاب الدوليين الناطقين بالإنجليزية الذين يعيشون في المدينة المنورة، أو يدرسون فيها، أو يستعدون للانتقال إليها في المملكة العربية السعودية.",
      "كثيرًا ما تكون الإجابات المفيدة حول إدارة الجامعة وإجراءات الإقامة والسكن والنقل والحياة اليومية مبعثرة في مجموعات المحادثات والمنشورات القديمة. ينظم MESH هذه المعرفة في فئات قابلة للبحث — البدء والوصول، والاستقرار والمعيشة، والاستعداد للمغادرة — حتى يتمكن الطالب التالي من العثور عليها.",
      "MESH مشروع مجتمعي طلابي. وهو غير تابع للجامعة الإسلامية بالمدينة المنورة أو أي جامعة أخرى أو الحكومة السعودية أو نفاذ أو أبشر. تصف إجابات المجتمع تجارب شخصية، وليست إرشادات رسمية موثقة — تأكد دائمًا من الإجراءات الحالية من المصدر الرسمي.",
      "المحتوى الموسوم بـ«نموذج تجريبي» هو محتوى توضيحي مُعدّ مسبقًا ليتمكن الزوار الجدد من معرفة كيفية عمل المنتدى. ولا يُقدَّم على أنه نشاط حقيقي للأعضاء.",
    ],
    aboutContact: "للأسئلة حول MESH أو الإشراف أو الخصوصية: انشر في المنتدى إن كان سؤالًا طلابيًا عامًا، أو اطلب من عضو حالي إيصال رسالة إلى المشرفين. سيُدرج صندوق بريد مخصص للتواصل هنا عند إطلاق مرحلة قاعدة البيانات الحية.",
  },
};

type Ctx = { lang: MeshLang; setLang: (l: MeshLang) => void; theme: MeshTheme; setTheme: (t: MeshTheme) => void; toggleTheme: () => void; t: (k: string) => string; content: typeof staticContent.en; dir: "ltr" | "rtl" };
const MeshPrefsContext = createContext<Ctx | null>(null);

export function MeshPrefsProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<MeshLang>("en");
  const [theme, setThemeState] = useState<MeshTheme>("light");
  useEffect(() => {
    try {
      const l = window.localStorage.getItem("mesh-lang");
      if (l === "ar" || l === "en") setLangState(l);
      const th = window.localStorage.getItem("mesh-theme");
      if (th === "dark" || th === "light") setThemeState(th);
      else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) setThemeState("dark");
    } catch { /* ignore */ }
  }, []);
  const setLang = (l: MeshLang) => { setLangState(l); try { window.localStorage.setItem("mesh-lang", l); } catch { /* */ } };
  const setTheme = (th: MeshTheme) => { setThemeState(th); try { window.localStorage.setItem("mesh-theme", th); } catch { /* */ } };
  const value: Ctx = {
    lang, setLang, theme, setTheme, toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
    t: (k) => dicts[lang][k] ?? dicts.en[k] ?? k,
    content: staticContent[lang], dir: lang === "ar" ? "rtl" : "ltr",
  };
  return <MeshPrefsContext.Provider value={value}>{children}</MeshPrefsContext.Provider>;
}

export function useMeshPrefs(): Ctx {
  const c = useContext(MeshPrefsContext);
  if (!c) throw new Error("useMeshPrefs must be used inside MeshPrefsProvider");
  return c;
}

/** Picks the localized field for seed content; DB/user content has no Ar field and falls back to English as written. */
export function pickLang(lang: MeshLang, enVal: string, arVal?: string | null): string {
  return lang === "ar" && arVal ? arVal : enVal;
}

export function MeshRoot({ children }: { children: React.ReactNode }) {
  const { lang, theme, dir } = useMeshPrefs();
  return (
    <div dir={dir} lang={lang} data-lang={lang} data-theme={theme} className="mesh-root" suppressHydrationWarning>
      {children}
    </div>
  );
}
