export type SectionId = 'announcement' | 'details' | 'gallery';

export interface SectionContent {
  id: SectionId;
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage: string;
  accentLine?: string;
  layerVariant: 'arches' | 'tracery';
}

export interface DetailItem {
  label: string;
  body: string;
}

export const sections: SectionContent[] = [
  {
    id: 'announcement',
    title: 'Elowen & Thaddeus',
    subtitle: 'Together with their families',
    description:
      'Request the honor of your presence as they bind their vows beneath candlelit arches on the eve of the Harvest Moon.',
    accentLine: 'Saturday, October 31 · Blackwood Manor',
    backgroundImage: '/images/announcement.jpg',
    layerVariant: 'arches',
  },
  {
    id: 'details',
    title: 'The Details',
    subtitle: 'Arrive prepared for an evening of whispered vows and string quartets.',
    description:
      'Each moment is curated to feel intimate, timeless, and just a touch uncanny. Allow ample time to wander the conservatory before the ceremony.',
    backgroundImage: '/images/details.jpg',
    layerVariant: 'tracery',
  },
  {
    id: 'gallery',
    title: 'Glimpses',
    subtitle: 'Scenes from the engagement session and manor grounds.',
    description:
      'Hover to linger on the textures; tap to open the lightbox for a closer look.',
    backgroundImage: '/images/gallery.jpg',
    layerVariant: 'arches',
  },
];

export const detailItems: DetailItem[] = [
  {
    label: 'Location',
    body: 'Blackwood Manor Conservatory · 1313 Wraith Lane · Ravenscroft, NY',
  },
  {
    label: 'Time',
    body: 'Doors at 6:00 PM · Candlelit vows at 7:13 PM · Reception to follow past midnight',
  },
  {
    label: 'Dress',
    body: 'Victorian evening attire encouraged. Deep hues, velvet textures, and heirloom embellishments welcomed.',
  },
];

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
}

export const galleryItems: GalleryItem[] = Array.from({ length: 6 }, (_, idx) => ({
  id: `frame-${idx + 1}`,
  src: `/images/gallery/thumb${idx + 1}.jpg`,
  alt: `Vintage vignette ${idx + 1}`,
}));
