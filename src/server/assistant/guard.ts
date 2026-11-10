import { normalize } from "@/lib/search/normalize";
import { HELP_CONTACT_DEFAULT, HELP_EMAIL_DEFAULT } from "@/server/settings";

/**
 * The fixed replies that never need a search: questions that ask for a religious ruling, and
 * greetings or thanks with no question in them. Both are decided by rules, not by a model, so the
 * assistant never gives a fatwa whatever the wording, and practical questions about worship
 * ("what time is Maghrib", "where do sisters pray", "how do I book the Rawdah") still get answered.
 */

export const HELP_LINE = {
  en: `Message Admin on WhatsApp at ${HELP_CONTACT_DEFAULT} or email ${HELP_EMAIL_DEFAULT}.`,
  ar: `راسل المشرف على واتساب على الرقم ‎${HELP_CONTACT_DEFAULT} أو على البريد الإلكتروني ‎${HELP_EMAIL_DEFAULT}.`,
};

// All patterns run on normalize(q): lower case, no apostrophes, Arabic letters unified (ة to ه, أ to ا, ى to ي).

/** Words that only a ruling question uses. */
const RULING_WORDS =
  /\b(ruling|rulings|fatwa|fatwas|fatwah|fatawa|fataawa|hukm|ahkam|islamic verdict|islamically|shariah ruling|sharia ruling|what does islam say|in islam|according to (the )?(sharia|shariah|islam|quran|sunnah)|islamic view|riba|usury)\b/;

/** "Am I sinning if I miss Fajr", "will Allah forgive me": whether something is a sin is a ruling. */
const SIN = /\b(sinning|sinful|sinned|forgive me|be forgiven|am i forgiven|allah forgive|god forgive|be punished|punishment for|punished for)\b/;

/**
 * "Is it halal", "is music haram", "it is sunnah to", "haram to work". "The Haram" alone is the
 * masjid, so "haram" after "the", "al", "in", "to" and the like never counts.
 */
const VERDICT = "halal|haram|haraam|halaal|permissible|permissable|permisable|permisible|impermissible|impermissable|makruh|makrooh|mustahab|mustahabb|bidah|bida|bidaa|shirk|kufr|sinful|a sin|fard|fardh|farz|wajib|waajib|obligatory|sunnah|sunna|mubah";
const NOT_THE = "(?<!\\b(?:the|al|in|at|to|near|of|from|inside|into|around|nabawi|makkah|madinah|masjid)\\s)";
const VERDICT_ASKED = new RegExp(
  [
    `\\b(is|are|was|isnt|arent|it is|its|is it|is this|is that|are they)\\b(?!\\s+there\\b)[^?.!]{0,50}?${NOT_THE}\\b(${VERDICT})\\b(?!\\s+(library|gate|gates|area|areas|courtyard|train|station|food|restaurant|restaurants|meat|shop|shops|hotel|hotels|bus|buses|side|walk|walking|minutes))`,
    `${NOT_THE}\\b(${VERDICT})\\s+(to|or|and halal|and haram|if|for (me|us|women|men|a woman|a man|sisters|brothers|students))\\b`,
    `\\b(halal|haram|permissible|allowed|valid)\\s+(or|and)\\s+(not|haram|halal|impermissible|forbidden)\\b`,
  ].join("|")
);

/** "Is shisha allowed", "are credit cards with interest permitted": allowed is a verdict when the topic is fiqh (below). */
const ALLOWED_ASKED = /\b(is|are|isnt|arent)\b(?!\s+there\b)[^?.!]{0,60}?\b(allowed|permitted|forbidden|prohibited|ok|okay|acceptable|fine|alright|wrong|bad|sinful)\b/;

/** "Do I pray qasr", "should she fast", "will I be...": asking what one does in worship. */
const DO_I = /(?:^|\b(?:and|so|then|but|also) )(do|does|should|shall|must|will|would) (i|we|you|she|he|they|my wife|women|men|a woman|a man|sisters|brothers)\b/;

/**
 * Acts of worship. Asked with "can I", "is it ok", "do I", how one may worship is a ruling ("can I pray
 * Jumuah at home", "is it fine to pray Isha at 1am"), unless the question is about getting there or
 * booking it ("can I pray in the Rawdah with my wife", "can I do Umrah from Madinah").
 */
const WORSHIP =
  /\b(pray|prays|praying|prayer|prayers|salah|salat|salaah|namaz|rakah|rakat|rakaat|rakahs|rakas|raka|jumuah|jumah|jummah|jumua|fajr|dhuhr|zuhr|duhr|asr|maghrib|isha|qasr|witr|tahajjud|taraweeh|tarawih|wudu|wudhu|ablution|ghusl|tayammum|fast|fasting|fasts|sawm|dua|duaa|hajj|umrah|tawaf|sai|ihram|qurbani|udhiyah)\b/;
const LOGISTICS =
  /\b(rawdah|rawda|riyadul jannah|nusuk|permit|permits|book|booking|slot|slots|ticket|tickets|visa|visitor|visitors|tour|trip|group|train|bus|taxi|by car|from (madinah|medina|here|the university|jeddah|riyadh)|times?|timetable|schedule|attend|join (the )?(dars|duroos|class|halaqah)|with (my |our )?(kids|children|child|wife|family|baby|son|daughter|parents|mother|father)|as a (student|visitor|resident|foreigner|non saudi)|student|students|laptop|bag|bags|phone|camera|wheelchair|pram|stroller)\b/;

/** "Should I pray", "do I have to pay zakat", "must she wear": what the Sharia requires of someone. */
const OBLIGED =
  /\b(should|must|have to|has to|need to|needs to|required to|obliged to|necessary to|compulsory to|obligatory to)\s+(i |we |she |he |you |my wife |a woman |women |men )?(pray|fast|pay (the )?(zakat|zakah|fidyah|kaffarah|fitrah)|give (the )?(zakat|zakah|fidyah|fitrah)|(make up|makeup|redo|re do|repeat|qada|qadha) (a |the |my |missed |that |this |those |these |all )*(prayer|prayers|salah|salat|fast|fasts|wudu|wudhu|fajr|dhuhr|asr|maghrib|isha)|perform (the )?(umrah|hajj|tawaf|wudu|ghusl)|do (wudu|wudhu|ghusl|tayammum|witr|qurbani|udhiyah)|wear (the |a )?(hijab|niqab|jilbab|ihram)|cover (her |their |my |your )?(face|hair|feet)|grow (my |a )?beard|sacrifice|(have|make|do|renew) (wudu|wudhu|ghusl))\b|\b(need|needs) (to have |to make |to do )?(wudu|wudhu|ghusl)\b/;

/** "Can I", "is it ok to", "am I allowed to": with one of these, it asks for a ruling. */
const MAY_I = /\b(can i|can we|can you|can she|can he|can my wife|can a (woman|man|wife|husband|sister|brother|muslim|person|girl|boy|student|lady)|can women|can men|can sisters|can brothers|may i|may we|is it ok|is it okay|is it fine|is it alright|is it acceptable|is it wrong|am i allowed|are we allowed|are women allowed|is it allowed|allowed to|permitted to|is there (any )?harm|any harm in|is there (a )?sin)\b/;
const FIQH_ACT =
  /\b((combine|combining|join|joining|shorten|shortening|jama|jam|merge|merging) [^?.!]{0,30}?\b(prayers?|salah|salat|salawat|maghrib|isha|dhuhr|zuhr|asr|fajr)|qasr|break (my |the |our |her )?fast|eat (during|while) (i am )?fasting|skip (the |my )?(fast|prayer|salah)|miss (the |a |my )?(prayer|salah|fajr|jumuah|jumah|jummah)|delay (the |my )?(prayer|salah|isha|fajr)|pray (with|in) (my )?(shoes|socks|sandals)|pray sitting|pray behind|pray alone|pray (in|at) (the |my |our )?(hotel|home|room|house|flat|apartment)|instead of (praying )?(in )?(the )?(haram|masjid|jamaah|jumuah)|wipe over|without wudu|without wudhu|without ablution|without (a )?mahram|without (a )?wali|without (her |my )?(father|guardian)|music|singing|interest|mortgage|smok\w*|shisha|vap\w*|cigarettes?|shake hands?|shaking hands|free mixing|shave (my |the )?(beard|head)|trim (my |the )?beard|tattoo|mawlid|celebrat\w* (my |a |the )?(birthday|birthdays|mawlid|valentine|valentines|christmas)|photos? of (living|people|animals)|pictures? of (living|people|animals)|marry (a|an|my|her|him|someone|two|second|more|without|outside|non)|nikah|talaq|divorce|zakat|zakah|(pray|praying) \w+ and \w+ together|(pray|praying) (them |the prayers |both )?together|in ihram|during (my |her |their |a |the )?(period|periods|menses|haid|haidh|menstruation|nifas)|on (my |her |their |a )?(period|periods)|menstruat\w*|janabah|junub|touch (the )?(quran|mushaf)|alcohol|pork|gelatin|lottery|gambl\w*|crypto\w*|bitcoin|forex|dropship\w*|amazon fba|day trading|trading (crypto|stocks|shares|forex)|(?<!university )loans?(?! (from|by|at|through|of) (the )?(university|deanship|iu)\b)|mortgages?|without (a |her |my |the )?(hijab|niqab|abaya|jilbab|khimar)|eat(ing)? (?!(at|in|inside|near|out|there|here|before|after|on|with|during|while|food|lunch|dinner|breakfast|suhoor|sahur|iftar|in the)\b)[a-z]+|wear\w* (gold|silk|perfume|a gold|gold rings?|a silk|scent)|(gold|silk) (for|as a|as) (men|man|a man|brothers)|perfume (as|for) (a )?(woman|women|sister|sisters))\b/;

/** "Can I fast on a Friday", "may women fast...": whether one may fast is always a ruling. */
const FAST_Q = /\b(can|may|should|must|could) (i|we|you|she|he|my wife|a woman|women|a man|men|someone|one) fast\b|\bfast(ing)? (on|alone on) (a )?(friday|saturday|sunday|the day of|arafah|ashura)/;

/** "Is my nikah valid", "does it break my fast", "does my wudu break". */
const VALIDITY = /\b(valid|invalid|void|counts?|accepted|invalidates?|nullif(y|ies)|spoils?|ruins?|broken)\b|(?<!\b(a|the|no)\s)\bbreaks?\b(?!\s+(between|after|before|from|for|time|times))/;
const VALID_ACT = /\b(nikah|marriage|divorce|talaq|khula|prayer|prayers|salah|salat|wudu|wudhu|ablution|ghusl|fast|fasting|sawm|tawaf|ihram|zakat|zakah|sunnah|umrah|hajj|udhiyah|qurbani)\b/;
const PRACTICAL = /\b(permit|permits|booking|visa|ticket|nusuk|appointment|slot|card|iqama|passport|licence|license|insurance)\b/;

/** How to perform an act of worship in detail, or how much is due: fiqh. */
const ZAKAT_DUE = /\b(zakat|zakah)\b (is |be )?(due|payable|owed|required|obligatory|wajib)|\b(zakat|zakah) on (my|the|our|her|his|gold|silver|savings|salary|stipend|money|shares|stocks)\b/;
const HOW_TO_WORSHIP = /\bhow (many|much) (rakat|rakah|rakaat|rakas|rakahs|units|zakat|zakah|fidyah|kaffarah)\b|\bhow (do|should|to|can) (i |we |you )?(pray|perform|make|do) (the )?(janazah|witr|istikhara|istikharah|tahajjud|duha|qasr|ghusl|wudu|wudhu|tayammum|sajdah|sujood|sujud as sahw|eid prayer|salat al|eclipse prayer|eclipse|kusuf|kusoof|khusuf|khusoof|istisqa|rain prayer|taraweeh|tarawih|tahiyyat al masjid|sunnah prayers?)\b/;

// Arabic, normalised (ة to ه, أ to ا, ى to ي, ئ to ي).
const AR_WORD = (w: string) => `(?:^|\\s)(?:و|ف)?${w}(?:\\s|$)`;
const AR_RULING = new RegExp(
  [
    "حكم", "الحكم", "احكام", "يجوز", "تجوز", "يحرم", "تحرم", "جائز", "جايز", "مكروه", "مستحب", "بدعه", "واجب", "فرض", "فريضه",
    "فتوي", "الفتوي", "افتوني", "شرعا", "حلال", "حرام", "ربا", "الربا", "بفايده", "تجب", "اثم", "ياثم", "اثمه", "الشرع",
  ].map(AR_WORD).join("|") + "|راي الشرع|راي الدين|في الاسلام|يحل لي|بدون محرم|بلا محرم|بدون ولي|بلا ولي|هل اصلي|هل اجمع|هل اقصر|قصر الصلاه|جمع الصلاه|الجمع بين الصلاتين|كم ركعه|كم ركعات|كم الزكاه|زكاه المكافاه"
);
/** "هل يجب علي الصيام": an obligation question about worship. ("هل يجب أن أحضر جوازي" is practical.) */
const AR_OBLIGED = /هل (يجب|يلزم|يلزمني|علي|يتوجب|اقضي|نقضي|تقضي|اعيد|نعيد|اكرر)|قضاء (ال)?(صلاه|صلوات|صوم|صيام|فايت)|(ال)?(صلاه|صلوات|صيام) (ال)?فايت/;
const AR_WORSHIP = /(صلاه|صلاتي|صلوات|اصلي|صوم|صيام|اصوم|زكاه|وضوء|غسل|تيمم|حجاب|نقاب|محرم|كفاره|فديه|اضحيه|عقيقه|احرام|طواف|(^|\s)(ال)?حج(\s|$)|عمره|جمعه)/;
const AR_VALIDITY = /(يصح|تصح|صحيح|صحيحه|باطل|باطله|يبطل|تبطل|ينقض|ينتقض|يفسد|تفسد|يفطر|مقبول)/;
const AR_ACT = /(نكاح|زواج|صلاه|صلاتي|وضوء|وضوي|صوم|صيام|طلاق|طواف|احرام|غسل|زكاه)/;

/** Whether women may visit graves is fiqh; when Baqi opens is not. */
const WOMEN_GRAVES = /\b(women|woman|sisters?|ladies|females?|my wife|girls?)\b[^?.!]*\bvisit\w* (the )?(graves?|cemetery|baqi|qabr|prophets grave)|\bvisit\w* (the )?(graves?|cemetery|baqi|qabr|prophets grave)\b[^?.!]*\b(women|woman|sisters?|ladies|females?)\b/;

/** "What time do we break the fast", "when is iftar": asking when or where is practical. */
const WHEN_WHERE = /^(what time|at what time|when|where|how long until|how many minutes)\b|\bwhere (can|do|should|could) (i|we|you)\b/;

/** "Is the mataam halal": whether a place serves halal food is a fact, not a ruling. */
const HALAL_PLACE = /\b(is|are) (the |this |that |their )?(mataam|restaurant|restaurants|food court|cafeteria|canteen|cafe|food|meat|chicken)( (at|in|on|near) [a-z ]{1,30})? (halal|halaal)\b|(المطعم|مطعم|المطاعم|الكافتيريا|الاكل|الطعام) (حلال)/;

/** "هل يوجد درس في أحكام الصيام": asking for a class on a fiqh topic is not asking for a ruling. */
const AR_CLASS = /(يوجد|توجد|هناك|اين|متي|من يدرس|من يشرح|يدرس|يشرح)\s.*(درس|دروس|حلقه|حلقات|دوره|كتاب|شرح)|(درس|دروس|حلقه|دوره|شرح|كتاب) (في )?(ال)?(احكام|فقه)/;

/** Questions that ask for a religious ruling, in English or Arabic. */
export function isRulingQuestion(q: string): boolean {
  const n = normalize(q);
  if (HALAL_PLACE.test(n)) return false;
  if (RULING_WORDS.test(n) || SIN.test(n) || VERDICT_ASKED.test(n) || HOW_TO_WORSHIP.test(n) || ZAKAT_DUE.test(n)) return true;
  if (OBLIGED.test(n) || FAST_Q.test(n)) return true;
  const asks = MAY_I.test(n) || ALLOWED_ASKED.test(n) || DO_I.test(n);
  if (asks && !WHEN_WHERE.test(n) && (FIQH_ACT.test(n) || WOMEN_GRAVES.test(n) || (WORSHIP.test(n) && !LOGISTICS.test(n)))) return true;
  if (VALIDITY.test(n) && VALID_ACT.test(n) && !PRACTICAL.test(n) && !WHEN_WHERE.test(n)) return true;
  if (AR_CLASS.test(n)) return false;
  return AR_RULING.test(n) || (AR_OBLIGED.test(n) && AR_WORSHIP.test(n)) || (AR_VALIDITY.test(n) && AR_ACT.test(n));
}

/** "What time", "when", "where", "متى", "أين": a follow-up that asks when or where is practical, whatever came before. */
export function asksWhenWhere(q: string): boolean {
  const n = normalize(q).replace(/^(and|so|ok|okay|then)\s+/, "");
  return WHEN_WHERE.test(n) || /^(how (do|can) (i|we) get|how far|how much|how long)\b/.test(n) || /^(و|ف)?(متي|اين|وين|كم)(\s|$)/.test(n);
}

const FOOD = /\b(eat|eats|eating|food|meat|chicken|drink|drinks|drinking|gelatin|alcohol|pork|crab|shrimp|prawns?|lobster|octopus|seafood|energy drinks?)\b/;
const DRESS = /\b(wear|wears|wearing|dress|dressing|clothes|clothing|hijab|niqab|abaya|beard|gold|silk|perfume|makeup|nail polish|tattoo)\b/;
const FINANCE = /\b(loans?|interest|crypto\w*|bitcoin|stocks?|shares|trading|forex|invest\w*|mortgages?|gambl\w*|lottery|dropship\w*)\b/;
const AR_WEAK = /(يجوز|تجوز|يحل|حكم|حلال|حرام|تجب|يجب|يلزم|الشرع|اثم|مكروه|بدعه|يصح|تصح|باطل|يبطل|شرعا)/;

/**
 * A weaker sign of a ruling question, for one the guard let through and MESH has no page for: "can I",
 * "is it ok" or a sin word, with worship, food, dress or money. It gets the ruling reply (ask a scholar),
 * never the "not on MESH yet" reply, which would promise to add a ruling to the site.
 */
export function looksLikeFiqh(q: string): boolean {
  const n = normalize(q);
  if (asksWhenWhere(q)) return false;
  const asks = MAY_I.test(n) || ALLOWED_ASKED.test(n) || DO_I.test(n) || SIN.test(n) || /\b(is|are) (it|this|that|they)\b/.test(n);
  return (asks && (WORSHIP.test(n) || FOOD.test(n) || DRESS.test(n) || FINANCE.test(n))) || AR_WEAK.test(n);
}

export function rulingReply(lang: "en" | "ar"): string {
  return lang === "ar"
    ? `لا يصدر MESH فتاوى ولا أحكامًا شرعية، والمساعد ليس شيخًا. اسأل أحد أهل العلم، أو راسل المشرف على واتساب على الرقم ‎${HELP_CONTACT_DEFAULT} أو على البريد الإلكتروني ‎${HELP_EMAIL_DEFAULT}. المشايخ الذين يدرّسون في المسجد النبوي وأوقات دروسهم في صفحة الدروس [1].`
    : `MESH doesn't give religious rulings, and this assistant is not a shaykh. Please ask a qualified scholar, or message Admin on WhatsApp at ${HELP_CONTACT_DEFAULT} or email ${HELP_EMAIL_DEFAULT}. The mashayikh who teach in Masjid an-Nabawi, and when their duroos are, are on the duroos page [1].`;
}

/** Opening and closing courtesies. What is left after removing them is the question, if any. */
const SALAM = /^(assalamu? ?alaikum|assalamualaikum|asalamualaikum|asalamu alaikum|as salamu alaikum|salamu alaikum|salam alaikum|salaam alaikum|salam|salaam|slm|wa ?alaikum ?(as)? ?salam|hi|hello|hey|good (morning|evening|afternoon)|السلام عليكم|سلام عليكم|سلام|مرحبا|اهلا)( wa ?rahmatullahi?( wa ?barakatuhu?)?| ورحمه الله( وبركاته)?)?(?=\s|$)/;
const THANKS = /(thank you( so much| very much| a lot)?|thanks( so much| a lot)?|thank|jazakallahu?( ?khair(an)?| ?khayr(an)?)?|jazak allahu?( khair(an)?)?|barakallahu? ?fik|شكرا( جزيلا)?|جزاك الله خيرا?|جزاكم الله خيرا?|بارك الله فيك(م)?)/;
const FILLER = /\b(brother|brothers|sister|sisters|akhi|ukhti|all|everyone|guys|team|mesh|for (the|this|your) (site|website|help|work|effort|answer|answers)|for everything|so much|very much|again|in advance|wa|and)\b|اخي|اختي|يا|على الموقع|على المساعده|للجميع/g;

/** The question with greetings and thanks taken off ("salam, how do I get a SIM?" is a SIM question). */
export function courtesies(q: string): { salam: boolean; thanks: boolean; rest: string } {
  let n = normalize(q);
  const salam = SALAM.test(n);
  if (salam) n = n.replace(SALAM, " ");
  const thanks = THANKS.test(n);
  const rest = n.replace(new RegExp(THANKS.source, "g"), " ").replace(FILLER, " ").replace(/\s+/g, " ").trim();
  return { salam, thanks, rest };
}

/** A greeting or thanks with no question in it ("salam", "jazakallah khair for the site", "السلام عليكم"). */
export function isGreeting(q: string): boolean {
  const c = courtesies(q);
  return (c.salam || c.thanks) && c.rest.replace(/[^\p{L}\p{N}]/gu, "").length === 0;
}

export function greetingReply(lang: "en" | "ar", q = ""): string {
  const { salam, thanks } = courtesies(q);
  const ar = lang === "ar";
  if (salam && thanks) {
    return ar ? "وعليكم السلام ورحمة الله، وإياكم. إن احتجت شيئًا عن الدراسة أو الحياة في المدينة فاسألني." : "Wa alaikum assalam, and wa iyyakum. If you need anything about studying or living in Madinah, just ask.";
  }
  if (thanks) {
    return ar ? "وإياكم. إن احتجت شيئًا آخر عن الدراسة أو الحياة في المدينة فاسألني." : "Wa iyyakum. If you need anything else about studying or living in Madinah, just ask.";
  }
  return ar
    ? "وعليكم السلام ورحمة الله. أنا مساعد MESH، أجيب عن الدراسة والحياة في المدينة: الجامعة والتأشيرات والإقامة والبنوك والسكن والدروس. اسألني ما تريد."
    : "Wa alaikum assalam. I'm the MESH assistant: ask me anything about studying and living in Madinah, from the University, visas, the iqama, banks and housing to tonight's duroos.";
}
