import type {
  BlogImage,
  BlogPost,
  ParagraphBlock,
  ReferenceContent,
  NarrativeContent,
  SimpleContent,
  CaseStudyContent,
} from "../domain/post";

const image = (slug: string, alt: string): BlogImage => ({
  url: `/images/blog/${slug}.svg`,
  alt,
  width: 1600,
  height: 900,
});

const p = (...texts: string[]): ParagraphBlock => ({
  type: "paragraph",
  content: texts.map((text) => ({ text })),
});

const soilFa = "مثلث-بافت-خاک";
const soilEn = "soil-texture-triangle";
const symphonyFa = "سمفونی-قطره-ها";
const symphonyEn = "symphony-of-droplets";
const pilotFa = "نتایج-پایلوت-صفا";
const pilotEn = "sfa-pilot-results";
const welcomeFa = "به-صفا-خوش-آمدید";
const welcomeEn = "welcome-to-sfa";

const referenceContentFa: ReferenceContent = {
  type: "reference",
  intro: [
    p(
      "مثلث بافت خاک، یکی از مهم‌ترین ابزارهای تشخیصی در کشاورزی است. این مثلث نسبت شن، سیلت و رس را به کلاس‌های بافت خاک پیوند می‌دهد و رفتار آب و ریشه را قابل پیش‌بینی می‌کند.",
    ),
  ],
  sections: [
    {
      title: "گروه خاک‌های شنی",
      subsections: [
        {
          title: "شن",
          paragraphs: [
            p(
              "در این خاک بیش از ۸۵ درصد ذرات را شن تشکیل می‌دهد. نفوذپذیری بسیار بالا است و آب به‌سرعت از منطقه ریشه خارج می‌شود.",
            ),
          ],
          management: p(
            "آبیاری قطره‌ای با دورهای کوتاه و افزودن مواد آلی برای افزایش ظرفیت نگهداشت آب ضروری است.",
          ),
        },
        {
          title: "لوم شنی",
          paragraphs: [
            p(
              "ترکیب شن با مقدار کمی رس و سیلت، ساختار را کمی پایدارتر می‌کند و ظرفیت نگهداشت آب را نسبت به شن خالص بالا می‌برد.",
            ),
          ],
        },
      ],
    },
    {
      title: "گروه خاک‌های لومی",
      subsections: [
        {
          title: "لوم",
          paragraphs: [
            p(
              "لوم ترکیب متعادلی از سه ذره اصلی است: رس مواد غذایی را نگه می‌دارد، شن تهویه را بهبود می‌دهد و سیلت بستر نرمی برای رشد ریشه فراهم می‌کند.",
            ),
          ],
          management: p(
            "بیشتر محصولات در این خاک بهخوبی رشد می‌کنند و الگوی پیاز رطوبتی در آبیاری قطره‌ای معمولاً متقارن و کارآمد است.",
          ),
        },
      ],
    },
  ],
};

const referenceContentEn: ReferenceContent = {
  type: "reference",
  intro: [
    p(
      "The soil texture triangle links the proportions of sand, silt, and clay to texture classes, making water behaviour and root development predictable.",
    ),
  ],
  sections: [
    {
      title: "Sandy soil group",
      subsections: [
        {
          title: "Sand",
          paragraphs: [
            p(
              "More than 85% of this soil is sand. Infiltration is very fast and water leaves the root zone through deep percolation.",
            ),
          ],
          management: p(
            "Use drip irrigation with short intervals and add organic matter to improve water-holding capacity.",
          ),
        },
        {
          title: "Loamy sand",
          paragraphs: [
            p(
              "A small amount of clay and silt gives sand grains some structure and improves water retention compared with pure sand.",
            ),
          ],
        },
      ],
    },
    {
      title: "Loamy soil group",
      subsections: [
        {
          title: "Loam",
          paragraphs: [
            p(
              "Loam balances the three particles: clay retains nutrients, sand improves aeration, and silt gives roots a soft medium.",
            ),
          ],
          management: p(
            "Most crops grow well in loam, and drip irrigation usually creates a symmetrical, efficient wetting bulb.",
          ),
        },
      ],
    },
  ],
};

const narrativeContentFa: NarrativeContent = {
  type: "narrative",
  intro: [
    p(
      "در جهانی که با تغییر اقلیم دست‌وپنجه نرم می‌کند، رها کردن آب روی زمین و امید به سبزی محصول دیگر پاسخ نمی‌دهد. کشاورزی دقیق، نسبت محصول به تبخیر و تعرق را به اصل راهنما تبدیل کرده است.",
    ),
  ],
  blocks: [
    {
      type: "image",
      image: image("symphony-of-droplets", "قطره‌های آب روی برگ"),
      caption: "هر قطره‌ای که به ریشه برسد، فرصتی برای امنیت غذایی است.",
    },
    {
      type: "heading",
      level: 2,
      text: "از آبیاری سطحی تا مهندسی رطوبت",
    },
    p(
      "آبیاری سطحی با تکیه بر گرانش، ساده و کم‌هزینه است؛ اما توزیع نامنظم آب، نفوذ عمقی و رواناب سطحی، بازده را پایین می‌آورد.",
    ),
    {
      type: "heading",
      level: 2,
      text: "انقلاب قطره‌ای",
    },
    p(
      "آبیاری قطره‌ای به‌جای خیس کردن کل مزرعه، یک ناحیه سه‌بعدی در زیر گیاه ایجاد می‌کند. این ناحیه، پیاز رطوبتی نام دارد و آب را دقیقاً به منطقه ریشه می‌رساند.",
    ),
    {
      type: "list",
      ordered: false,
      items: [
        [{ text: "کاهش تبخیر و رواناب" }],
        [{ text: "توزیع یکنواخت‌تر آب و کود" }],
        [{ text: "امکان مدیریت دقیق تنش آبی" }],
      ],
    },
  ],
};

const narrativeContentEn: NarrativeContent = {
  type: "narrative",
  intro: [
    p(
      "In a world shaped by climate change, releasing water onto the land and hoping for green crops is no longer enough. Precision agriculture makes the ratio of yield to evapotranspiration the guiding principle.",
    ),
  ],
  blocks: [
    {
      type: "image",
      image: image("symphony-of-droplets", "Water droplets on a leaf"),
      caption: "Every drop that reaches the root is an opportunity for food security.",
    },
    {
      type: "heading",
      level: 2,
      text: "From surface irrigation to moisture engineering",
    },
    p(
      "Surface irrigation is simple and inexpensive, but uneven distribution, deep percolation, and runoff reduce efficiency.",
    ),
    {
      type: "heading",
      level: 2,
      text: "The drip revolution",
    },
    p(
      "Drip irrigation creates a three-dimensional wetted zone beneath the plant instead of wetting the whole field, delivering water directly to the root zone.",
    ),
    {
      type: "list",
      ordered: false,
      items: [
        [{ text: "Less evaporation and runoff" }],
        [{ text: "More uniform water and nutrient distribution" }],
        [{ text: "Precise water-stress management" }],
      ],
    },
  ],
};

const caseStudyContentFa: CaseStudyContent = {
  type: "case-study",
  challenge: [
    p(
      "در یک مزرعه نمونه در منطقه‌ای نیمه‌خشک، برنامه آبیاری سنتی با مصرف بالای آب و بازده پایین همراه بود.",
    ),
  ],
  solution: [
    p(
      "تیم صفا با ترکیب داده‌های خاک، اقلیم و مرحله رشد محصول، یک برنامه آبیاری بهینه طراحی کرد و آن را در طول فصل پایش کرد.",
    ),
  ],
  results: [
    { label: "کاهش مصرف آب", value: "۲۸٪", description: "نسبت به دوره پایه" },
    { label: "افزایش بهره‌وری آب", value: "۴ برابر", description: "در تیمار بهینه" },
    { label: "پایش", value: "۲۴۶ گونه", description: "پشتیبانی از محصولات" },
  ],
  gallery: [image("sfa-pilot-results", "نمایی از مزرعه پایلوت صفا")],
};

const caseStudyContentEn: CaseStudyContent = {
  type: "case-study",
  challenge: [
    p(
      "A demonstration farm in a semi-arid region was using a traditional irrigation schedule with high water use and low efficiency.",
    ),
  ],
  solution: [
    p(
      "The SFA team combined soil, climate, and crop-stage data to design an optimized irrigation schedule, then monitored it through the season.",
    ),
  ],
  results: [
    { label: "Water use reduction", value: "28%", description: "Against the baseline" },
    {
      label: "Water productivity",
      value: "4x",
      description: "In the optimized treatment",
    },
    { label: "Coverage", value: "246 species", description: "Supported crops" },
  ],
  gallery: [image("sfa-pilot-results", "The SFA pilot farm")],
};

const simpleContentFa: SimpleContent = {
  type: "simple",
  intro: [
    p(
      "به بلاگ صفا خوش آمدید. اینجا یادداشت‌های پژوهشی، راهنماهای میدانی و داستان‌های تیم ما را درباره آب، خاک و کشاورزی هوشمند دنبال کنید.",
    ),
  ],
  sections: [
    {
      title: "چه چیزی اینجا پیدا می‌کنید؟",
      paragraphs: [
        p(
          "از تحلیل بافت خاک تا نتایج پایلوت‌های میدانی، تلاش می‌کنیم دانش فنی را به زبان روشن و کاربردی منتشر کنیم.",
        ),
      ],
    },
  ],
};

const simpleContentEn: SimpleContent = {
  type: "simple",
  intro: [
    p(
      "Welcome to the SFA blog. Follow our research notes, field guides, and stories about water, soil, and smart farming.",
    ),
  ],
  sections: [
    {
      title: "What you will find here",
      paragraphs: [
        p(
          "From soil texture analysis to field pilot results, we translate technical knowledge into clear, practical writing.",
        ),
      ],
    },
  ],
};

const alternates = (faSlug: string, enSlug: string) => [
  { locale: "fa" as const, slug: faSlug },
  { locale: "en" as const, slug: enSlug },
];

type ExtraPostLocale = {
  slug: string;
  title: string;
  excerpt: string;
  alt: string;
  tag: { slug: string; label: string };
  sectionTitle: string;
  intro: string;
  body: string;
};

type ExtraPostPairInput = {
  id: string;
  translationKey: string;
  publishedAt: string;
  coverSlug: string;
  fa: ExtraPostLocale;
  en: ExtraPostLocale;
};

function simpleNote(intro: string, sectionTitle: string, body: string): SimpleContent {
  return {
    type: "simple",
    intro: [p(intro)],
    sections: [{ title: sectionTitle, paragraphs: [p(body)] }],
  };
}

/**
 * Additional development fixtures. They make default page-size (9) pagination
 * and richer tag filters observable without inventing production content.
 */
function extraPostPair({
  id,
  translationKey,
  publishedAt,
  coverSlug,
  fa,
  en,
}: ExtraPostPairInput): [BlogPost, BlogPost] {
  return [
    {
      id: `${id}-fa`,
      slug: fa.slug,
      locale: "fa",
      translationKey,
      title: fa.title,
      excerpt: fa.excerpt,
      cover: image(coverSlug, fa.alt),
      template: "simple",
      tags: [fa.tag],
      author: { name: "تیم صفا" },
      publishedAt,
      updatedAt: publishedAt,
      readingTimeMinutes: 3,
      alternates: alternates(fa.slug, en.slug),
      content: simpleNote(fa.intro, fa.sectionTitle, fa.body),
    },
    {
      id: `${id}-en`,
      slug: en.slug,
      locale: "en",
      translationKey,
      title: en.title,
      excerpt: en.excerpt,
      cover: image(coverSlug, en.alt),
      template: "simple",
      tags: [en.tag],
      author: { name: "SFA Team" },
      publishedAt,
      updatedAt: publishedAt,
      readingTimeMinutes: 2,
      alternates: alternates(fa.slug, en.slug),
      content: simpleNote(en.intro, en.sectionTitle, en.body),
    },
  ];
}

const extraPostPairs = [
  extraPostPair({
    id: "post-5",
    translationKey: "drip-scheduling",
    publishedAt: "2026-02-20T08:00:00.000Z",
    coverSlug: "symphony-of-droplets",
    fa: {
      slug: "برنامه-ریزی-آبیاری-قطره-ای",
      title: "برنامه‌ریزی آبیاری قطره‌ای در سه گام",
      excerpt:
        "چگونه دور و مدت آبیاری را بر اساس بافت خاک، اقلیم و مرحله رشد محصول تنظیم کنیم.",
      alt: "قطره‌های آب روی برگ",
      tag: { slug: "irrigation", label: "آبیاری" },
      sectionTitle: "از نیاز آبی تا زمان‌بندی",
      intro:
        "برنامه‌ریزی آبیاری تنها به حجم آب محدود نمی‌شود؛ زمان و فاصله میان دورها به همان اندازه مهم است.",
      body: "ابتدا نیاز آبی گیاه را از داده‌های اقلیمی برآورد کنید، سپس ظرفیت نگهداشت آب خاک را در نظر بگیرید و در گام آخر دور آبیاری را با مرحله رشد هماهنگ کنید.",
    },
    en: {
      slug: "drip-scheduling-in-three-steps",
      title: "Drip irrigation scheduling in three steps",
      excerpt:
        "How to tune irrigation interval and duration to soil texture, climate, and crop stage.",
      alt: "Water droplets on a leaf",
      tag: { slug: "irrigation", label: "Irrigation" },
      sectionTitle: "From water demand to timing",
      intro:
        "Irrigation scheduling is not only about volume; the interval between events matters just as much.",
      body: "Estimate crop water demand from climate data, account for the soil's water-holding capacity, and finally align the irrigation interval with the growth stage.",
    },
  }),
  extraPostPair({
    id: "post-6",
    translationKey: "soil-electrical-conductivity",
    publishedAt: "2026-02-12T08:00:00.000Z",
    coverSlug: "soil-texture-triangle",
    fa: {
      slug: "خواندن-هدایت-الکتریکی-خاک",
      title: "هدایت الکتریکی خاک را چگونه بخوانیم؟",
      excerpt: "راهنمای تفسیر EC خاک، واحدها و آنچه درباره شوری و تغذیه گیاه می‌گوید.",
      alt: "مثلث بافت خاک",
      tag: { slug: "soil", label: "خاک" },
      sectionTitle: "EC چه چیزی را اندازه می‌گیرد؟",
      intro:
        "هدایت الکتریکی نشان می‌دهد محلول خاک چقدر توانایی عبور جریان را دارد و معمولاً با شوری پیوند دارد.",
      body: "اندازه‌گیری را همیشه با دمای مرجع و روش مشخص انجام دهید و روند تغییرات را در طول فصل ببینید، نه یک عدد منفرد.",
    },
    en: {
      slug: "reading-soil-electrical-conductivity",
      title: "How to read soil electrical conductivity",
      excerpt:
        "A guide to interpreting soil EC, its units, and what it says about salinity and plant nutrition.",
      alt: "Soil texture triangle",
      tag: { slug: "soil", label: "Soil" },
      sectionTitle: "What does EC measure?",
      intro:
        "Electrical conductivity describes how readily the soil solution carries a current and is commonly linked to salinity.",
      body: "Measure at a consistent reference temperature and method, then follow the trend across the season rather than relying on a single reading.",
    },
  }),
  extraPostPair({
    id: "post-7",
    translationKey: "cover-crops",
    publishedAt: "2026-02-04T08:00:00.000Z",
    coverSlug: "welcome-to-sfa",
    fa: {
      slug: "کشت-پوششی-سپر-خاک",
      title: "کشت پوششی؛ سپری برای خاک",
      excerpt:
        "چگونه گیاهان پوششی فرسایش را کاهش می‌دهند و ساختار خاک را در فصل‌های خشک حفظ می‌کنند.",
      alt: "پوشش گیاهی مزرعه",
      tag: { slug: "soil", label: "خاک" },
      sectionTitle: "خاک را نپوشانده رها نکنید",
      intro:
        "کشت پوششی با پوشاندن سطح خاک، برخورد مستقیم قطرات باران و تبخیر را کاهش می‌دهد.",
      body: "انتخاب گونه را با اقلیم و برنامه آبیاری هماهنگ کنید و پیش از استقرار محصول اصلی، زمان خاتمه پوشش را برنامه‌ریزی کنید.",
    },
    en: {
      slug: "cover-crops-a-shield-for-soil",
      title: "Cover crops: a shield for the soil",
      excerpt:
        "How cover crops reduce erosion and protect soil structure through dry seasons.",
      alt: "Crop cover in a field",
      tag: { slug: "soil", label: "Soil" },
      sectionTitle: "Do not leave the soil bare",
      intro:
        "Cover crops shield the soil surface, reducing direct raindrop impact and evaporation.",
      body: "Match species to the climate and irrigation plan, and decide the termination window before the main crop is established.",
    },
  }),
  extraPostPair({
    id: "post-8",
    translationKey: "irrigation-water-salinity",
    publishedAt: "2026-01-27T08:00:00.000Z",
    coverSlug: "sfa-pilot-results",
    fa: {
      slug: "شوری-آب-آبیاری-و-انتخاب-محصول",
      title: "شوری آب آبیاری و انتخاب محصول",
      excerpt: "پیش از کاشت، کیفیت آب را بسنجید و محصول را با سطح تحمل شوری هماهنگ کنید.",
      alt: "مزرعه پایلوت صفا",
      tag: { slug: "water", label: "آب" },
      sectionTitle: "آب سالم، تصمیم سالم",
      intro:
        "شوری آب آبیاری می‌تواند به‌تدریج در ناحیه ریشه انباشته شود و عملکرد را کاهش دهد.",
      body: "آزمایش دوره‌ای آب، زهکشی کافی و انتخاب رقم متحمل، سه ابزار اصلی مدیریت شوری هستند.",
    },
    en: {
      slug: "irrigation-water-salinity-and-crop-choice",
      title: "Irrigation water salinity and crop choice",
      excerpt:
        "Test water quality before planting and match the crop to its salinity tolerance.",
      alt: "The SFA pilot farm",
      tag: { slug: "water", label: "Water" },
      sectionTitle: "Good water, better decisions",
      intro:
        "Irrigation water salinity can gradually accumulate in the root zone and reduce yield.",
      body: "Regular water testing, adequate drainage, and a tolerant variety are the three core salinity management tools.",
    },
  }),
  extraPostPair({
    id: "post-9",
    translationKey: "soil-organic-matter",
    publishedAt: "2026-01-19T08:00:00.000Z",
    coverSlug: "soil-texture-triangle",
    fa: {
      slug: "ماده-آلی-قلب-خاک-زنده",
      title: "ماده آلی، قلب خاک زنده",
      excerpt:
        "چرا ماده آلی برای نگهداشت آب، تغذیه گیاه و فعالیت میکروبی خاک تعیین‌کننده است.",
      alt: "نمونه خاک",
      tag: { slug: "soil", label: "خاک" },
      sectionTitle: "سرمایه‌گذاری بلندمدت",
      intro:
        "ماده آلی خاک تنها یک عدد در آزمون خاک نیست؛ موتور چرخه غذایی و ساختار پایدار خاک است.",
      body: "افزودن منابع آلی، پرهیز از خاک‌ورزی شدید و حفظ پوشش سطح، روند افزایش ماده آلی را تقویت می‌کند.",
    },
    en: {
      slug: "soil-organic-matter",
      title: "Organic matter: the heart of living soil",
      excerpt:
        "Why organic matter is decisive for water retention, plant nutrition, and soil biology.",
      alt: "A soil sample",
      tag: { slug: "soil", label: "Soil" },
      sectionTitle: "A long-term investment",
      intro:
        "Soil organic matter is more than a number on a lab report; it drives nutrient cycling and stable structure.",
      body: "Adding organic sources, avoiding aggressive tillage, and keeping the surface covered all help build organic matter over time.",
    },
  }),
  extraPostPair({
    id: "post-10",
    translationKey: "field-scouting",
    publishedAt: "2026-01-11T08:00:00.000Z",
    coverSlug: "welcome-to-sfa",
    fa: {
      slug: "پایش-میدانی-پیش-از-آنکه-دیر-شود",
      title: "پایش میدانی؛ پیش از آنکه دیر شود",
      excerpt:
        "یک مسیر ساده برای بازدید منظم مزرعه و ثبت نشانه‌های تنش آب، آفت و کمبود مواد مغذی.",
      alt: "بازدید از مزرعه",
      tag: { slug: "research", label: "پژوهش" },
      sectionTitle: "چشم‌های میدان",
      intro:
        "بسیاری از مشکلات مزرعه پیش از آنکه در عملکرد دیده شوند، نشانه‌های کوچکی در برگ و خاک برجای می‌گذارند.",
      body: "یک مسیر ثابت بازدید تعریف کنید، نقاط نمونه‌برداری را ثبت کنید و مشاهدات را با تاریخ و تصویر نگه دارید.",
    },
    en: {
      slug: "field-scouting-before-problems-spread",
      title: "Field scouting before problems spread",
      excerpt:
        "A simple routine for regular field walks and recording signs of water stress, pests, and nutrient gaps.",
      alt: "A field visit",
      tag: { slug: "research", label: "Research" },
      sectionTitle: "Eyes on the field",
      intro:
        "Many field problems leave small signs on leaves and soil long before they show up in yield.",
      body: "Define a consistent walking route, record sampling points, and keep observations with dates and photos.",
    },
  }),
];

export const mockPosts: BlogPost[] = [
  {
    id: "post-1-fa",
    slug: soilFa,
    locale: "fa",
    translationKey: "soil-texture-triangle",
    title: "نگاهی دقیق به ۱۲ کلاس بافت خاک",
    excerpt:
      "راهنمای کاربردی کلاس‌های بافت خاک، رفتار آب، نیاز آبیاری و اثر آن‌ها بر رشد ریشه.",
    cover: image("soil-texture-triangle", "مثلث بافت خاک"),
    template: "reference",
    tags: [
      { slug: "soil", label: "خاک" },
      { slug: "irrigation", label: "آبیاری" },
    ],
    author: { name: "تیم صفا" },
    publishedAt: "2026-06-12T08:00:00.000Z",
    updatedAt: "2026-07-02T08:00:00.000Z",
    readingTimeMinutes: 7,
    alternates: alternates(soilFa, soilEn),
    content: referenceContentFa,
  },
  {
    id: "post-1-en",
    slug: soilEn,
    locale: "en",
    translationKey: "soil-texture-triangle",
    title: "A close look at the 12 soil texture classes",
    excerpt:
      "A practical guide to soil texture classes, water behaviour, irrigation needs, and root development.",
    cover: image("soil-texture-triangle", "Soil texture triangle"),
    template: "reference",
    tags: [
      { slug: "soil", label: "Soil" },
      { slug: "irrigation", label: "Irrigation" },
    ],
    author: { name: "SFA Team" },
    publishedAt: "2026-06-12T08:00:00.000Z",
    updatedAt: "2026-07-02T08:00:00.000Z",
    readingTimeMinutes: 6,
    alternates: alternates(soilFa, soilEn),
    content: referenceContentEn,
  },
  {
    id: "post-2-fa",
    slug: symphonyFa,
    locale: "fa",
    translationKey: "symphony-of-droplets",
    title: "سمفونی قطره‌ها: فیزیک در خدمت آینده کشاورزی",
    excerpt:
      "سفری از آبیاری سطحی تا سیستم‌های قطره‌ای و زیرسطحی، با نگاهی به فیزیک، مهندسی و کشاورزی دقیق.",
    cover: image("symphony-of-droplets", "قطره‌های آب"),
    template: "narrative",
    tags: [
      { slug: "water", label: "آب" },
      { slug: "research", label: "پژوهش" },
    ],
    author: { name: "تیم صفا" },
    publishedAt: "2026-05-28T08:00:00.000Z",
    updatedAt: "2026-06-18T08:00:00.000Z",
    readingTimeMinutes: 8,
    alternates: alternates(symphonyFa, symphonyEn),
    content: narrativeContentFa,
  },
  {
    id: "post-2-en",
    slug: symphonyEn,
    locale: "en",
    translationKey: "symphony-of-droplets",
    title: "Symphony of droplets: physics in service of agriculture",
    excerpt:
      "A journey from surface irrigation to drip and subsurface systems, through physics, engineering, and precision agriculture.",
    cover: image("symphony-of-droplets", "Water droplets"),
    template: "narrative",
    tags: [
      { slug: "water", label: "Water" },
      { slug: "research", label: "Research" },
    ],
    author: { name: "SFA Team" },
    publishedAt: "2026-05-28T08:00:00.000Z",
    updatedAt: "2026-06-18T08:00:00.000Z",
    readingTimeMinutes: 7,
    alternates: alternates(symphonyFa, symphonyEn),
    content: narrativeContentEn,
  },
  {
    id: "post-3-fa",
    slug: pilotFa,
    locale: "fa",
    translationKey: "sfa-pilot-results",
    title: "نتایج پایلوت صفا در یک فصل زراعی",
    excerpt: "چه اتفاقی افتاد وقتی برنامه آبیاری صفا در یک مزرعه نیمه‌خشک به کار رفت؟",
    cover: image("sfa-pilot-results", "مزرعه پایلوت صفا"),
    template: "case-study",
    tags: [
      { slug: "impact", label: "اثرگذاری" },
      { slug: "irrigation", label: "آبیاری" },
    ],
    author: { name: "تیم صفا" },
    publishedAt: "2026-04-15T08:00:00.000Z",
    updatedAt: "2026-05-01T08:00:00.000Z",
    readingTimeMinutes: 5,
    alternates: alternates(pilotFa, pilotEn),
    content: caseStudyContentFa,
  },
  {
    id: "post-3-en",
    slug: pilotEn,
    locale: "en",
    translationKey: "sfa-pilot-results",
    title: "SFA pilot results from one growing season",
    excerpt:
      "What happened when the SFA irrigation schedule was deployed on a semi-arid farm?",
    cover: image("sfa-pilot-results", "The SFA pilot farm"),
    template: "case-study",
    tags: [
      { slug: "impact", label: "Impact" },
      { slug: "irrigation", label: "Irrigation" },
    ],
    author: { name: "SFA Team" },
    publishedAt: "2026-04-15T08:00:00.000Z",
    updatedAt: "2026-05-01T08:00:00.000Z",
    readingTimeMinutes: 4,
    alternates: alternates(pilotFa, pilotEn),
    content: caseStudyContentEn,
  },
  {
    id: "post-4-fa",
    slug: welcomeFa,
    locale: "fa",
    translationKey: "welcome-to-sfa",
    title: "به بلاگ صفا خوش آمدید",
    excerpt: "یادداشت‌های پژوهشی، راهنماهای میدانی و داستان‌های تیم صفا.",
    cover: image("welcome-to-sfa", "بلاگ صفا"),
    template: "simple",
    tags: [{ slug: "news", label: "خبر" }],
    author: { name: "تیم صفا" },
    publishedAt: "2026-03-01T08:00:00.000Z",
    updatedAt: "2026-03-01T08:00:00.000Z",
    readingTimeMinutes: 3,
    alternates: alternates(welcomeFa, welcomeEn),
    content: simpleContentFa,
  },
  {
    id: "post-4-en",
    slug: welcomeEn,
    locale: "en",
    translationKey: "welcome-to-sfa",
    title: "Welcome to the SFA blog",
    excerpt: "Research notes, field guides, and stories from the SFA team.",
    cover: image("welcome-to-sfa", "SFA blog"),
    template: "simple",
    tags: [{ slug: "news", label: "News" }],
    author: { name: "SFA Team" },
    publishedAt: "2026-03-01T08:00:00.000Z",
    updatedAt: "2026-03-01T08:00:00.000Z",
    readingTimeMinutes: 2,
    alternates: alternates(welcomeFa, welcomeEn),
    content: simpleContentEn,
  },
  ...extraPostPairs.flat(),
];
