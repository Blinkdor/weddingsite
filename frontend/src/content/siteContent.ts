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
    subtitle: '',
    description:
      'Request your presence as they bind their vows, celebrate with friends & family, and enjoy an enchanting evening in a historic castle.',
    accentLine: 'Sunday, November 1st · Joslyn Castle, Omaha, NE',
    backgroundImage: assetPath('/images/announcement.jpg'),
    layerVariant: 'arches',
  },
  {
    id: 'details',
    title: 'The Details',
    subtitle: '',
    description: '',
    backgroundImage: assetPath('/images/details.jpg'),
    layerVariant: 'tracery',
  },
  {
    id: 'gallery',
    title: 'Glimpses',
    subtitle: '',
    description: '',
    backgroundImage: assetPath('/images/gallery.jpg'),
    layerVariant: 'arches',
  },
];

export const detailItems: DetailItem[] = [
  {
    label: 'Location',
    body: 'Joslyn Castle · 3902 Davenport St · Omaha, NE',
  },
  {
    label: 'Time',
    body: '· Doors at 6:00 PM \n · Vows at 6:30 PM \n · Reception to follow, until 10:30 PM',
  },
  {
    label: 'Dress',
    body: ' · Victorian/classy evening attire encouraged\n · Deep hues, velvet textures, and heirloom embellishments welcomed\n · NO BLACK DRESSES - The bride will be draped in an all-black dress.',
  },
  {
    label: 'Rules - AKA - How the newlyweds get to keep their damage deposit',
    body: 'Per our rental contract: \n · No Smoking anywhere on castle grounds',
  },
  {
    label: 'Photos',
    body: 'Disposable cameras will be provided at the event · prioritize picture taking with that perfectly imperfect medium over the course of the evening.',
  },
  {
    label: 'Food/Drink',
    body: 'Charcuterie, grazing table, and drink to be served following the main event.',
  }
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
