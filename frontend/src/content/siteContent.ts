import { assetPath } from '../utils/assetPath';

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
    title: 'Tim and Aliscia',
    subtitle: 'Together with their families',
    description:
      'Request the honor of your presence as they bind their vows beneath candlelit arches on the eve of the Harvest Moon.',
    accentLine: 'Saturday, October 31 · Blackwood Manor',
    backgroundImage: assetPath('/images/announcement.jpg'),
    layerVariant: 'arches',
  },
  {
    id: 'details',
    title: 'The Details',
    subtitle: 'Arrive prepared for an evening of whispered vows and string quartets.',
    description:
      'Each moment is curated to feel intimate, timeless, and just a touch uncanny. Allow ample time to wander the conservatory before the ceremony.',
    backgroundImage: assetPath('/images/details.jpg'),
    layerVariant: 'tracery',
  },
  {
    id: 'gallery',
    title: 'Glimpses',
    subtitle: 'Scenes from the engagement session and manor grounds.',
    description:
      'Hover to linger on the textures; tap to open the lightbox for a closer look.',
    backgroundImage: assetPath('/images/gallery.jpg'),
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

export const galleryItems: GalleryItem[] = [
  {
    id: 'frame-1',
    src: assetPath('/images/gallery/WeddingShoot-005.jpg'),
    alt: 'Wedding gallery image 1',
  },
  {
    id: 'frame-2',
    src: assetPath('/images/gallery/WeddingShoot-012.jpg'),
    alt: 'Wedding gallery image 2',
  },
  {
    id: 'frame-3',
    src: assetPath('/images/gallery/WeddingShoot-048.jpg'),
    alt: 'Wedding gallery image 3',
  },
  {
    id: 'frame-4',
    src: assetPath('/images/gallery/WeddingShoot-107.jpg'),
    alt: 'Wedding gallery image 4',
  },
  {
    id: 'frame-5',
    src: assetPath('/images/gallery/WeddingShoot-110.jpg'),
    alt: 'Wedding gallery image 5',
  },
  {
    id: 'frame-6',
    src: assetPath('/images/gallery/WeddingShoot-126.jpg'),
    alt: 'Wedding gallery image 6',
  },
];
