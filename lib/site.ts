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
  since: 2013,
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Catalogues", href: "/catalogues" },
  { label: "Contact Us", href: "/contact-us" },
] as const;

export type BrandMeta = {
  slug: string;
  name: string;
  blurb: string;
};

export const brandMeta: BrandMeta[] = [
  {
    slug: "ranwood",
    name: "Ranwood",
    blurb: "Warm, natural woodgrains and textile-inspired textures.",
  },
  {
    slug: "ranberry",
    name: "Ranberry",
    blurb: "Vibrant, youthful decors for contemporary spaces.",
  },
  {
    slug: "arica",
    name: "Arica",
    blurb: "Bold, architectural patterns for statement surfaces.",
  },
  {
    slug: "atina",
    name: "Atina",
    blurb: "Classic woodgrains and timeless natural aesthetics.",
  },
  {
    slug: "ranwood-rega",
    name: "Ranwood Rega",
    blurb: "Refined elegance for high-end residential interiors.",
  },
  {
    slug: "dazzle-berry",
    name: "Dazzle Berry",
    blurb: "Soft, dreamy pastels for delicate, serene interiors.",
  },
];
