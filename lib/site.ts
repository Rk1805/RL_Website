export const site = {
  name: "Rainbow Laminates",
  tagline: "Premium Decorative Surfaces",
  phone: "+91 88666 30305",
  phoneHref: "tel:+918866630305",
  whatsappNumber: "918866630305",
  email: "rainbowlaminates.bangalore@gmail.com",
  emailHref: "mailto:rainbowlaminates.bangalore@gmail.com",
  addressShort: "Kamakshipalya, Bengaluru, Karnataka",
  addressFull:
    "Do.no.77/1, Near Swayam Prabha Kalyana Mantapa, Nanjundeshwara Nilaya, Meenakshi Nagar 6th Main, Police Station Rd, Kamakshipalya, Bengaluru, Karnataka 560079",
  hours: "Monday – Saturday, 9:00 AM – 7:00 PM",
  since: 2009,
  experienceYears: 18,
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export type Branch = {
  name: string;
  role: string;
  city: string;
  since: number;
  phone: string;
  phoneHref: string;
  address: string | null;
  mapsUrl: string;
};

export const branches: Branch[] = [
  {
    name: "Rainbow Laminates",
    role: "Head Office & Showroom",
    city: "Kamakshipalya, Bengaluru",
    since: 2009,
    phone: "+91 88666 30305",
    phoneHref: "tel:+918866630305",
    address: site.addressFull,
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.addressFull)}`,
  },
  {
    name: "Rainbow Marketing",
    role: "Branch & Godown",
    city: "Bengaluru, Karnataka",
    since: 2019,
    phone: "+91 73599 30644",
    phoneHref: "tel:+917359930644",
    address: null,
    mapsUrl: "https://share.google/GRXYFEgykpEMw2GRo",
  },
  {
    name: "Rainbow Trade Link",
    role: "Branch & Godown",
    city: "Bengaluru, Karnataka",
    since: 2022,
    phone: "+91 75750 20078",
    phoneHref: "tel:+917575020078",
    address: null,
    mapsUrl: "https://share.google/415Mt0KvsStQ0XxCq",
  },
];

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Collections", href: "/collections" },
  { label: "E-Catalogues", href: "/e-catalogues" },
  { label: "Contact Us", href: "/contact-us" },
] as const;

export type BrandMeta = {
  slug: string;
  name: string;
  blurb: string;
  tagline: string;
  description: string;
  accentClass: string;
  logo: string;
};

// Brands we carry beyond the Rosewood collections — shown alongside the
// main brands but linked to their e-catalogues instead of the design browser.
export type PartnerBrand = {
  slug: string;
  name: string;
  blurb: string;
  logo: string;
  cover: string;
};

export const partnerBrands: PartnerBrand[] = [
  {
    slug: "koyoo",
    name: "Koyoo",
    blurb: "Trendy textures and statement exterior surfaces.",
    logo: "/brand-logos/koyoo.png",
    cover: "/e-catalogue-covers/new-koyoo-final-251012-181955.jpg",
  },
  {
    slug: "vogue",
    name: "Vogue",
    blurb: "Seamless designer planks with a signature style.",
    logo: "/brand-logos/vogue.png",
    cover: "/e-catalogue-covers/black-pearl.jpg",
  },
  {
    slug: "royalglow",
    name: "Royalglow",
    blurb: "PVC laminates and Arika designer panels.",
    logo: "/brand-logos/royalglow.png",
    cover: "/e-catalogue-covers/royal-glow-final-pdf.jpg",
  },
];

export const brandMeta: BrandMeta[] = [
  {
    slug: "ranwood",
    logo: "/brand-logos/ranwood.svg",
    name: "Ranwood",
    blurb: "Warm, natural woodgrains and textile-inspired textures.",
    tagline: "Textures that feel like home",
    description:
      "Ranwood blends natural woodgrains with fabric-like textures for surfaces that feel as good as they look. A natural fit for cosy living rooms, hospitality projects and boutique interiors.",
    accentClass: "text-amber-700",
  },
  {
    slug: "ranberry",
    logo: "/brand-logos/ranberry.svg",
    name: "Ranberry",
    blurb: "Vibrant, youthful decors for contemporary spaces.",
    tagline: "Colour with confidence",
    description:
      "Ranberry is for spaces that refuse to be boring — energetic colours and contemporary decors that instantly lift a room. Made for modern homes, studios and youthful workspaces.",
    accentClass: "text-rose-600",
  },
  {
    slug: "arica",
    logo: "/brand-logos/arica.svg",
    name: "Arica",
    blurb: "Bold, architectural patterns for statement surfaces.",
    tagline: "Patterns that command the room",
    description:
      "Arica takes cues from architecture and urban art — strong geometrics, striking monochromes and raw industrial textures for feature walls and furniture that demand attention.",
    accentClass: "text-violet-700",
  },
  {
    slug: "atina",
    logo: "/brand-logos/atina.svg",
    name: "Atina",
    blurb: "Classic woodgrains and timeless natural aesthetics.",
    tagline: "The soul of real wood",
    description:
      "Atina is devoted to the timeless beauty of timber. From light oaks to deep mahoganies, every decor captures authentic grain depth that pairs effortlessly with any interior style.",
    accentClass: "text-green-700",
  },
  {
    slug: "ranwood-rega",
    logo: "/brand-logos/ranwood-rega.svg",
    name: "Ranwood Rega",
    blurb: "Refined elegance for high-end residential interiors.",
    tagline: "Quiet luxury, refined",
    description:
      "Rega is Ranwood's premium line — understated, elegant decors curated for high-end residences and bespoke furniture where every detail counts.",
    accentClass: "text-sky-700",
  },
  {
    slug: "dazzle-berry",
    logo: "/brand-logos/dazzle-berry.svg",
    name: "Dazzle Berry",
    blurb: "Soft, dreamy pastels for delicate, serene interiors.",
    tagline: "Soft pastels, serene spaces",
    description:
      "Dazzle Berry brings the calm of pastel and crystal shades to modern interiors — gentle tones for bedrooms, kids' spaces and anywhere that deserves a lighter touch.",
    accentClass: "text-pink-600",
  },
];
