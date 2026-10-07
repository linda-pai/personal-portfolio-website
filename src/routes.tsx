import { useEffect, useState } from "react";
import { Link, createBrowserRouter, useParams } from "react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Github,
  Globe,
  ImageIcon,
  Linkedin,
  Mail,
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
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "PAÑPURI",
    description:
      "Immersive LINE mini-app campaign for a Thai luxury wellness brand: a six-step animated climb ending in a personalized, shareable result card.",
    tags: ["CSS Animation", "LINE Mini App", "3D Transforms"],
    index: "01",
    slug: "panpuri",
    image: "/panpuri-home.png",
    featured: true,
  },
  {
    title: "Tiffany & Co. / BVLGARI Thailand",
    description:
      "Multilingual Thai/English e-commerce sites, built for a Thai marketing agency.",
    tags: ["Next.js", "i18n", "E-commerce"],
    index: "02",
    slug: "tiffany-bvlgari-thailand",
  },
  {
    title: "PhotoPacer",
    description:
      "Marathon photo marketplace with bib-number detection and integrated payments.",
    tags: ["Full-stack", "AWS", "Payments"],
    index: "03",
    slug: "photopacer",
  },
  {
    title: "LifeBook",
    description:
      "AI-powered life stories transformed into knowledge cards and timelines.",
    tags: ["Next.js", "AI"],
    index: "04",
    slug: "lifebook",
  },
  {
    title: "AI Smart City Hackathon 2026",
    description:
      "AI-assisted land appraisal workbench for New Taipei City, built as frontend lead.",
    tags: ["React", "Leaflet", "AWS Amplify"],
    index: "05",
    slug: "ai-smart-city-hackathon-2026",
  },
];

type CaseStudy = {
  title?: string;
  summary?: string;
  role?: string;
  stack?: string[];
  year: string;
  context: string;
  challenge: string[];
  approach: [string[], string[], string[]];
  outcome: string[];
  metrics: { value: string; label: string }[];
  demoVideoId?: string;
  heroScreens?: { src: string; alt: string }[];
};

const caseStudies: Record<string, CaseStudy> = {
  panpuri: {
    year: "2024",
    context: "PAÑPURI · Thai luxury fragrance & wellness",
    challenge: [
      "PAÑPURI wanted a campaign for its Thai LINE audience that people could step into rather than scroll past: a guided “climb” in which each user signs a personal pledge, answers reflective prompts, and leaves with a keepsake they want to share. The experience had to run inside LINE’s in-app browser, identify users through their LINE accounts, and turn the ending into distribution: share to Facebook or Instagram, or send a postcard that brings a friend into the same journey.",
    ],
    approach: [
      ["I owned the frontend: I translated the designer’s Figma into all eight screens, the six-step journey state machine, the screenshot-and-share pipeline, the LIFF postcard flow, and the v2 redesign. I integrated with a REST API built by a backend teammate."],
      ["I treated the journey as a single page with a step state machine instead of separate routes, so one background image could “camera-pan” up the mountain using CSS background-size/background-position transitions. That gave the ascent a continuous feel without one large asset per screen."],
      ["I chose native CSS scroll-snap over fullpage.js for the swipe-to-choose “camera roll”, and sized layouts from a JS-measured --app-height variable because 100vh is unreliable inside LINE’s in-app browser."],
    ],
    outcome: [
      "The campaign launched in 2024 as a mobile-only LINE mini-app for PAÑPURI’s Thai audience. Users sign, take three quizzes, get one of three personalized result cards, and can share it to Facebook or Instagram, save it with a long-press, or send a LIFF Flex-message postcard that invites a friend into the journey.",
      "I instrumented the whole funnel with GA4 view and click events, and dev and prod deploy separately to Firebase Hosting through GitHub Actions.",
    ],
    metrics: [
      { value: "8", label: "Screens shipped" },
      { value: "3", label: "Personalized result & postcard variants" },
      { value: "9 weeks", label: "First commit to final release fix" },
    ],
    demoVideoId: "FWb1u-R1MG4",
    heroScreens: [
      { src: "/panpuri-home.png", alt: "PAÑPURI journey start screen" },
      { src: "/panpuri-signing.png", alt: "Signing the personal pledge" },
      { src: "/panpuri-flag-choosing.png", alt: "Choosing a prayer flag" },
    ],
  },
  "tiffany-bvlgari-thailand": {
    title: "Bvlgari Thailand LINE E-Shop",
    summary: "A bilingual luxury jewelry store built inside LINE.",
    role: "Frontend Engineer",
    stack: ["React", "LINE LIFF", "Material UI"],
    year: "2025–2026",
    context:
      "BVLGARI Thailand · Luxury jewelry & watches, in-app commerce on LINE",
    challenge: [
      "Bvlgari Thailand needed a storefront that customers could open straight from the brand's LINE Official Account. It had to let them browse collections, read product details, and place orders without leaving the chat app. The store had to feel like Bvlgari while running as a mini-app inside LINE's in-app browser, in both Thai and English.",
      "The project started from an existing white-label LINE shop template built for another luxury brand, on a shared internal platform (base-shell, material-ui-shell, shopbot-kit). That meant rebranding everything without forking the platform. Homepage sections, collections, and translations were hardcoded or mocked, but they needed to come from a CMS so they could change without a deploy. Thai and English needed different typefaces. iOS WebViews showed rendering artifacts. Marketing also needed reliable attribution across GA4, Meta, and LINE Ads.",
    ],
    approach: [
      [
        "I owned frontend feature work from the rebrand through launch support, across 29 merged pull requests. I started by replacing the template's visual identity (Bvlgari typefaces, logo, icons, palette), then moved the storefront from mock data to live APIs: landing page, collections, collection products, product tags, and i18n entities. That way homepage sections and their translations are driven by the backend instead of config/homeConfig.js, which I removed. I made localization a layered system rather than two static files, and made typography depend on the active language. I also pulled all analytics into a single src/tracking/ module, so every platform reports the same funnel events.",
      ],
      [
        "Localization merges two sources. Static locale files (src/config/locales/en.js, th.js) are the baseline. Translations fetched from the shop's i18n-entities API are layered on top, with category and collection strings namespaced as {entityType}_{entityId}_{key} so CMS content can't collide with UI strings (src/providers/I18nProvider/Provider.js). The default language comes from liff.getLanguage() and falls back to English for non-Thai users. The theme's typography then switches between BulgariType and Noto Sans Thai based on that language (src/utils/typography.js).",
        "For campaigns, I built a deeplink entry point. LandingPage.js reads ?target= to route users to any in-app page, keeps the remaining query params, and logs the from source to GA so campaign traffic can be attributed. On a feature branch, I've added Meta Pixel and LINE Tag conversion events (ViewContent / AddToCart / InitiateCheckout / Purchase with THB value) through thin wrappers in src/tracking/. They're attached at the route level through tracker HOCs (Tracker.js).",
      ],
      [
        "Several of the most useful fixes came from the LINE iOS WebView rather than from desktop browsers. The category tabs drew their active state with a CSS outline on a circular icon, which left visual “ghosting” on iOS. I replaced it with dedicated active-state SVG assets (CategoryTabsWithBanner.js). The lesson I took away: inside in-app browsers, test on the real device early, and favor static assets over CSS effects for brand-critical UI.",
      ],
    ],
    outcome: [
      "I delivered a bilingual LIFF storefront with 12 routes, including home, category, collection, product, cart, checkout, order history, order detail, settings, and FAQ. It deploys to Firebase Hosting with separate dev and prod targets through GitHub Actions. Merchandising content and its translations are now managed through backend APIs instead of code changes.",
    ],
    metrics: [
      { value: "2 locales", label: "Thai & English, 172 UI keys each" },
      { value: "29", label: "Pull requests merged" },
      { value: "12", label: "Storefront routes shipped" },
    ],
  },
  photopacer: {
    title: "Photo Pacer — Race Photo Marketplace",
    summary:
      "A race-photo marketplace where runners find their photos by bib number.",
    role: "Founder & Full-stack Engineer",
    stack: ["Next.js", "Node.js / Express", "AWS (S3 + Rekognition)"],
    year: "2023–2025",
    context:
      "PHOTO PACER 攝影小隊 · Self-initiated product, sports event photography",
    challenge: [
      "I run marathons and I shoot photos, so I know both sides of race-day photography. Photographers along the course post their shots online after the race, and runners then have to scroll through thousands of photos to find the few that show them. At a single race, one photographer can shoot 2,000 to 5,000 photos. I built PHOTO PACER as my own product to fix that: it reads bib numbers from every photo so runners can find theirs with one search, keeps photographers' originals protected until someone pays, and accepts the payment methods Taiwanese customers actually use.",
      "As a solo developer, I had to make the upload pipeline reliable without anyone else to share operations work. Photographers upload a whole race from a browser, often on unreliable connections, and one failed request shouldn't cost them the batch. After upload, every image has to be OCR'd for bib numbers, resized, watermarked and indexed before it can be searched. That work is slow, CPU-heavy and calls a paid external API, so it couldn't block the upload or overload a single Node process. Bib OCR is also noisy: relay bibs carry letter prefixes (A1173) and split digits (117-3, 117 3).",
    ],
    approach: [
      [
        "I designed, built and ran the product alone, from the Next.js frontend (27 routes for runners, photographers and admins) to the Express + MongoDB API (59 REST endpoints across 11 routers) and the Docker deployment.",
        "I split the upload into two decoupled stages. First, the browser uploads straight to S3 through presigned multipart URLs, so image bytes never pass through Node's memory. This replaced my earlier Multer buffer upload. Second, a separate job runs Rekognition OCR and Sharp watermarking after the uploads finish.",
        "I set a separate concurrency limit at each layer: browser uploads run in waves with per-step retries, server processing runs in fixed batches of 10 to bound AWS calls and memory, and the API runs under Node's cluster module with one worker per CPU core, restarting workers that crash.",
        "I stored each event's images in their own collection (imagecollection/{eventId}), so bib search only ever scans one race.",
      ],
      [
        "On the client, lib/upload/chunkFileAndPutS3.ts splits each file into 5 MB parts (S3's minimum part size), requests a presigned URL for each part, PUTs the parts in parallel, and returns the ETags needed to complete the upload (backend side: src/routes/upload.js). Each step is wrapped in UploadQueue (lib/upload/uploadQueue.ts), which re-queues failures and retries up to 3 times with a 10-second backoff.",
        "Progress is saved server-side in progresscollection. After a reload or a dropped connection, components/upload/UploadImages.tsx restores the list and asks the photographer to re-select only the unfinished files. Duplicates are blocked on both sides: by path on the client, and with a $in + Set check on the server.",
        "On the server, src/modules/detectAndWatermarkQueue.js picks up only images without a watermarkedUrl, so the job is safe to re-run after a failure. src/modules/detectText.js normalizes Rekognition output and keeps only matches with confidence above 75% and at least 3 characters, which screens out sponsor logos and stray digits.",
        "src/modules/watermark/drawWatermark.js auto-rotates each image from its EXIF data, resizes it to 1500 px at JPEG quality 75, tiles the watermark, and stores its orientation. The frontend uses that orientation for an orientation-aware masonry grid, where landscape photos span two columns, without loading the image first.",
      ],
      [
        "The pipeline evolved through production use, not a single design. Detection originally ran inline on every upload. In April 2024 I moved it into a post-upload job, first one image at a time and then in groups of 10. Over the following week I raised the browser-side limit step by step from 50 to 500 files per wave.",
        "I fixed other issues the same way: I anchored timestamp filters to Asia/Taipei, moved order creation to the server so an unpaid order is reopened instead of duplicated, and moved upload progress from a cookie into the database.",
        "The lesson I took away: in a payments-and-media system, anything the server doesn't own will eventually drift, and each resource (network, paid API, CPU) needs its own concurrency limit.",
      ],
    ],
    outcome: [
      "I ran PHOTO PACER from October 2023 to June 2025 and covered 20 race events. Each event produced 2,000 to 5,000 photos, all processed through the bib-detection and watermark pipeline. Seven photographers registered, two of them uploaded photos, and each event averaged 16 paid orders through LINE Pay and NewebPay.",
      "Because price and visibility were already flags in the pipeline, I added private albums (January 2025) and later moved the platform to free downloads (June 2025) by extending the existing code instead of building separate paths.",
    ],
    metrics: [
      { value: "20", label: "Race events hosted" },
      { value: "2–5K", label: "Photos processed per event" },
      { value: "0 bytes", label: "Image data proxied through the API" },
    ],
  },
  "ai-smart-city-hackathon-2026": {
    title:
      "AI Land Appraisal Workbench — New Taipei City Land Administration Hackathon",
    summary:
      "AI-assisted land appraisal forms, maps, and reports in one workflow.",
    role: "Frontend Engineer (frontend lead on a 3-person team)",
    stack: ["React 19 + TypeScript", "Leaflet", "AWS Amplify / Lambda"],
    year: "2026",
    context:
      "New Taipei City Land Administration Department · Government AI hackathon (public-sector land appraisal)",
    challenge: [
      "Appraisers at the New Taipei City Land Administration build each land-value section by hand. They fill in a field survey form (表3), a regional factor analysis table (表5), and a comparison-method appraisal table (表4), then produce zoning, boundary, and facility-distance maps. They gather the data from several government and map sources. The hackathon brief asked teams to automate as much of this as possible while keeping the output usable as an official appraisal document.",
      "Technically, the three forms depend on each other. A facility distance in the survey changes a regional factor grade, which changes the comparison price, so an edit in one table has to reach the other two without the numbers drifting apart. Several inputs had no public data source, including land-value section boundaries, which exist only as text descriptions. The AI-generated values also had to stay visibly separate from verified ones. The final deliverable had to be a printable, multi-page PDF that combines tables and live Leaflet maps.",
    ],
    approach: [
      [
        "I built the frontend app (React 19, Vite, Tailwind v4, Leaflet), and two teammates built the CLI and the AWS Lambda backend. I modelled the workflow as a three-stage pipeline (survey → regional factors → comparison). Each stage stays in a Partial state until the user confirms the previous one, so the types reflect how far the appraisal has progressed instead of filling empty placeholder tables. Every field records where its value came from (ai / prefilled / manual / edited), and a missing AI value stays empty rather than being guessed, because a government appraisal can't contain invented data. I put all cross-form dependencies in a single mapping table (lib/formLinkage.ts), so live AI results and manual edits go through the same logic.",
      ],
      [
        "The comparison table recalculates in one direction, from the base price forward (lib/pricing.ts): normal unit price → date adjustment → regional and individual adjustments → trial price → weighted benchmark price. Case weights follow the 50/30/20 tiers in Article 27 of the Real Estate Appraisal Technical Rules. An earlier version worked backwards from the stored trial price, and its values drifted as soon as the user edited two adjustment rates separately. Recomputing all cases from stored state fixed that.",
        "The second problem was PDF export: html2canvas mis-renders Leaflet's nested translate3d transforms, so map captures came out shifted or cropped. I convert those transforms to left/top positions just before the capture and restore them afterwards (lib/exportPdf.ts).",
        "I also wrote a parser that turns legal boundary text (“north of X Street, west of Y Lane…”) into polygon corners using OpenStreetMap street geometry. When a corner can't be resolved, the user places it by dragging a map pin, and the app does not throw an error (lib/boundaryRange.ts, components/BoundaryRangeMap.tsx).",
      ],
      [
        "I repeatedly chose to show uncertainty instead of hiding it. For example, the free OSRM routing service rejected bursts of requests, so I first measured the failures. I then serialised calls through a queue with a 2-second spacing, cached only successful results, and retried only temporary errors, never “no route found” (api/distance.ts). The survey page shows straight-line distances right away and fills in walking distances in the background, and those results never overwrite a field the user has already edited.",
      ],
    ],
    outcome: [
      "I delivered a working six-step flow: task setup with map pins for the benchmark lot and three comparison cases, the three appraisal forms, map generation, and export. Six backend services are wired in (facilities, zoning, regional-factor production, comparison production, image upload, report export). The app deploys to AWS Amplify, and the zoning map falls back to a bundled GeoJSON file if its Lambda is down.",
    ],
    metrics: [
      { value: "3 forms + 4 maps", label: "Official appraisal documents generated" },
      { value: "6", label: "Backend services integrated" },
      { value: "11 days", label: "Initial commit to final demo build" },
    ],
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
      { value: "~3 weeks", label: "First commit to MVP core (auth, AI, connections)" },
      { value: "14", label: "Authenticated API route handlers" },
      { value: "2", label: "Sign-in methods (magic link + Google OAuth)" },
    ],
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
  venture?: boolean;
}[] = [
  {
    period: "2024 — Present",
    role: "Frontend Engineer",
    type: "Long-term contract",
    company: "CatchOpz",
  },
  {
    period: "2023 — 2024",
    role: "Founder & Full-stack Engineer",
    type: "Founder",
    company: "PhotoPacer",
    venture: true,
  },
  {
    period: "2021 — 2023",
    role: "Frontend Engineer",
    type: "Full-time",
    company: "JKOPay",
    note: "Taiwan’s largest e-payment platform, 6M+ users",
  },
  {
    period: "2020 — 2021",
    role: "Frontend Engineer",
    type: "Full-time",
    company: "Environmental Resources International",
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
            LP
          </span>
          Linda Pai
        </a>

        <div
          className={`nav-links ${menuOpen ? "is-open" : ""}`}
          id="mobile-navigation"
        >
          <a href={`${homePrefix}#work`} onClick={closeMenu}>
            Work
          </a>
          <a href={`${homePrefix}#about`} onClick={closeMenu}>
            About
          </a>
          <a href={`${homePrefix}#experience`} onClick={closeMenu}>
            Resume
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
              Available for contract work
            </p>
            <p className="eyebrow hero-reveal hero-reveal--one">
              Frontend Engineer <span>·</span> React / Next.js / TypeScript
            </p>
            <h1 id="hero-title" className="hero-reveal hero-reveal--two">
              In-house discipline,
              <br />
              <em>contractor flexibility.</em>
            </h1>
            <p className="hero-intro hero-reveal hero-reveal--three">
              I build production web products, including agency projects for
              brands like Tiffany & Co. and BVLGARI, and I’ve been a client’s
              trusted contract engineer for 2+ years.
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
                <Globe {...iconProps} /> Remote · APAC
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
                  <div className="project-image">
                    {project.image ? (
                      <img src={project.image} alt={`${project.title} screenshot`} />
                    ) : (
                      <>
                        <ImageIcon {...iconProps} />
                        <p>Screenshot coming soon</p>
                      </>
                    )}
                  </div>
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
                <p className="timeline-note">{item.note ?? "—"}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section page-width about" id="about">
          <SectionHeading number="03">About</SectionHeading>
          <div className="about-grid">
            <div className="about-copy reveal">
              <p>
                I bring in-house ownership to contract work: I take features
                from spec to production, communicate clearly in async
                environments, and stay accountable across time zones. Since 2024
                I’ve worked remotely from several countries without missing a
                beat.
              </p>
              <p>
                Outside client work, I build AI-enabled products that help
                people.
              </p>
            </div>
            <div className="skills reveal reveal-stagger">
              <div className="skill-group">
                <h3>Frontend</h3>
                <p>React, Next.js, TypeScript, Responsive UI, Animation</p>
              </div>
              <div className="skill-group">
                <h3>LINE Ecosystem</h3>
                <p>LIFF, LINE Login, Messaging API</p>
              </div>
              <div className="skill-group">
                <h3>Backend & Cloud</h3>
                <p>Node.js, AWS, Amplify, Payments, AI Integrations</p>
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
              href="/linda-pai-resume.pdf"
              download
            >
              Download resume (PDF) <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="page-width">
        <p>Linda (Juo-Ying) Pai</p>
        <p>Frontend Engineer · Remote (APAC)</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}

function MediaPlaceholder({
  label,
  large = false,
}: {
  label: string;
  large?: boolean;
}) {
  return (
    <div
      className={`case-media ${large ? "case-media--large" : ""}`}
      aria-label={`${label} placeholder`}
    >
      <span>Media placeholder</span>
      <p>{label}</p>
      <small>Replace with image or video</small>
    </div>
  );
}

const codePathPattern = /([\w.-]+(?:\/[\w.{}[\]-]+)+\.(?:tsx?|jsx?))/;

function CaseParagraph({ text }: { text: string }) {
  return (
    <p>
      {text
        .split(codePathPattern)
        .map((part, i) => (i % 2 === 1 ? <code key={i}>{part}</code> : part))}
    </p>
  );
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

  return (
    <div className="site-shell case-study" id="top">
      <Header dark={dark} onThemeToggle={() => setDark((value) => !value)} />

      <main>
        <section
          className="case-hero page-width parallax"
          data-parallax="0.12"
          aria-labelledby="case-study-title"
        >
          <Link className="case-back hero-reveal hero-reveal--one" to="/#work">
            ← Selected work
          </Link>
          <p className="eyebrow hero-reveal hero-reveal--one">
            Case study · {project.index}
          </p>
          <h1 className="hero-reveal hero-reveal--two" id="case-study-title">
            {caseStudy?.title ?? project.title}
          </h1>
          <p className="case-summary hero-reveal hero-reveal--three">
            {caseStudy?.summary ?? project.description}
          </p>
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
          ) : (
            <MediaPlaceholder label="Project hero image" large />
          )}
        </div>

        <section className="case-section page-width">
          <div className="case-section__label reveal">
            <span>01</span>
            <h2>The Challenge</h2>
          </div>
          <div className="case-copy reveal">
            {caseStudy ? (
              caseStudy.challenge.map((paragraph) => (
                <CaseParagraph key={paragraph} text={paragraph} />
              ))
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
          <div className="case-copy reveal">
            {caseStudy ? (
              caseStudy.approach[0].map((paragraph) => (
                <CaseParagraph key={paragraph} text={paragraph} />
              ))
            ) : (
              <>
                <p className="placeholder-label">Placeholder copy</p>
                <p>
                  [Outline your role and the key technical and design decisions
                  you made. Explain why you chose this approach and how it
                  addressed the project’s constraints.]
                </p>
              </>
            )}
          </div>

          <div className="case-media-grid reveal reveal-stagger">
            <MediaPlaceholder label="Interaction or feature detail" />
            <MediaPlaceholder label="Responsive design detail" />
          </div>

          <div className="case-copy case-copy--continued reveal">
            {(caseStudy?.approach[1] ?? ["[Add implementation detail here: component architecture, animation strategy, performance optimization, collaboration, or a meaningful problem you solved.]"]).map((paragraph) => (
              <CaseParagraph key={paragraph} text={paragraph} />
            ))}
          </div>

          {caseStudy?.demoVideoId ? (
            <>
              <div className="case-demo reveal reveal--media">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${caseStudy.demoVideoId}`}
                  title={`${project.title} demo video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className="case-copy case-demo__copy reveal">
                {caseStudy.approach[2].map((paragraph) => (
                  <CaseParagraph key={paragraph} text={paragraph} />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="reveal reveal--media">
                <MediaPlaceholder label="Full-width flow or demo" large />
              </div>

              <div className="case-copy case-copy--continued reveal">
                {(caseStudy?.approach[2] ?? ["[Close the approach section with a final decision, iteration, or lesson that demonstrates your contribution and frontend expertise.]"]).map((paragraph) => (
                  <CaseParagraph key={paragraph} text={paragraph} />
                ))}
              </div>
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
              caseStudy.outcome.map((paragraph) => (
                <CaseParagraph key={paragraph} text={paragraph} />
              ))
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
        <p>Linda (Juo-Ying) Pai</p>
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
