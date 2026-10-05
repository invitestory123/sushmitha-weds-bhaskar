/**
 * ─────────────────────────────────────────────────────────────
 *  WEDDING INVITATION · MASTER CONFIGURATION
 * ─────────────────────────────────────────────────────────────
 *  Sushmita Paul Choudhury & Bhaskar Mondal
 *  Wedding Date: 25th November 2026 (Tura, Meghalaya)
 *  Reception Date: 28th November 2026 (Bongaigaon, Assam)
 */

export interface StoryMilestone {
  title: string
  date: string
  text: string
}

export interface GalleryImage {
  src: string
  alt: string
}

export interface FamilySide {
  label: string
  title: string
  photo: string
  members: { name: string; relation: string }[]
}

export interface EventVenue {
  name: string
  date: string
  time: string
  address: string
  mapQuery: string
  mapUrl: string
  note: string
}

export interface InvitationConfig {
  couple: {
    bride: string
    groom: string
    brideShort: string
    groomShort: string
  }
  weddingDate: string
  receptionDate?: string
  displayDate: string
  tagline: string
  hero: {
    firstPhoto: string
    royalPhoto: string
    casualPhoto: string
    childhoodBride: string
    childhoodGroom: string
    portraitBride: string
    portraitGroom: string
    bodyBride: string
    bodyGroom: string
  }
  story: StoryMilestone[]
  details: {
    ceremony: {
      title: string
      date: string
      venue: string
      time: string
      note: string
      mapUrl: string
    }
    reception: {
      title: string
      date: string
      venue: string
      time: string
      note: string
      mapUrl: string
    }
    dressCode: string
  }
  venue: {
    name: string
    address: string
    mapQuery: string
    mapUrl: string
    wedding: EventVenue
    reception: EventVenue
  }
  gallery: GalleryImage[]
  families: { bride: FamilySide; groom: FamilySide }
  calendar: {
    title: string
    description: string
    durationHours: number
  }
  music: {
    src: string
    label: string
  }
  theme: {
    gold: string
    background: string
    ink: string
    texture: "paper" | "plain"
  }
  fonts: {
    serif: string
    script: string
    sans: string
  }
  footer: {
    thanks: string
    copyright: string
  }
  sections?: {
    story?: boolean
    countdown?: boolean
    events?: boolean
    venue?: boolean
    gallery?: boolean
    family?: boolean
  }
}

const config: InvitationConfig = {
  couple: {
    bride: "Sushmita Paul Choudhury",
    groom: "Bhaskar Mondal",
    brideShort: "Sushmita",
    groomShort: "Bhaskar",
  },
  weddingDate: "2026-11-25T17:00:00+05:30",
  receptionDate: "2026-11-28T18:00:00+05:30",
  displayDate: "Wednesday, November 25th, 2026",
  tagline: "Two souls, two hearts, one sacred celebration.\nForever begins now.",
  hero: {
    firstPhoto: "/images/couple-hero.png",
    royalPhoto: "/images/couple-royal.jpg",
    casualPhoto: "/images/couple-casual.jpg",
    childhoodBride: "/images/couple-hero.png",
    childhoodGroom: "/images/couple-royal.jpg",
    portraitBride: "/images/couple-royal.jpg",
    portraitGroom: "/images/couple-casual.jpg",
    bodyBride: "",
    bodyGroom: "",
  },
  story: [
    {
      title: "The First Chapter",
      date: "October 2022",
      text: "The story began during Durga Pujo 2022, celebrating the festive month with friends, away from their families.\nIn each other, they found a little family away from family.",
    },
    {
      title: "Growing Together",
      date: "The Beautiful Journey",
      text: "Through every laugh, long conversation, and shared dream, Sushmita and Bhaskar discovered in each other a true confidant, partner, and best friend.",
    },
    {
      title: "Two Families, One Bond",
      date: "The Blessing",
      text: "Surrounded by the unconditional love, warmth, and blessings of their parents and family, they made the heartfelt promise to walk hand in hand forever.",
    },
    {
      title: "The Auspicious Union",
      date: "November 2026",
      text: "And now begins the celebration of a lifetime. As sacred mantras echo and new memories are made, we invite you to be part of our most treasured day.",
    },
  ],
  details: {
    ceremony: {
      title: "The Wedding Ceremony",
      date: "Wednesday, 25th November 2026",
      venue: "Nepali Puja Mandap, Akongre, Tura, Meghalaya - 794001",
      time: "5:00 PM onwards",
      note: "Cordially inviting you with your family to bless the sacred union",
      mapUrl: "https://maps.app.goo.gl/v7Ew9Vvw5KYkpBv8A",
    },
    reception: {
      title: "The Grand Reception",
      date: "Saturday, 28th November 2026",
      venue: "224, Chalantapara pt 4, Bongaigaon, Assam - 783388",
      time: "6:00 PM onwards",
      note: "Join us for an evening of joyous celebrations, heartfelt wishes, and festive dinner",
      mapUrl: "https://maps.app.goo.gl/H6Crjum6vqMWk9Tn9?g_st=aw",
    },
    dressCode: "Traditional / Festive Formal Attire",
  },
  venue: {
    name: "Nepali Puja Mandap",
    address: "Akongre, Tura, Meghalaya - 794001",
    mapQuery: "Nepali Puja Mandap, Akongre, Tura, Meghalaya 794001",
    mapUrl: "https://maps.app.goo.gl/v7Ew9Vvw5KYkpBv8A",
    wedding: {
      name: "Nepali Puja Mandap",
      date: "Wednesday, 25th November 2026",
      time: "5:00 PM onwards",
      address: "Akongre, Tura, Meghalaya - 794001",
      mapQuery: "Nepali Puja Mandap, Akongre, Tura, Meghalaya 794001",
      mapUrl: "https://maps.app.goo.gl/v7Ew9Vvw5KYkpBv8A",
      note: "Wedding Ceremony Venue",
    },
    reception: {
      name: "Chalantapara Reception Hall",
      date: "Saturday, 28th November 2026",
      time: "6:00 PM onwards",
      address: "224, Chalantapara pt 4, Bongaigaon, Assam - 783388",
      mapQuery: "224, Chalantapara pt 4, Bongaigaon, Assam 783388",
      mapUrl: "https://maps.app.goo.gl/H6Crjum6vqMWk9Tn9?g_st=aw",
      note: "Wedding Reception Venue",
    },
  },
  gallery: [
    {
      src: "/images/gallery-red-gown.png",
      alt: "Sushmita & Bhaskar · Evening Elegance & Warm Embrace",
    },
    {
      src: "/images/couple-royal.jpg",
      alt: "Sushmita & Bhaskar · Royal Palace Elegance in Scarlet & Black",
    },
    {
      src: "/images/gallery-cafe-night.jpg",
      alt: "Sushmita & Bhaskar · Sparkling Evenings & Cherished Moments",
    },
    {
      src: "/images/couple-casual.jpg",
      alt: "Sushmita & Bhaskar · Sunshine & Sweet Memories",
    },
    {
      src: "/images/gallery-valentines.jpg",
      alt: "Sushmita & Bhaskar · A Valentine to Remember",
    },
    {
      src: "/images/gallery-dinner-date.jpg",
      alt: "Sushmita & Bhaskar · Cozy Dinners & Shared Smiles",
    },
  ],
  families: {
    bride: {
      label: "The Bride's Family",
      title: "The Paul Choudhurys",
      photo: "/images/family-bride.jpg",
      members: [
        { name: "Sujit Paul Choudhury", relation: "Father of the Bride" },
        { name: "Swarna Paul Choudhury", relation: "Mother of the Bride" },
      ],
    },
    groom: {
      label: "The Groom's Family",
      title: "The Mondals",
      photo: "/images/family-groom.jpg",
      members: [
        { name: "Prabhat Chandra Mondal", relation: "Father of the Groom" },
        { name: "Maya Mondal", relation: "Mother of the Groom" },
        { name: "Debjani Mondal", relation: "Sister of the Groom" },
      ],
    },
  },
  calendar: {
    title: "Sushmita & Bhaskar — Wedding Ceremony",
    description: "Wedding Ceremony at Nepali Puja Mandap, Akongre, Tura, Meghalaya.",
    durationHours: 5,
  },
  music: {
    src: "https://youtu.be/e8dLwwJ1dsE?si=pSLQBcHFUyfljVHF",
    label: "Ullam Paadum · 2 States",
  },
  theme: {
    gold: "#b98a4e",
    background: "#faf5ec",
    ink: "#46392c",
    texture: "paper",
  },
  fonts: {
    serif: "'Cormorant Garamond', Georgia, serif",
    script: "'Great Vibes', cursive",
    sans: "'Jost', 'Helvetica Neue', sans-serif",
  },
  footer: {
    thanks: "With heartfelt blessings and love from both families",
    copyright: "© 2026 Sushmita & Bhaskar · Handcrafted with love by InviteStory",
  },
  sections: {
    story: true,
    countdown: true,
    events: true,
    venue: true,
    gallery: true,
    family: true,
  },
}

export default config
