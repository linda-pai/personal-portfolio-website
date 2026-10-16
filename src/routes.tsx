import { Fragment, useEffect, useState } from "react";
import { Link, createBrowserRouter, useParams } from "react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Clock,
  Github,
  Globe,
  Info,
  Linkedin,
  Mail,
  MapPin,
  Rocket,
} from "lucide-react";

const iconProps = { size: 16, strokeWidth: 1.5, "aria-hidden": true } as const;

type Project = {
  title: string;
  description: string;
  tags: string[];
  index: string;
  slug: string;
  image?: string;
  inset?: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "Ichiban Kuji Platform",
    description:
      "Online ichiban kuji inside LINE: point top-ups and prize shipping, peel-to-reveal draw effects, and live ticket pools synced through Firebase RTDB. Built at CatchOpz as the sole frontend engineer for the storefront and admin console.",
    tags: ["Payments & Shipping", "Draw Effects", "Firebase RTDB"],
    index: "01",
    slug: "ichiban-kuji-platform",
    image: "/ichiban-kuji-platform.png",
    featured: true,
  },
  {
    title: "PhotoPacer",
    description:
      "Marathon photo marketplace where runners find their photos by bib number. I founded it and built it end to end: S3 multipart uploads, Rekognition bib detection, watermarking and Taiwan-local payments.",
    tags: ["Full-stack", "AWS", "Payments"],
    index: "02",
    slug: "photopacer",
    image: "/photopacer-albums.jpg",
    featured: true,
  },
  {
    title: "Wellness Brand LINE Campaign",
    description:
      "An immersive campaign for a Thai luxury wellness brand, running as a mini-app inside LINE. Players climb through six animated steps, answer three questions, and get a personalized, shareable result card.",
    tags: ["CSS Animation", "LINE Mini-app", "3D Transforms"],
    index: "03",
    slug: "wellness-line-campaign",
    image: "/wellness-campaign-home.png",
    featured: true,
  },
  {
    title: "Luxury Jewelry LINE E-Shops, Thailand",
    description:
      "One LINE e-shop codebase, launched for a global luxury jewelry brand and then adapted for a second one. Built at CatchOpz for a Thai marketing agency.",
    tags: ["Next.js", "i18n", "E-commerce"],
    index: "04",
    slug: "luxury-jewelry-line-eshops",
    image: "/luxury-jewelry-eshops.png",
  },
  {
    title: "High-Jewelry Holiday Campaign",
    description:
      "Holiday campaign in LINE for a global high-jewelry house: explore an illustrated map, collect jewels, then sign and share a postcard. Built at CatchOpz as the sole frontend engineer.",
    tags: ["LINE Mini-app", "Campaign Web App", "React"],
    index: "05",
    slug: "high-jewelry-holiday-campaign",
    image: "/high-jewelry-holiday-campaign.png",
  },
  {
    title: "AI Smart City Hackathon 2026",
    description:
      "AI-assisted land appraisal workbench for New Taipei City, built as frontend lead.",
    tags: ["React", "Leaflet", "AWS Amplify"],
    index: "06",
    slug: "ai-smart-city-hackathon-2026",
    image: "/ai-smart-city-hackathon-maps.png",
    inset: "/ai-smart-city-hackathon-boundary.png",
  },
  {
    title: "FunBike Station POS",
    description:
      "Scan-first POS for New Taipei’s riverside bike rental stations: queued returns, split payments and live SOS alerts. Built at CatchOpz with two other frontend engineers.",
    tags: ["POS", "Next.js", "Firebase FCM"],
    index: "07",
    slug: "funbike",
    image: "/funbike-rental.png",
    inset: "/funbike-inventory.png",
  },
];

// A paragraph, or a list with an optional small heading. Text supports **bold**.
type CaseBlock =
  | string
  | { items: string[]; ordered?: boolean; title?: string };

type CaseImage = { src: string; alt: string; caption: string };

// Visual shown after an approach section; demoVideo uses the case study's demoVideoId.
type CaseVideo = { id: string; title: string; caption: string };

type CaseMedia =
  | ({ kind: "image" } & CaseImage)
  | ({ kind: "video" } & CaseVideo)
  | { kind: "demoVideo" };

type ApproachSection = {
  heading: string;
  paragraphs: string[];
  media?: CaseMedia;
};

type CaseStudy = {
  title?: string;
  summary?: string;
  // Shows a note under the summary explaining what LINE is.
  runsInLine?: boolean;
  role?: string;
  stack?: string[];
  year: string;
  context: string;
  challenge: CaseBlock[];
  // Either three paragraph groups laid out around the media slots, or headed
  // sections that each carry their own media.
  approach: [string[], string[], string[]] | ApproachSection[];
  outcome: CaseBlock[];
  metrics: { value: string; label: string }[];
  // Playable build linked from the hero; note explains how it differs from production.
  liveDemo?: { url: string; note: string };
  demoVideoId?: string;
  // Set for landscape videos; portrait (9 / 16) is the default.
  demoVideoAspectRatio?: string;
  heroScreens?: { src: string; alt: string }[];
  // Full-width screenshot shown before the demo video and last approach paragraphs.
  featureImage?: CaseImage;
  // Screenshot shown between the first and second approach paragraphs.
  detailImage?: CaseImage;
  // 16:9 YouTube clip shown in place of detailImage.
  detailVideo?: CaseVideo;
};

const caseStudies: Record<string, CaseStudy> = {
  "wellness-line-campaign": {
    summary:
      "An immersive campaign for a Thai luxury wellness brand, running as a mini-app inside LINE. Players climb through six animated steps, answer three questions, and get a personalized, shareable result card.",
    runsInLine: true,
    role: "Sole frontend engineer",
    stack: [
      "React 18",
      "LINE mini-app (LIFF)",
      "CSS 3D transforms & scroll-snap",
    ],
    year: "2024",
    context: "CatchOpz · LINE campaign for a Thai luxury wellness brand",
    challenge: [
      "**A Thai luxury wellness brand wanted a campaign for its LINE audience that people could step into rather than scroll past.**",
      "Three things made it hard:",
      {
        ordered: true,
        items: [
          "**It had to feel like a journey, not a page.** Each player follows a guided “climb”: they sign a personal pledge, answer three questions, and leave with a keepsake they want to share.",
          "**It had to run inside LINE’s in-app browser.** The experience was a web app inside LINE on iOS and Android, and it identified players through their LINE accounts.",
          "**The ending had to drive distribution.** Players could share to Facebook or Instagram, or send a postcard that brings a friend into the same journey.",
        ],
      },
    ],
    approach: [
      {
        heading: "What I owned",
        paragraphs: [
          "**I built the campaign’s frontend at CatchOpz, from the designer’s Figma to the share flow.** I translated the Figma into all eight screens and built the six-step journey state machine, the screenshot-and-share pipeline, and the LINE mini-app postcard flow. I integrated with a REST API built by a backend teammate.",
        ],
      },
      {
        heading: "One page, one continuous climb",
        paragraphs: [
          "**I built the journey as one page with a step state machine, so a single background could pan up the mountain.** Instead of using separate routes, one background image “camera-pans” upward through CSS `background-size` and `background-position` transitions. That gave the ascent a continuous feel without one large asset per screen.",
          "The player’s three answers decide their personalized result card, which is revealed at the end with a 3D card flip.",
        ],
        media: {
          kind: "image",
          src: "/wellness-campaign-camera-pan.png",
          alt: "Four journey steps in sequence, the illustrated background moving from warm foothills to a snowy summit with prayer flags",
          caption:
            "One illustrated background, panned upward step by step with background-position transitions: from the trailhead, through the camera viewfinder, to the prayer flags at the summit.",
        },
      },
      {
        heading: "Layouts that hold up inside LINE",
        paragraphs: [
          "**I used native CSS where I could, and measured the viewport in JavaScript where the browser couldn’t be trusted.** I chose native CSS scroll-snap over fullpage.js for the swipe-to-choose “camera roll”. I sized layouts from a JS-measured `--app-height` variable, because `100vh` is unreliable inside LINE’s in-app browser.",
        ],
        media: { kind: "demoVideo" },
      },
    ],
    outcome: [
      "**The campaign launched in 2024 as a mobile-only LINE mini-app for the brand’s Thai audience.**",
      "Players sign a pledge, answer three questions and get one of three personalized result cards. From the result card, they can:",
      {
        items: [
          "share it to Facebook or Instagram",
          "save it with a long-press",
          "send a LINE Flex Message postcard that invites a friend into the journey",
        ],
      },
      "I instrumented the whole funnel with GA4 view and click events. Dev and prod deploy separately to Firebase Hosting through GitHub Actions.",
    ],
    metrics: [
      { value: "8", label: "Screens shipped" },
      { value: "3", label: "Personalized result & postcard variants" },
      { value: "9 weeks", label: "First commit to final release fix" },
    ],
    liveDemo: {
      url: "https://creativetravelist.github.io/immersive-journey-v1/",
      note: "Standalone build outside LINE, so login and sharing are disabled. Best viewed on mobile.",
    },
    demoVideoId: "FWb1u-R1MG4",
    heroScreens: [
      {
        src: "/wellness-campaign-signing.png",
        alt: "Signing the personal pledge",
      },
      {
        src: "/wellness-campaign-capturing.png",
        alt: "Capturing the view from the trail",
      },
      {
        src: "/wellness-campaign-flag-choosing.png",
        alt: "Choosing a prayer flag",
      },
    ],
  },
  funbike: {
    title: "FunBike Station: a scan-first POS for riverside bike rentals",
    summary:
      "A web POS that lets station staff rent out, take back and charge for bikes by scanning.",
    runsInLine: false,
    role: "Frontend engineer, one of three on the station POS",
    stack: [
      "Next.js 15 + React 19",
      "RTK Query + OpenAPI types",
      "Firebase (App Hosting + FCM)",
    ],
    year: "2025",
    context:
      "CatchOpz · Riverside bike rental POS for the Cycling Lifestyle Foundation and New Taipei City Government",
    challenge: [
      "**FunBike is the riverside bike rental service run by the Cycling Lifestyle Foundation with New Taipei City’s High Water Land Engineering Management Office.** Riders sign up and show a member QR code in LINE. LINE is the dominant messaging app in Japan, Taiwan and Thailand. The POS itself runs in a browser on staff devices and connects to LINE features such as LINE Pay and LINE message receipts.",
      "Station staff hand out bikes, take them back, sell add-ons and handle breakdowns, often with a queue at the counter. Four things made it hard:",
      {
        ordered: true,
        items: [
          "**Every counter step has rules staff would otherwise check by hand.** A bike returned at a different station carries a transport fee, a swap after 15 minutes is charged differently, and a special discount can’t be combined with a cross-station return.",
          "**Customers pay in many ways.** They pay with LINE Pay, JKO Pay, cash, vouchers or a mix.",
          "**It has to work with two kinds of scanner, including on iOS 16 Safari.** Staff devices include iOS 16 Safari, and the POS has to work with both a camera and a USB or Bluetooth barcode scanner.",
          "**Its dependencies were still moving.** The backend API schema was still changing during development, and LINE push notifications can fail when the monthly quota runs out.",
        ],
      },
    ],
    approach: [
      {
        heading: "My part of the POS",
        paragraphs: [
          "**At CatchOpz, I was one of three frontend engineers on the station POS, and I built most of the counter flows.** Those cover login and station selection, the rental cart, returns, the status overview, product sales, LINE Pay / JKO Pay offline payments, refunds, SOS alerts, vehicle stock-check and check-in. Teammates set up the project skeleton, CI and the shared scanner hooks, and built the accounting and daily report modules.",
          "The riders’ LINE member app was a separate repo built by another team at CatchOpz, and the backend API is a separate service on Cloud Run.",
        ],
      },
      {
        heading: "One cache for every screen",
        paragraphs: [
          "**I kept all server state in RTK Query, so every screen reads the same cached vehicle and order data.** Each domain has its own injected slice, and Redux slices hold only the session, cart and notification inbox. A return on one tab shows up in the status overview without manual syncing.",
          "Types are generated from the backend’s OpenAPI spec, which caught its schema changes (`Id` → `No`, a new `getVehicle` endpoint) at compile time.",
          "When LINE’s push quota is used up, the backend returns 503 even though the rental or return itself succeeded. I handle this in one place, the RTK Query `fetchFn`: it warns staff that the customer won’t get a LINE message and passes the response on as a success, so the counter flow keeps going. The same wrapper turns a 401 into a re-login event.",
        ],
      },
      {
        heading: "Returns built for a queue",
        paragraphs: [
          "**Returns are built for a queue of bikes, not one bike at a time.** With the camera, scanning restarts automatically after each bike, and a 50 ms debounce stops a single barcode from triggering two returns.",
          "Each scan checks the vehicle’s status and switches the active member if the bike belongs to someone else. Then it runs the cross-station check: if the bike has a special discount and is returned somewhere other than where it was rented, staff must cancel the discount before the transport-fee modal opens.",
        ],
      },
      {
        heading: "SOS alerts that aren’t missed",
        paragraphs: [
          "**SOS alerts from riders still reach staff if the tab was closed when they were sent.** SOS requests arrive through Firebase Cloud Messaging. When a message arrives, I mark it as received and fetch the full request in parallel, and on startup I load every unread SOS.",
          "A build step writes the Firebase config into the service worker, because the service worker file can’t read Next.js env vars.",
        ],
        media: {
          kind: "video",
          id: "0hj4EG-231k",
          title: "FunBike POS receiving a rider SOS alert",
          caption:
            "Rider SOS requests arrive through Firebase Cloud Messaging; the POS marks them received, fetches the full request, and reloads any unread alerts on startup so none are missed while the tab is closed.",
        },
      },
      {
        heading: "Payments and LINE receipts",
        paragraphs: [
          "**Staff can scan a customer’s mobile wallet, or split one order across several payment methods.** For LINE Pay or JKO Pay, staff scan the customer’s code by camera or scanner, and the one-time key goes to the backend’s offline-payment endpoints. Cash, EasyWallet, sports vouchers and other methods can be split within one order through a single request.",
          "After a rental or return, the POS passes the LINE mini-app receipt URL to the backend, so the rider gets a LINE message that opens their receipt in the LINE member app.",
        ],
      },
      {
        heading: "What the counter taught me",
        paragraphs: [
          "**For an operations tool, the rules staff apply in their heads are the real spec, and most of them only surface once staff use the app at the counter.** The first version worked in demos but not at a real counter.",
          "After a feedback round with the client on May 26, I shipped 12 PRs in three weeks. They showed the transport-fee warning only for true cross-station returns, blocked discount + cross-station combinations, added a breakdown-swap option, let search find all unpaid orders, and showed unreturned rather than returned counts.",
          "Small platform gaps also broke things in production. `Set.prototype.intersection` doesn’t exist on iOS 16 Safari, so I replaced it with lodash. A failed service-worker registration used to block the whole app, so I made it a warning instead.",
        ],
        media: { kind: "demoVideo" },
      },
    ],
    outcome: [
      "**The POS launched at the rental stations on July 1, 2025.**",
      {
        items: [
          "It deploys to Firebase App Hosting (asia-east1) with separate dev and prod projects.",
          "GitHub Actions runs a format check and a full build on every PR.",
          "It installs as a standalone PWA on staff devices.",
        ],
      },
      "My last merged POS PR was in June 2025. After that, other team members kept maintaining the repo.",
    ],
    metrics: [
      { value: "88", label: "Merged POS pull requests I authored (of 187)" },
      {
        value: "~51%",
        label:
          "Of current POS source lines (git blame, excluding generated types)",
      },
      { value: "12", label: "PRs shipped from client feedback in 3 weeks" },
    ],
    demoVideoId: "BnnYocMDbFU",
    demoVideoAspectRatio: "4 / 3",
  },
  "luxury-jewelry-line-eshops": {
    title: "Luxury Jewelry LINE E-Shops, Thailand",
    summary:
      "Two bilingual luxury jewelry stores inside LINE, built from one codebase: launched for one global luxury jewelry brand in Thailand, then adapted for a second.",
    runsInLine: true,
    role: "Frontend Engineer",
    stack: ["React", "LINE mini-apps (LIFF)", "Material UI"],
    year: "2024–2026",
    context:
      "CatchOpz · LINE e-shops in Thailand for two global luxury jewelry brands, commissioned by a Thai marketing agency",
    challenge: [
      "**Two global luxury jewelry brands in Thailand each needed a storefront that customers could open straight from the brand’s LINE Official Account.** Customers had to browse collections, read product details and place orders without leaving the chat app, in Thai and English. Each store also had to feel like its own brand while running as a web app inside LINE’s in-app browser on iOS and Android.",
      "The same codebase launched for the first brand and was then adapted for the second, on a shared internal platform (`base-shell`, `material-ui-shell`, `shopbot-kit`). Five things made it hard:",
      {
        ordered: true,
        items: [
          "**The second shop had to be built from the first without forking the platform.** The typefaces, logo, icons and palette all came from the first brand’s version.",
          "**Content was hardcoded, but had to change without a deploy.** Homepage sections, collections and translations were hardcoded or mocked, and they needed to come from a CMS.",
          "**Two languages meant two typefaces.** In each shop, Thai and English needed different typefaces.",
          "**LINE’s iOS WebView had its own rendering problems.** iOS WebViews showed rendering artifacts.",
          "**Marketing needed reliable attribution.** For the second brand, campaigns had to be tracked across GA4, Meta and LINE Ads.",
        ],
      },
    ],
    approach: [
      {
        heading: "One codebase, two brands",
        paragraphs: [
          "**I adapted the first brand’s shop for the second, and moved the codebase from mock data to live APIs so both shops run on the CMS.** I owned frontend feature work at CatchOpz on both shops, across 29 merged pull requests. For the second brand, I started by replacing the typefaces, logo, icons and palette.",
          "Then I connected the landing page, collections, collection products, product tags and i18n entities to live APIs. In both shops, homepage sections and their translations now come from the backend instead of a hardcoded config file, which I removed.",
        ],
      },
      {
        heading: "Two layers of translation",
        paragraphs: [
          "**Localization merges two sources, so CMS content can’t collide with UI strings.** Static locale files are the baseline. Translations fetched from the shop’s i18n-entities API are layered on top, with category and collection strings namespaced as `{entityType}_{entityId}_{key}`.",
          "The default language comes from `liff.getLanguage()` and falls back to English for non-Thai users. In both shops, the theme’s typography then switches typeface with that language; in the second brand’s shop, between its brand typeface and Noto Sans Thai.",
        ],
        media: {
          kind: "image",
          src: "/luxury-jewelry-eshop-en-th.png",
          alt: "Luxury jewelry LINE e-shop home page and side menu shown in English and Thai side by side",
          caption:
            "The same home page and menu in English and Thai. Switching the EN/TH toggle swaps UI strings and CMS category names, and the theme changes typeface with the language: the brand typeface for English headings, Noto Sans Thai for Thai.",
        },
      },
      {
        heading: "One tracking module for every platform",
        paragraphs: [
          "**I pulled all analytics into a single tracking module, so every platform reports the same funnel events.** For campaigns, I built a deeplink entry point. The landing page reads `?target=` to route users to any in-app page, keeps the remaining query params, and logs the `from` source to GA so campaign traffic can be attributed.",
          "For the second brand only, I also added Meta Pixel and LINE Tag conversion events (`ViewContent`, `AddToCart`, `InitiateCheckout`, `Purchase` with THB value) through thin wrappers in the same module. They’re attached at the route level through tracker HOCs.",
        ],
      },
      {
        heading: "What LINE’s iOS WebView taught me",
        paragraphs: [
          "**Inside in-app browsers, test on the real device early, and favor static assets over CSS effects for brand-critical UI.** Several of the most useful fixes came from the LINE iOS WebView rather than from desktop browsers. The category tabs drew their active state with a CSS outline on a circular icon, which left visual “ghosting” on iOS. I replaced it with dedicated active-state SVG assets.",
        ],
        media: { kind: "demoVideo" },
      },
    ],
    outcome: [
      "**I delivered two bilingual LINE mini-app storefronts from one codebase: first for one global luxury jewelry brand, then for a second.** Across both shops, the codebase has 12 routes:",
      {
        items: [
          "home, category and collection pages",
          "product, cart and checkout",
          "order history and order detail",
          "settings and FAQ",
        ],
      },
      "It deploys to Firebase Hosting with separate dev and prod targets through GitHub Actions. Merchandising content and its translations are now managed through backend APIs instead of code changes.",
    ],
    metrics: [
      {
        value: "2 locales",
        label: "Thai & English, 172 UI keys each, across both shops",
      },
      { value: "29", label: "Pull requests merged across both shops" },
      { value: "12", label: "Storefront routes across both shops" },
    ],
    demoVideoId: "35l7bauPqb8",
  },
  "high-jewelry-holiday-campaign": {
    title: "High-Jewelry Holiday Campaign",
    summary:
      "A mobile campaign inside LINE where users finish three tasks on a treasure map, then sign and send a jewelry postcard to friends.",
    runsInLine: true,
    role: "Sole frontend engineer, with a UI/UX designer and a PM",
    stack: ["React 18 + MUI", "LINE mini-apps (LIFF)", "Firebase Hosting"],
    year: "2024",
    context:
      "CatchOpz · Holiday campaign on LINE for a global high-jewelry house (Taiwan)",
    challenge: [
      "**A global high-jewelry house wanted a holiday campaign for its LINE Official Account that felt like a small interactive story, not a landing page.** Users enter the campaign’s winter wonderland, follow a route across an illustrated map, finish three tasks to light up three jewelry pieces, and end by signing a postcard and sending it to friends in LINE. That last step brings new users back into the campaign.",
      "Three things made it hard:",
      {
        ordered: true,
        items: [
          "**LINE’s in-app browser sets its own limits.** Everything had to work as a web app inside LINE on iOS and Android, where the on-screen keyboard resizes the viewport and audio can’t autoplay before the user interacts.",
          "**Sharing into chats depends on LINE.** Sending the postcard to friends only works through LINE mini-app APIs.",
          "**The postcard had to survive chat compression.** The generated image had to look polished enough for a luxury brand after it was compressed into a chat message.",
        ],
      },
    ],
    approach: [
      {
        heading: "What I owned",
        paragraphs: [
          "**I built the campaign UI at CatchOpz as its sole frontend engineer.** That covered the opening page, the treasure map, both wallpaper tasks and the postcard signing flow: 74 of the repo’s 97 commits across 17 merged PRs. A CatchOpz engineer set up the project from the company’s React + MUI starter (LINE mini-app and auth providers, a GA wrapper) and the GitHub Actions → Firebase Hosting pipeline.",
          "Nearly all the visuals are designer-made PNG, GIF and SVG files served from a CDN. I kept them in one map, so I could swap in a new asset version with a one-line change during feedback rounds.",
        ],
      },
      {
        heading: "A postcard made for chat",
        paragraphs: [
          "**I capture a clean hidden copy of the postcard, not the one on screen.** The visible card has a drop shadow and an underlined name field, and neither should appear in the shared image. So I render a hidden copy without them, capture it with html2canvas at 2× scale and turn it into a PNG blob.",
          "I upload that blob to the backend, because a LINE Flex Message image needs a public HTTPS URL, not a local blob.",
        ],
      },
      {
        heading: "The share loop",
        paragraphs: [
          "**The share step turns each postcard into an invitation back into the campaign.** Because the app runs as a LINE mini-app, every user is already signed in to LINE. I used that LINE user ID as the key for all analytics, and the share step can post directly into friends’ chats.",
          "`liff.shareTargetPicker` sends a text greeting plus two Flex bubbles, the postcard and a “start” button, both linking back into the campaign. When the share succeeds, I ask the backend to send the user a follow-up message, then close the LINE mini-app window.",
        ],
        media: {
          kind: "image",
          src: "/high-jewelry-share-flow.png",
          alt: "Share loop: the campaign’s opening page, LINE’s share target picker, and the signed postcard arriving in a friend’s chat with a button back into the campaign",
          caption:
            "The share loop: liff.shareTargetPicker sends the signed postcard as a Flex message, and its button brings the friend back to the opening page to start their own journey.",
        },
      },
      {
        heading: "The treasure map",
        paragraphs: [
          "**The map picks up at the step the user just finished.** Each finished task is carried in router state. When a task ends, the user returns to `/map#stepN` and the page scrolls smoothly to that step.",
          "The route between steps is an SVG path animated with `stroke-dasharray`, and the matching jewel lights up. Once all three tasks are done, an envelope modal opens and leads to the signing page.",
        ],
        media: { kind: "demoVideo" },
      },
      {
        heading: "Fixes for LINE’s in-app browser",
        paragraphs: [
          "**Small fixes kept the campaign full-screen and navigable inside LINE.** On input blur I call `window.scrollTo(0, 0)`, because otherwise the LINE keyboard leaves the page shifted and no longer full-screen. The signing steps use URL hashes (`/signing#signing`, `#share`) so the in-app back gesture moves between steps instead of leaving the page.",
          "Browsers block audio until the user interacts, so the flow records the user’s tap on an earlier step and starts the music only after that. Wallpapers save after a 700 ms long press.",
        ],
      },
      {
        heading: "What real devices taught me",
        paragraphs: [
          "**In a campaign that lives inside a webview, the share image and the analytics aren’t finished until you’ve checked them on real devices and in real data.** The postcard image took the most rounds. I raised the html2canvas scale from 0.95 to 1.6 to 2 as the client reviewed real shares on phones.",
          "At 2× the capture plus upload took noticeably long, so I added a full-screen loader. I also stopped reusing the blob made when the name field lost focus, and now re-render it at share time, so the image always matches what the user sees.",
          "Analytics needed a fix too. Users return to the map after every task, and each return remounted the page and logged another map view, which inflated the funnel. I moved that page view out of the route tracker and deduplicated it with sessionStorage.",
          "Task progress lives only in router state. That kept a short-lived campaign simple, but reopening the LINE mini-app link starts the user over.",
        ],
      },
    ],
    outcome: [
      "**I delivered the campaign as a single-page React app and shipped the last change on December 13, 2024, after three rounds of client feedback.** It has six routes:",
      {
        items: [
          "landing redirect",
          "opening",
          "map",
          "two wallpaper tasks",
          "signing",
        ],
      },
      "GitHub Actions deploys it to separate dev and prod Firebase Hosting targets.",
    ],
    metrics: [
      {
        value: "17",
        label: "Merged PRs I authored, from first UI draft to launch fixes",
      },
      {
        value: "29",
        label: "GA interaction events, each tied to a LINE user ID",
      },
      { value: "3", label: "Client feedback rounds before launch" },
    ],
    liveDemo: {
      url: "https://creativetravelist.github.io/holiday-2024/",
      note: "Standalone build outside LINE, so login and postcard sharing are disabled. Best viewed on mobile.",
    },
    demoVideoId: "HvHJR5fPHPw",
  },
  photopacer: {
    title: "PhotoPacer — Race Photo Marketplace",
    summary:
      "A race-photo marketplace where runners find their photos by bib number.",
    role: "Founder & Full-stack Engineer",
    stack: ["Next.js", "Node.js / Express", "AWS (S3 + Rekognition)"],
    year: "2023–2024",
    context:
      "PhotoPacer 攝影小隊 · Self-initiated product, sports event photography",
    challenge: [
      "**I built PhotoPacer so runners can find their race photos with one bib-number search.** I run marathons and I shoot photos, so I know both sides: photographers post their shots after the race, and runners then scroll through thousands of photos to find the few that show them. At a single race, one photographer can shoot 2,000 to 5,000 photos. PhotoPacer reads bib numbers from every photo, keeps photographers' originals protected until someone pays, and accepts the payment methods Taiwanese customers actually use.",
      "As a solo developer, I had to make the upload pipeline reliable with no one to share operations work. Three things made that hard:",
      {
        ordered: true,
        items: [
          "**Uploads had to survive unreliable connections.** Photographers upload a whole race from a browser, often on unreliable connections, and one failed request shouldn't cost them the batch.",
          "**Processing couldn't block uploads or overload one Node process.** After upload, every image has to be OCR'd for bib numbers, resized, watermarked and indexed before it can be searched. That work is slow, CPU-heavy and calls a paid external API.",
          "**Bib OCR is noisy.** Relay bibs carry letter prefixes (A1173) and split digits (117-3, 117 3).",
        ],
      },
    ],
    approach: [
      {
        heading: "Upload first, process later",
        paragraphs: [
          "**I split the upload into two decoupled stages, so image bytes never pass through Node's memory.** First, the browser uploads straight to S3 through presigned multipart URLs, which replaced my earlier Multer buffer upload. Second, a separate job runs Rekognition OCR and Sharp watermarking after the uploads finish.",
          "Each event's images are stored in their own collection, `imagecollection/{eventId}`, so bib search only ever scans one race. I designed, built and ran the product alone, from the Next.js frontend (27 routes for runners, photographers and admins) to the Express + MongoDB API (59 REST endpoints across 11 routers) and the Docker deployment.",
        ],
      },
      {
        heading: "A limit at every layer",
        paragraphs: [
          "**Each layer has its own concurrency limit.** Browser uploads run in waves with per-step retries. Server processing runs in fixed batches of 10 to bound AWS calls and memory. The API runs under Node's cluster module with one worker per CPU core, restarting workers that crash.",
        ],
      },
      {
        heading: "Resumable multipart uploads",
        paragraphs: [
          "**A dropped connection costs a photographer only the unfinished files.** On the client, each file is split into 5 MB parts (S3's minimum part size). The client requests a presigned URL for each part, PUTs the parts in parallel and returns the ETags needed to complete the upload. Each step is wrapped in `UploadQueue`, which re-queues failures and retries up to 3 times with a 10-second backoff.",
          "Progress is saved server-side in `progresscollection`. After a reload or a dropped connection, the upload page restores the list and asks the photographer to re-select only the unfinished files. Duplicates are blocked on both sides: by path on the client, and with a `$in` + `Set` check on the server.",
        ],
        media: {
          kind: "image",
          src: "/photopacer-upload.jpg",
          alt: "Photographer upload page showing 53 of 53 photos uploaded for the Taipei Marathon",
          caption:
            "Photographer upload page. Photos go straight to S3 via presigned multipart URLs, then a background job detects bib numbers, adds the watermark and writes each photo’s record to MongoDB.",
        },
      },
      {
        heading: "Bib detection and watermarking",
        paragraphs: [
          "**The processing job picks up only images that haven't been watermarked, so it's safe to re-run after a failure.** It looks for images without a `watermarkedUrl`. Detection normalizes Rekognition output and keeps only matches with confidence above 75% and at least 3 characters, which screens out sponsor logos and stray digits.",
          "Watermarking auto-rotates each image from its EXIF data, resizes it to 1500 px at JPEG quality 75, tiles the watermark and stores the image's orientation. The frontend uses that orientation for a masonry grid where landscape photos span two columns, without loading the image first.",
          "Relay bibs were the weak spot. Search accepts digits only, so for a bib like 123-1 the page asks runners to type 1231 or 123, and OCR could store the same bib as 1231, 123 or 123-1. Photographers could correct tags by hand, but in any format, so a search could still miss. If I rebuilt it, I'd normalize every bib to one canonical form at both upload and search time.",
        ],
        media: {
          kind: "image",
          src: "/photopacer-search.jpg",
          alt: "Runner search page for the Taipei Marathon with a bib number search bar and filtered photo results",
          caption:
            "Runner search page. Runners enter a bib number to find their photos, or filter by photographer, time range, or photos whose bib couldn’t be read. A hint under the search bar explains how to enter relay bibs.",
        },
      },
      {
        heading: "What production taught me",
        paragraphs: [
          "**In a payments-and-media system, anything the server doesn't own will eventually drift, and each resource (network, paid API, CPU) needs its own concurrency limit.** The pipeline evolved through production use, not a single design.",
          "Detection originally ran inline on every upload. In April 2024 I moved it into a post-upload job, first one image at a time and then in groups of 10. Over the following week I raised the browser-side limit step by step from 50 to 500 files per wave.",
          "I fixed other issues the same way: I anchored timestamp filters to Asia/Taipei, moved order creation to the server so an unpaid order is reopened instead of duplicated, and moved upload progress from a cookie into the database.",
        ],
        media: { kind: "demoVideo" },
      },
    ],
    outcome: [
      "**I ran PhotoPacer from July 2023 to July 2024 and covered 20 race events.**",
      {
        items: [
          "2,000 to 5,000 photos per photographer per race, all processed through the bib-detection and watermark pipeline",
          "7 photographers registered, and 2 of them uploaded photos",
          "300+ paid orders through LINE Pay (a popular mobile wallet in Taiwan) and NewebPay",
        ],
      },
      "Because price and visibility were already flags in the pipeline, I added private albums and later moved the platform to free downloads by extending the existing code instead of building separate paths.",
    ],
    metrics: [
      { value: "20", label: "Race events hosted" },
      { value: "2–5K", label: "Photos per photographer per race" },
      { value: "300+", label: "Paid orders" },
    ],
    demoVideoId: "TcvSHUeHAy0",
    demoVideoAspectRatio: "16 / 9",
  },
  "ai-smart-city-hackathon-2026": {
    title:
      "AI Land Appraisal Workbench — New Taipei City Land Administration Hackathon",
    summary:
      "AI-assisted land appraisal forms, maps, and reports in one workflow.",
    role: "Frontend Lead (3-person team)",
    stack: ["React 19 + TypeScript", "Leaflet", "AWS Amplify / Lambda"],
    year: "2026",
    context:
      "New Taipei City Land Administration Department · Government AI hackathon (public-sector land appraisal)",
    challenge: [
      "**Appraisers at the New Taipei City Land Administration build each land-value section by hand.** They fill in a field survey form, a regional factor analysis table and a comparison-method appraisal table, then produce zoning, boundary and facility-distance maps from several government and map sources. The hackathon brief asked teams to automate as much of this as possible while keeping the output usable as an official appraisal document.",
      "Four things made it hard:",
      {
        ordered: true,
        items: [
          "**The three forms depend on each other.** A facility distance in the survey changes a regional factor grade, which changes the comparison price, so an edit in one table has to reach the other two without the numbers drifting apart.",
          "**Some inputs had no public data source.** Land-value section boundaries, for example, exist only as text descriptions.",
          "**AI values had to stay separate from verified ones.** In an official appraisal, readers have to be able to tell AI-generated values from verified data.",
          "**The deliverable was a printable PDF with live maps.** The final output had to be a multi-page PDF that combines tables and live Leaflet maps.",
        ],
      },
    ],
    approach: [
      {
        heading: "My role",
        paragraphs: [
          "**I owned the frontend app end to end as frontend lead on a 3-person team.** CatchOpz’s CTO, a client I had been contracting with for two years, invited me to enter the hackathon together. I built the app with React 19, Vite, Tailwind v4 and Leaflet, while two teammates built the CLI and the AWS Lambda backend.",
        ],
      },
      {
        heading: "A pipeline that matches the appraisal",
        paragraphs: [
          "**I modelled the workflow as a three-stage pipeline, so the types reflect how far the appraisal has progressed.** The stages run survey → regional factors → comparison. Each stage stays in a `Partial` state until the user confirms the previous one, instead of filling empty placeholder tables.",
          "Every field records where its value came from (`ai`, `prefilled`, `manual`, `edited`). A missing AI value stays empty rather than being guessed, because a government appraisal can’t contain invented data. I put all cross-form dependencies in a single mapping table, so live AI results and manual edits go through the same logic.",
        ],
      },
      {
        heading: "Prices that don’t drift",
        paragraphs: [
          "**Recalculating in one direction, from the base price forward, stopped the comparison prices from drifting.** The chain runs: normal unit price → date adjustment → regional and individual adjustments → trial price → weighted benchmark price. Case weights follow the 50/30/20 tiers in Article 27 of the Real Estate Appraisal Technical Rules.",
          "An earlier version worked backwards from the stored trial price, and its values drifted as soon as the user edited two adjustment rates separately. Recomputing all cases from stored state fixed that.",
        ],
      },
      {
        heading: "Boundaries from legal text",
        paragraphs: [
          "**I turned legal boundary text into map polygons, with a manual fallback for any corner the parser can’t resolve.** The parser turns descriptions like “north of X Street, west of Y Lane…” into polygon corners using OpenStreetMap street geometry. When a corner can’t be resolved, the user places it by dragging a map pin, and the app doesn’t throw an error.",
        ],
        media: {
          kind: "image",
          src: "/ai-smart-city-hackathon-boundary.png",
          alt: "Boundary resolver: a legal boundary description for a Shulin District parcel turned into a draggable polygon on a Leaflet map",
          caption:
            "Boundary resolver. A legal description such as “west of Bade St., south of Qizhi St.…” is matched against OpenStreetMap street geometry to place the parcel’s corners, and the user can drag the pin to fine-tune any corner that can’t be resolved.",
        },
      },
      {
        heading: "A PDF export that includes live maps",
        paragraphs: [
          "**I fixed shifted map captures by converting Leaflet’s transforms just before export.** html2canvas mis-renders Leaflet’s nested `translate3d` transforms, so map captures came out shifted or cropped. I convert those transforms to `left`/`top` positions just before the capture and restore them afterwards.",
        ],
        media: {
          kind: "image",
          src: "/ai-smart-city-hackathon-pdf.png",
          alt: "Exported nine-page appraisal report PDF: the field survey form on page 1, with map pages shown in the thumbnail sidebar",
          caption:
            "The exported report. One click combines the three appraisal forms and the Leaflet maps into a nine-page PDF, with map pages captured cleanly after converting Leaflet’s translate3d transforms to left/top positions.",
        },
      },
      {
        heading: "Showing uncertainty, not hiding it",
        paragraphs: [
          "**I repeatedly chose to show uncertainty instead of hiding it.** The survey page shows straight-line distances right away and fills in walking distances in the background, and those results never overwrite a field the user has already edited.",
          "The free OSRM routing service rejected bursts of requests, so I first measured the failures. I then serialised calls through a queue with a 2-second spacing, cached only successful results, and retried only temporary errors, never “no route found”.",
        ],
        media: { kind: "demoVideo" },
      },
    ],
    outcome: [
      "**I delivered a working six-step appraisal flow, deployed to AWS Amplify.** The steps are:",
      {
        items: [
          "task setup, with map pins for the benchmark lot and three comparison cases",
          "the field survey form",
          "the regional factor analysis table",
          "the comparison-method appraisal table",
          "map generation",
          "export",
        ],
      },
      "Six backend services are wired in:",
      {
        items: [
          "facilities",
          "zoning",
          "regional-factor production",
          "comparison production",
          "image upload",
          "report export",
        ],
      },
      "The zoning map falls back to a bundled GeoJSON file if its Lambda is down.",
    ],
    metrics: [
      {
        value: "3 forms + 3 maps",
        label: "Official appraisal documents generated",
      },
      { value: "6", label: "Backend services integrated" },
      { value: "11 days", label: "Initial commit to final demo build" },
    ],
    demoVideoId: "TOE7-qerE_8",
    demoVideoAspectRatio: "16 / 9",
  },
  lifebook: {
    role: "Product Designer & Full-stack Engineer (solo)",
    stack: ["Next.js 15", "Supabase", "Gemini 2.5 Flash"],
    year: "2026",
    context: "Personal project · AI-assisted decision journaling",
    challenge: [
      "People make big life decisions, like quitting a job, moving abroad or starting a company, but rarely write down why they made them or what happened next. Free-form journaling captures the story but buries the decision, the outcome and the lesson inside long text. LifeBooks needed to turn a raw personal story into a structured “LifeCard” (decision → outcome → reflection) and let users link cards together, so patterns across years become visible.",
      "The hard parts were technical. The AI output has to be structured and reliable, and it has to keep the user’s own language and voice, whether Chinese or English, first or third person. Linking cards meant anchoring a connection to a specific phrase inside editable free text without breaking native text selection or Chinese IME input. Because the data is deeply personal, every API path also needed explicit ownership checks on top of database row-level security.",
    ],
    approach: [
      [
        "I designed the UI in Figma and built the app solo: converting the Figma Make prototype to Next.js 15 App Router, then building auth, the data layer, AI structuring and the connection system. I chose Supabase so Postgres, Row Level Security, email magic-link and Google OAuth came from one service, which let a single developer ship auth and data isolation in the first week. I used Gemini 2.5 Flash behind an authenticated API route with a strict JSON contract and runtime validation, so the UI renders typed sections instead of free-form AI text. For later features, I delegated implementation to AI coding agents (Claude / Codex) and kept product decisions, schema approval and code review with me.",
      ],
      [
        "The most involved piece is the inline connection editor. A transparent, fully native <textarea> sits on top of a read-only overlay that renders the same text, with linked phrases shown as clickable pills. Scroll position is mirrored onto the overlay, so caret, selection and Chinese IME composition stay native (StoryEditor.tsx, StoryOverlayRenderer.tsx). Connections store only start_index/end_index offsets rather than a copy of the text, and segmentizeStory() derives the anchors at render time (storyRendering.ts). On the AI side, the prompt requires the model to answer in the same language and grammatical person as the user’s story. The response is parsed and checked for required fields (structureGenerator.ts). If generation fails, the raw story is still saved as a draft (StructureGeneratorPage.tsx).",
      ],
      [
        "After the MVP core, I moved to a review-led workflow. I wrote engineering guardrails for coding agents in CLAUDE.md: every route checks the session, the service-role client is never used, and schema changes ship only as migration proposals I approve. Then I reviewed what the agents produced. That is how the image gallery (client-side compression, reordering, lightbox) and the access-control hardening shipped. The hardening covered ownership checks on connections and keeping private cards from leaking through links (connections/[cardId]/route.ts). The lesson: with agents writing code, my value moved to setting constraints and reviewing for security.",
      ],
    ],
    outcome: [
      "I delivered a deployed MVP [TODO: live URL]. It has two sign-in methods (magic link and Google OAuth), AI story structuring, LifeCard editing, a timeline view, inline card-to-card connections, and an image gallery. [TODO: 上線日期 — 看 Vercel 第一次 production deployment] Next on the roadmap are tags, a timeline filter and an insights panel.",
    ],
    metrics: [
      {
        value: "~3 weeks",
        label: "First commit to MVP core (auth, AI, connections)",
      },
      { value: "14", label: "Authenticated API route handlers" },
      { value: "2", label: "Sign-in methods (magic link + Google OAuth)" },
    ],
  },
  "ichiban-kuji-platform": {
    title: "Ichiban Kuji Platform",
    summary:
      "An online Ichiban Kuji, the Japanese-style prize draw, running inside LINE. Players top up points, reveal tickets through an animated draw, and ship prizes home or to a convenience store.",
    runsInLine: true,
    role: "Sole frontend engineer (LINE mini-app + admin console), launched in under 3 months",
    stack: [
      "Next.js 16 / React 19 + TypeScript",
      "RTK Query + OpenAPI types",
      "Firebase RTDB + LINE mini-apps (LIFF)",
    ],
    year: "2026",
    context: "CatchOpz · Online Ichiban Kuji (prize draw) sold through LINE",
    challenge: [
      "**Shops wanted to run Ichiban Kuji, a physical prize draw, online for customers who already follow them on LINE.** Each set is a fixed pool of numbered tickets mapped to prize tiers, plus a “Last One” prize for whoever draws the final ticket. Online meant real money and real parcels: players top up points, spend them on draws and later ship hundreds of small physical prizes, while staff need a console to run the pools and the shipping.",
      "Three things made it hard:",
      {
        ordered: true,
        items: [
          "**Money and logistics had to work inside LINE’s in-app browser.** The web app runs inside LINE on iOS and Android, where `liff.openWindow` can’t POST and payment providers expect form submissions.",
          "**The reveal had to feel like peeling a real ticket.** The draw itself is the product, and it has to land in a phone webview.",
          "**The ticket pool is shared, finite inventory that changes live.** Two players can’t draw from the same set at once, and every open screen has to stay in sync.",
        ],
      },
    ],
    approach: [
      {
        heading: "One codebase, every shop",
        paragraphs: [
          "**One LINE mini-app codebase serves every shop, and an admin console runs on the same typed API.** I built both frontends in separate repos for CatchOpz, a client I’ve worked with for over two years. The backend API, the draw engine and the point ledger were built by CatchOpz’s backend team, and a teammate set up CI/CD.",
          "Both apps talk to the same backend through RTK Query, typed from its OpenAPI spec, so a schema change shows up as a compile error instead of a bug an operator or player finds later.",
          "The shop is resolved from `/shop/[shopId]`, and its config, including its own LINE mini-app ID, is fetched on the server with `React cache()`. Each shop picks its payment, logistics and invoicing providers in the admin console, so the storefront never hard-codes a provider.",
        ],
      },
      {
        heading: "Payments inside LINE",
        paragraphs: [
          "**The frontend has no payment SDK: it renders whatever form the backend gets from the provider.** A top-up creates an order, then `POST /payment/{orderId}` returns the provider’s HTML, and `renderPaymentOverlay` submits its form or follows its redirect. The same path pays shipping fees, so ECPay, LINE Pay or NewebPay can be switched per shop without frontend changes.",
          "Back from the provider, the success popup opens only when the order reads PAID. Draw prices come from a server quote fetched each time the confirm dialog opens, because the real charge is recalculated inside the submit transaction.",
        ],
      },
      {
        heading: "Shipping to six destinations",
        paragraphs: [
          "**Players can ship prizes six ways, and one store-picker flow works both in LINE and on desktop.** The methods are home, custom address, in-store pickup, face-to-face, 7-Eleven and FamilyMart, and a method is offered only if every item in the request allows it.",
          "For convenience-store pickup, `liff.openWindow` can only open a URL, so I added a bridge page that auto-submits the POST to the ECPay store map. The result never comes back through the window. Instead, both the LINE mini-app and desktop poll the backend by `selectionToken` every 2 s, so one code path works everywhere.",
          "In the admin, shipments are the largest module, with 21 endpoints: splitting an order across carrier shipments, voiding, batch labels, and an A4 picking-list PDF generated in the browser with jsPDF.",
        ],
      },
      {
        heading: "A reveal that feels physical",
        paragraphs: [
          "**The reveal is a sequence, not a single animation.** An intro video hands off to a loop, the ticket drops in with a light beam and a 12-frame shine sprite, and then the player peels it by drag with peel.js. Past 42% the peel finishes itself over 280 ms with a `requestAnimationFrame` ease-out, so nobody gets stuck on a half-open ticket.",
          "Ticket faces are drawn on canvas, with the number set along a Bézier curve and spaced by arc length so letters don’t bunch up. Grand and Last One prizes get a glow frame driven by API flags, which turns off under `prefers-reduced-motion`. All 21 images and 2 videos preload in parallel with the draw request, so the sequence never stalls.",
        ],
        media: { kind: "demoVideo" },
      },
      {
        heading: "Live updates without live data",
        paragraphs: [
          "**I used Firebase RTDB only as a change signal and kept the data in REST.** Each kuji has a pool node holding just a version number. When it changes, the app refetches the odds and invalidates the shared Kuji tag, so list pages update too.",
          "A drawSlot node’s expiresAt drives the queue countdown, falling back to an HTTP read until the first push arrives. A third node feeds the live winner ticker. Nothing subscribes until Firebase custom-token sign-in finishes, and every listener re-subscribes when the user changes from guest to member.",
        ],
      },
      {
        heading: "What testing on real phones taught me",
        paragraphs: [
          "**When the server owns the money, the lock and the inventory, the client should treat its own copy as a hint.** It should re-confirm that copy at each entry point and spend its effort on making the waiting and the reveal feel good.",
          "The draw slot is a server lease, and LINE users switch apps mid-draw. I added an initializer that routes players back to their active lobby, which introduced its own bug: the cached session list could point to a session that had already been released. The fix was to re-fetch on every lobby entry and ignore results older than the entry timestamp.",
          "Countdowns are computed from the absolute expiry time, so a throttled webview timer doesn’t drift. A failed draw now releases the slot and sends the player back instead of leaving them on an error toast.",
          "The effects went through the same loop. The LINE mini-app webview cached videos by file name, so asset URLs now carry a version. Rare-prize effects first keyed off the tier label and now read explicit API flags.",
        ],
      },
    ],
    outcome: [
      "**I shipped both apps in under 3 months, and the platform soft‑launched on 5 October 2026.**",
      {
        title: "In LINE (32 screens)",
        items: [
          "LINE login with OTP sign-up",
          "Kuji detail with odds and a SHA commitment hash",
          "Draw lobby and reveal",
          "Points top-up and coupons",
          "Shipment requests and order tracking",
        ],
      },
      {
        title: "Admin console (20 pages)",
        items: [
          "Kuji sets",
          "Orders and shipments",
          "Members and promotions",
          "CMS content",
          "Store settings",
        ],
      },
      "Both run on Firebase (App Hosting for the LINE mini-app, Hosting for the console), with separate dev and prod targets deployed through GitHub Actions. I also wrote engineering docs for the LINE mini-app (PRD, architecture, SOP, FAQ and a DESIGN.md token spec), so the next developer can learn its payment and auth constraints without reverse-engineering them.",
    ],
    metrics: [
      {
        value: "32 + 20",
        label: "LINE mini-app screens + admin pages shipped",
      },
      {
        value: "6",
        label: "Delivery methods, including two convenience-store chains",
      },
      {
        value: "3",
        label: "RTDB nodes driving live odds, draw queues and a winner ticker",
      },
    ],
    demoVideoId: "8v9Ti1DlMJA",
  },
};

const stats = [
  { value: "6 years", label: "building production web apps" },
  { value: "12+", label: "client projects shipped" },
  { value: "2+ years", label: "with my current long-term client" },
];

const experience: {
  period: string;
  role: string;
  type: string;
  company: string;
  note?: string;
  link?: { label: string; href: string };
  venture?: boolean;
}[] = [
  {
    period: "2024 — Present",
    role: "Frontend Engineer",
    type: "Long-term contract",
    company: "CatchOpz",
    note: "Martech startup building on LINE. 12+ projects for global luxury and consumer brands",
    link: {
      label: "Read the Ichiban Kuji case study",
      href: "/work/ichiban-kuji-platform", // match your actual case study route
    },
  },
  {
    period: "2023 — 2024",
    role: "Founder & Full-stack Engineer",
    type: "Own product",
    company: "PhotoPacer",
    venture: true,
    note: "Marathon photo marketplace I built solo. 20 race events, 300+ paid orders",
    link: {
      label: "Read the PhotoPacer case study",
      href: "/work/photopacer", // match your actual case study route
    },
  },
  {
    period: "2021 — 2023",
    role: "Frontend Engineer",
    type: "Full-time",
    company: "JKOPay",
    note: "Taiwan’s largest e-payment platform, 6M+ users",
    link: {
      label: "Built jkopay.com/application",
      href: "https://www.jkopay.com/application",
    },
  },
  {
    period: "2020 — 2021",
    role: "Frontend Engineer",
    type: "Full-time",
    company: "Environmental Resources International",
    note: "200-person contractor building digital services for Taiwan’s Ministry of Environment",
    link: {
      label: "Built greenlifestyle.moenv.gov.tw",
      href: "https://greenlifestyle.moenv.gov.tw/",
    },
  },
];

function useTheme() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("linda-portfolio-theme");
    return saved
      ? saved === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("linda-portfolio-theme", dark ? "dark" : "light");
  }, [dark]);

  return { dark, setDark };
}

function useScrollMotion(key?: string) {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    document
      .querySelectorAll<HTMLElement>(".reveal")
      .forEach((element) => revealObserver.observe(element));

    const parallaxElements =
      document.querySelectorAll<HTMLElement>("[data-parallax]");
    const progressElements = document.querySelectorAll<HTMLElement>(
      "[data-scroll-progress]",
    );
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollY = window.scrollY;
      const viewport = window.innerHeight;
      const scrollable = root.scrollHeight - viewport;

      root.style.setProperty(
        "--page-progress",
        scrollable > 0 ? (scrollY / scrollable).toFixed(4) : "0",
      );
      root.classList.toggle("is-scrolled", scrollY > 8);

      if (reduceMotion) return;

      const heroScroll = Math.min(scrollY, viewport);
      parallaxElements.forEach((element) => {
        const speed = Number(element.dataset.parallax) || 0.2;
        element.style.setProperty(
          "--parallax-y",
          `${(heroScroll * speed).toFixed(1)}px`,
        );
        element.style.setProperty(
          "--parallax-fade",
          Math.max(0, 1 - heroScroll / (viewport * 0.85)).toFixed(3),
        );
      });

      progressElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const progress = (viewport * 0.7 - rect.top) / rect.height;
        element.style.setProperty(
          "--progress",
          Math.min(1, Math.max(0, progress)).toFixed(4),
        );
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      revealObserver.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      root.classList.remove("is-scrolled");
    };
  }, [key]);
}

function ThemeToggle({
  dark,
  onToggle,
}: {
  dark: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
    >
      <span aria-hidden="true">{dark ? "Light" : "Dark"}</span>
      <span className="theme-toggle__dot" aria-hidden="true" />
    </button>
  );
}

function Header({
  dark,
  onThemeToggle,
}: {
  dark: boolean;
  onThemeToggle: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const homePrefix = window.location.pathname === "/" ? "" : "/";

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <nav className="nav-wrap" aria-label="Main navigation">
        <a className="wordmark" href={`${homePrefix}#top`} onClick={closeMenu}>
          <span className="monogram" aria-hidden="true">
            JP
          </span>
          Juo-Ying Pai
        </a>

        <div
          className={`nav-links ${menuOpen ? "is-open" : ""}`}
          id="mobile-navigation"
        >
          <a href={`${homePrefix}#work`} onClick={closeMenu}>
            Work
          </a>
          <a href={`${homePrefix}#experience`} onClick={closeMenu}>
            Resume
          </a>
          <a href={`${homePrefix}#about`} onClick={closeMenu}>
            About
          </a>
          <a href={`${homePrefix}#contact`} onClick={closeMenu}>
            Contact
          </a>
          <ThemeToggle dark={dark} onToggle={onThemeToggle} />
        </div>

        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </nav>
      <div className="scroll-progress" aria-hidden="true" />
    </header>
  );
}

function SectionHeading({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-heading reveal">
      <span className="section-number">{number}</span>
      <h2>{children}</h2>
    </div>
  );
}

function HomePage() {
  const { dark, setDark } = useTheme();
  useScrollMotion();

  return (
    <div className="site-shell" id="top">
      <Header dark={dark} onThemeToggle={() => setDark((value) => !value)} />

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="page-width parallax" data-parallax="0.22">
            <p className="availability hero-reveal hero-reveal--one">
              <span className="status-dot" aria-hidden="true" />
              Open to remote contract & full-time roles
            </p>
            <p className="eyebrow hero-eyebrow hero-reveal hero-reveal--one">
              <span className="hero-eyebrow__greeting">
                Hi, I’m Pai, a frontend engineer
              </span>
              <span className="hero-eyebrow__dot" aria-hidden="true">
                ·
              </span>
              <span className="hero-eyebrow__stack">
                React / Next.js / TypeScript
              </span>
            </p>
            <h1 id="hero-title" className="hero-reveal hero-reveal--two">
              Crafted frontends,
              <br />
              <em>shipped fast.</em>
            </h1>
            <p className="hero-intro hero-reveal hero-reveal--three">
              I’ve spent 6 years shipping production web apps, from Taiwan’s
              largest e-payment platform to campaigns for global luxury jewelry
              brands. For the past two years, a martech startup has trusted me
              to own the frontend of its flagship products.
            </p>
            <div className="hero-actions hero-reveal hero-reveal--three">
              <a className="button button--primary" href="#work">
                View my work <ArrowRight {...iconProps} />
              </a>
              <a className="button button--outline" href="#contact">
                <Mail {...iconProps} /> Get in touch
              </a>
            </div>
            <ul
              className="hero-meta hero-reveal hero-reveal--four"
              aria-label="Availability"
            >
              <li>
                <MapPin {...iconProps} /> Taipei (UTC+8)
              </li>
              <li>
                <Globe {...iconProps} /> Remote across APAC & Europe
              </li>
              <li>
                <Clock {...iconProps} /> Available until 12:00 CET
              </li>
            </ul>
          </div>
        </section>

        <section className="page-width" aria-label="Highlights">
          <dl className="stats reveal reveal-stagger">
            {stats.map((stat) => (
              <div key={stat.value}>
                <dt>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="section page-width" id="work">
          <SectionHeading number="01">Selected Work</SectionHeading>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <article
                className={`project-card reveal ${
                  project.featured ? "project-card--featured" : ""
                }`}
                key={project.title}
                style={{ transitionDelay: `${Math.min(index * 55, 220)}ms` }}
              >
                <Link
                  className="project-card__link"
                  to={`/work/${project.slug}`}
                  aria-label={`View ${project.title} project`}
                >
                  <span className="project-card__arrow">
                    <ArrowUpRight {...iconProps} size={18} />
                  </span>
                  {project.image ? (
                    <div className="project-image">
                      <img
                        src={project.image}
                        alt={`${project.title} screenshot`}
                      />
                      {project.inset ? (
                        <img
                          className="project-image__inset"
                          src={project.inset}
                          alt=""
                        />
                      ) : null}
                    </div>
                  ) : null}
                  <div className="project-meta">
                    <span className="project-index">{project.index}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <ul className="tag-list" aria-label="Technologies">
                      {project.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section page-width" id="experience">
          <SectionHeading number="02">Experience</SectionHeading>
          <div className="timeline" data-scroll-progress>
            {experience.map((item, index) => (
              <article
                className="timeline-item reveal"
                key={`${item.company}-${item.period}`}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <span className="timeline-icon">
                  {item.venture ? (
                    <Rocket {...iconProps} />
                  ) : (
                    <Briefcase {...iconProps} />
                  )}
                </span>
                <p className="timeline-period">{item.period}</p>
                <div className="timeline-role">
                  <div className="timeline-title">
                    <h3>{item.role}</h3>
                    <span className="employment-tag">{item.type}</span>
                  </div>
                  <p>{item.company}</p>
                </div>
                <p className="timeline-note">
                  {item.note ?? "—"}
                  {item.link ? (
                    <a
                      className="timeline-link"
                      href={item.link.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.link.label}
                      <ArrowUpRight {...iconProps} size={12} />
                    </a>
                  ) : null}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section page-width about" id="about">
          <SectionHeading number="03">About</SectionHeading>
          <div className="about-grid">
            <div className="about-copy reveal">
              <p>
                I’m Pai, a frontend engineer based in Taipei. I studied
                economics and moved into frontend in 2020.
              </p>
              <p>
                I care about the details people feel: a prize reveal that feels
                physical, a checkout that works inside LINE. I work async-first,
                write things down, and use Claude Code to move faster without
                cutting corners. Since 2024, I’ve done it from several countries
                without missing a beat.
              </p>
            </div>
            <div className="skills reveal reveal-stagger">
              <div className="skill-group">
                <h3>Frontend</h3>
                <p>React, Next.js, TypeScript, Responsive UI, Animation</p>
              </div>
              <div className="skill-group">
                <h3>LINE Ecosystem</h3>
                <p>LINE mini-apps (LIFF), LINE Login, Messaging API</p>
              </div>
              <div className="skill-group">
                <h3>Backend & Cloud</h3>
                <p>Node.js, AWS, Amplify, Payments, AI Integrations</p>
              </div>
              <div className="skill-group">
                <h3>Certification</h3>
                <p>
                  <a
                    className="skill-link"
                    href="https://www.credly.com/badges/78bd8a96-5828-4cf8-976d-0cbd91221d6b"
                    target="_blank"
                    rel="noreferrer"
                  >
                    AWS Certified Cloud Practitioner (Oct 2024)
                    <ArrowUpRight {...iconProps} size={12} />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="contact page-width" id="contact">
          <p className="eyebrow reveal">Have a project or role in mind?</p>
          <h2 className="reveal">
            Let’s talk.
            <br />
            <em>I’ll sweat the details.</em>
          </h2>
          <div className="contact-row reveal">
            <div className="contact-links">
              <a href="mailto:juoyingpai@gmail.com">
                <Mail {...iconProps} /> Email
              </a>
              <a
                href="https://www.linkedin.com/in/linda-pai/"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin {...iconProps} /> LinkedIn
              </a>
              <a
                href="https://github.com/linda-pai"
                target="_blank"
                rel="noreferrer"
              >
                <Github {...iconProps} /> GitHub
              </a>
            </div>
            <a
              className="button button--outline"
              href="/pai-resume.pdf"
              download
            >
              Download resume (PDF) <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="page-width">
        <p>Juo-Ying Pai</p>
        <p>Frontend Engineer · Remote (APAC)</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}

const codePathPattern = /([\w.-]+(?:\/[\w.{}[\]-]+)+\.(?:tsx?|jsx?))/;

const boldPattern = /\*\*(.+?)\*\*/;
const inlineCodePattern = /`([^`]+)`/;

function renderCode(text: string) {
  return text
    .split(inlineCodePattern)
    .map((segment, i) =>
      i % 2 === 1 ? (
        <code key={i}>{segment}</code>
      ) : (
        <Fragment key={i}>
          {segment
            .split(codePathPattern)
            .map((part, j) =>
              j % 2 === 1 ? <code key={j}>{part}</code> : part,
            )}
        </Fragment>
      ),
    );
}

// Supports **bold** and `code`; file paths are also shown as code.
function renderInline(text: string) {
  return text
    .split(boldPattern)
    .map((segment, i) =>
      i % 2 === 1 ? (
        <strong key={i}>{renderCode(segment)}</strong>
      ) : (
        <Fragment key={i}>{renderCode(segment)}</Fragment>
      ),
    );
}

function CaseParagraph({ text }: { text: string }) {
  return <p>{renderInline(text)}</p>;
}

function CaseBlocks({ blocks }: { blocks: CaseBlock[] }) {
  return blocks.map((block, i) => {
    if (typeof block === "string") {
      return <CaseParagraph key={i} text={block} />;
    }
    const List = block.ordered ? "ol" : "ul";
    return (
      <Fragment key={i}>
        {block.title ? <h3>{block.title}</h3> : null}
        <List>
          {block.items.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </List>
      </Fragment>
    );
  });
}

function CaseFigure({ image }: { image: CaseImage }) {
  return (
    <figure className="case-figure">
      <div className="case-media case-media--image case-media--auto">
        <img src={image.src} alt={image.alt} />
      </div>
      <figcaption>{image.caption}</figcaption>
    </figure>
  );
}

function CaseVideoFigure({ video }: { video: CaseVideo }) {
  return (
    <figure className="case-figure">
      <iframe
        className="case-figure__video"
        src={`https://www.youtube-nocookie.com/embed/${video.id}`}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <figcaption>{video.caption}</figcaption>
    </figure>
  );
}

function DemoVideo({
  caseStudy,
  title,
}: {
  caseStudy: CaseStudy;
  title: string;
}) {
  return (
    <div
      className={`case-demo reveal reveal--media ${
        caseStudy.demoVideoAspectRatio ? "case-demo--landscape" : ""
      }`}
    >
      <iframe
        style={
          caseStudy.demoVideoAspectRatio
            ? { aspectRatio: caseStudy.demoVideoAspectRatio }
            : undefined
        }
        src={`https://www.youtube-nocookie.com/embed/${caseStudy.demoVideoId}`}
        title={`${title} demo video`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}

function ApproachSections({
  caseStudy,
  sections,
  title,
}: {
  caseStudy: CaseStudy;
  sections: ApproachSection[];
  title: string;
}) {
  return sections.map((section) => {
    const media = section.media;
    // A portrait demo video sits beside its own section's copy.
    const withVideo = media?.kind === "demoVideo" && caseStudy.demoVideoId;
    const copy = (
      <div
        className={`case-copy case-subsection reveal ${
          withVideo ? "case-demo__copy" : ""
        }`}
      >
        <h3>{section.heading}</h3>
        {section.paragraphs.map((paragraph) => (
          <CaseParagraph key={paragraph} text={paragraph} />
        ))}
      </div>
    );

    return (
      <Fragment key={section.heading}>
        {withVideo ? <DemoVideo caseStudy={caseStudy} title={title} /> : null}
        {copy}
        {media?.kind === "image" ? (
          <div className="case-media-grid reveal">
            <CaseFigure image={media} />
          </div>
        ) : media?.kind === "video" ? (
          <div className="case-media-grid reveal">
            <CaseVideoFigure video={media} />
          </div>
        ) : null}
      </Fragment>
    );
  });
}

function ProjectDetailPage() {
  const { slug } = useParams();
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const project = projects[projectIndex];
  const { dark, setDark } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  useScrollMotion(slug);

  if (!project) {
    return (
      <main className="not-found page-width">
        <p className="eyebrow">Project not found</p>
        <h1>This case study isn’t here yet.</h1>
        <Link className="button button--primary" to="/#work">
          Return to selected work
        </Link>
      </main>
    );
  }

  const previous =
    projects[(projectIndex - 1 + projects.length) % projects.length];
  const next = projects[(projectIndex + 1) % projects.length];
  const caseStudy = caseStudies[project.slug];
  const context = caseStudy?.context ?? `${project.title} · Project context`;
  const approach = caseStudy?.approach;
  const approachSections =
    approach && !Array.isArray(approach[0])
      ? (approach as ApproachSection[])
      : undefined;
  const approachGroups = approachSections
    ? undefined
    : (approach as [string[], string[], string[]] | undefined);

  return (
    <div className="site-shell case-study" id="top">
      <Header dark={dark} onThemeToggle={() => setDark((value) => !value)} />

      <main>
        <section
          className="case-hero page-width"
          aria-labelledby="case-study-title"
        >
          <Link className="case-back hero-reveal hero-reveal--one" to="/#work">
            ← Selected work
          </Link>
          <h1 className="hero-reveal hero-reveal--two" id="case-study-title">
            {caseStudy?.title ?? project.title}
          </h1>
          <p className="case-summary hero-reveal hero-reveal--three">
            {caseStudy?.summary ?? project.description}
          </p>
          {caseStudy?.runsInLine ? (
            <p className="case-line-note hero-reveal hero-reveal--three">
              <Info {...iconProps} />
              LINE is the dominant messaging app in Japan, Taiwan and Thailand.
            </p>
          ) : null}
          {caseStudy?.liveDemo ? (
            <div className="case-live hero-reveal hero-reveal--three">
              <a
                className="button button--outline"
                href={caseStudy.liveDemo.url}
                target="_blank"
                rel="noreferrer"
              >
                Try the live demo <ArrowUpRight {...iconProps} />
              </a>
              <p>{caseStudy.liveDemo.note}</p>
            </div>
          ) : null}
          <dl className="case-meta hero-reveal hero-reveal--four">
            <div>
              <dt>Role</dt>
              <dd>{caseStudy?.role ?? "Frontend Engineer"}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{caseStudy?.year ?? "2024"}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{(caseStudy?.stack ?? project.tags).join(" · ")}</dd>
            </div>
            <div>
              <dt>Client / Context</dt>
              <dd>{context}</dd>
            </div>
          </dl>
        </section>

        <div className="page-width reveal reveal--media">
          {caseStudy?.heroScreens ? (
            <div className="case-media case-media--large case-screens">
              {caseStudy.heroScreens.map((screen) => (
                <img key={screen.src} src={screen.src} alt={screen.alt} />
              ))}
            </div>
          ) : project.image ? (
            <div className="case-media case-media--large case-media--image">
              <img src={project.image} alt={`${project.title} screenshot`} />
            </div>
          ) : null}
        </div>

        <section className="case-section page-width">
          <div className="case-section__label reveal">
            <span>01</span>
            <h2>The Challenge</h2>
          </div>
          <div className="case-copy reveal">
            {caseStudy ? (
              <CaseBlocks blocks={caseStudy.challenge} />
            ) : (
              <>
                <p className="placeholder-label">Placeholder copy</p>
                <p>
                  [Describe what the client needed, the core business or user
                  problem, and why this project mattered.]
                </p>
                <p>
                  [Explain what made the work technically or creatively
                  challenging—such as performance constraints, complex
                  interactions, timelines, content, or cross-team dependencies.]
                </p>
              </>
            )}
          </div>
        </section>

        <section className="case-section page-width">
          <div className="case-section__label reveal">
            <span>02</span>
            <h2>My Approach</h2>
          </div>
          {caseStudy && approachSections ? (
            <ApproachSections
              caseStudy={caseStudy}
              sections={approachSections}
              title={project.title}
            />
          ) : (
            <>
              <div className="case-copy reveal">
                {approachGroups ? (
                  approachGroups[0].map((paragraph) => (
                    <CaseParagraph key={paragraph} text={paragraph} />
                  ))
                ) : (
                  <>
                    <p className="placeholder-label">Placeholder copy</p>
                    <p>
                      [Outline your role and the key technical and design
                      decisions you made. Explain why you chose this approach
                      and how it addressed the project’s constraints.]
                    </p>
                  </>
                )}
              </div>

              {caseStudy?.detailImage || caseStudy?.detailVideo ? (
                <div className="case-media-grid reveal reveal-stagger">
                  {caseStudy.detailImage ? (
                    <CaseFigure image={caseStudy.detailImage} />
                  ) : caseStudy.detailVideo ? (
                    <CaseVideoFigure video={caseStudy.detailVideo} />
                  ) : null}
                </div>
              ) : null}

              <div className="case-copy case-copy--continued reveal">
                {(
                  approachGroups?.[1] ?? [
                    "[Add implementation detail here: component architecture, animation strategy, performance optimization, collaboration, or a meaningful problem you solved.]",
                  ]
                ).map((paragraph) => (
                  <CaseParagraph key={paragraph} text={paragraph} />
                ))}
              </div>

              {caseStudy?.featureImage ? (
                <div className="case-feature reveal reveal--media">
                  <CaseFigure image={caseStudy.featureImage} />
                </div>
              ) : null}

              {caseStudy?.demoVideoId ? (
                <>
                  <DemoVideo caseStudy={caseStudy} title={project.title} />
                  <div className="case-copy case-demo__copy reveal">
                    {(approachGroups?.[2] ?? []).map((paragraph) => (
                      <CaseParagraph key={paragraph} text={paragraph} />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="case-copy case-copy--continued reveal">
                    {(
                      approachGroups?.[2] ?? [
                        "[Close the approach section with a final decision, iteration, or lesson that demonstrates your contribution and frontend expertise.]",
                      ]
                    ).map((paragraph) => (
                      <CaseParagraph key={paragraph} text={paragraph} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </section>

        <section className="case-section page-width case-outcome">
          <div className="case-section__label reveal">
            <span>03</span>
            <h2>Outcome</h2>
          </div>
          <div className="case-copy reveal">
            {caseStudy ? (
              <CaseBlocks blocks={caseStudy.outcome} />
            ) : (
              <>
                <p className="placeholder-label">Placeholder copy</p>
                <p>
                  [Summarize what shipped, how the work met the client’s goals,
                  and any feedback or next steps. Add verified results only.]
                </p>
              </>
            )}
          </div>
          <dl className="metrics reveal reveal-stagger">
            {(
              caseStudy?.metrics ??
              Array.from({ length: 3 }, () => ({
                value: "[Metric value]",
                label: "[Metric label or result]",
              }))
            ).map((metric, i) => (
              <div key={i}>
                <dt>{metric.value}</dt>
                <dd>{metric.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <nav
          className="case-pagination page-width"
          aria-label="Project navigation"
        >
          <Link to={`/work/${previous.slug}`}>
            <span>← Previous project</span>
            <strong>{previous.title}</strong>
          </Link>
          <Link to={`/work/${next.slug}`}>
            <span>Next project →</span>
            <strong>{next.title}</strong>
          </Link>
        </nav>
      </main>

      <footer className="page-width">
        <p>Juo-Ying Pai</p>
        <p>Frontend Engineer · Remote (APAC)</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}

export const router = createBrowserRouter([
  { path: "/", Component: HomePage },
  { path: "/work/:slug", Component: ProjectDetailPage },
  { path: "*", Component: HomePage },
]);
