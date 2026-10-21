/**
 * Seed articles for MESH Resources. Written as simple, sanitizer-safe HTML and
 * attributed to the seed mandoob. Content is peer experience, deliberately hedged —
 * never presented as official rules. Imported only by the server (mesh-db.ts).
 */
export const meshSeedArticles: { title: string; bodyHtml: string }[] = [
  {
    title: "Your first week in Madinah: a calm checklist",
    bodyHtml: [
      "<p>Almost everyone lands in Madinah a little overwhelmed: new city, new language, a pile of paperwork, and a phone full of screenshots from group chats. This is the order that worked for me and for most students I know. Take it one day at a time — nothing on this list needs to happen in a single afternoon.</p>",
      "<h2>Day one: settle, don't solve</h2>",
      "<ul>",
      "<li>Get to your accommodation, unpack the basics, and sleep. Jet lag plus paperwork is a bad combination.</li>",
      "<li>Buy a local SIM or eSIM so you have data — you will need it for maps, taxis and one-time codes.</li>",
      "<li>Find the nearest mosque, grocery shop and pharmacy to where you are staying, and save their locations.</li>",
      "</ul>",
      "<h2>Days two and three: the essentials</h2>",
      "<p>Change a small amount of money or confirm your card works at a local ATM. Stock the kitchen lightly — rice, eggs, tea, dates — rather than one huge shop. Walk your route to the university or your institute once in daylight so it feels familiar before your first real day.</p>",
      "<blockquote>From my experience, the students who struggle in week one are usually not missing information — they are missing rest. Slow down on purpose.</blockquote>",
      "<h2>Later in the week: start the paperwork</h2>",
      "<p>Begin your Iqama and university registration steps in the order the offices themselves ask for them, and keep a single folder — physical or on your phone — with scans of every document you hand in. Requirements change from time to time, so always confirm the current steps on the official source or with the university office rather than relying on any guide, including this one.</p>",
      "<p>By the end of the week, aim for three things: a working phone, a familiar route, and one person you can ask questions. The rest comes gradually.</p>",
    ].join("\n"),
  },
  {
    title: "Absher, Nafath and your Iqama — in the right order",
    bodyHtml: [
      "<p>New students often try to do these three in the wrong order and end up going in circles. This is the sequence that usually applies, based on peer experience — the offices can and do adjust steps, so treat this as a map, not a rulebook.</p>",
      "<h2>1. Your Iqama comes first</h2>",
      "<p>Most government digital services are tied to your Iqama (residence permit) number. Until it is issued, many registrations simply cannot be completed, and that is normal — it does not mean you have done anything wrong. Your university or sponsor normally initiates the process; keep your passport and entry documents together and follow their instructions.</p>",
      "<h2>2. Then Absher</h2>",
      "<p>Once your Iqama number exists, Absher is the main government services platform you will use. Registration typically involves your Iqama number and a mobile number, followed by an activation step — commonly done through a bank, a self-service kiosk, or an official channel. Because activation routes change, check the official Absher site for the currently accepted methods.</p>",
      "<h2>3. Then Nafath</h2>",
      "<p>Nafath is the national single sign-on app, and it generally builds on an active Absher account. Students sometimes try to start with Nafath before Absher is active and hit a wall — if the app will not let you proceed, the missing step is usually further up this list, not in the app itself.</p>",
      "<blockquote>A simple rule of thumb from experience: if a service refuses you, ask which earlier step it depends on, instead of retrying the same screen.</blockquote>",
      "<p>Keep your registered mobile number active — one-time codes for all of these services go to it — and never share those codes or your Iqama scans in group chats. When in doubt, the official platforms and the university's student affairs office are the sources to trust.</p>",
    ].join("\n"),
  },
];
