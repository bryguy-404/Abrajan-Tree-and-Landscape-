import { getImage } from 'astro:assets';
import canopy from '../assets/service-concepts/tree-care-canopy.png';
import removal from '../assets/service-concepts/tree-removal-worksite.png';
import stump from '../assets/service-concepts/stump-detail.png';
import clearing from '../assets/service-concepts/land-clearing.png';
import winter from '../assets/service-concepts/winter-property.png';

const images = {
  canopy: {
    source: canopy,
    alt: 'Illustrative scene of a mature shade tree and a tree-care worker looking up at its canopy',
  },
  removal: {
    source: removal,
    alt: 'Illustrative tree removal worksite with cut hardwood sections and a worker inspecting the area',
  },
  stump: {
    source: stump,
    alt: 'Illustrative close view of a cut tree stump awaiting grinding',
  },
  clearing: {
    source: clearing,
    alt: 'Illustrative residential clearing with retained mature trees along a wooded edge',
  },
  winter: {
    source: winter,
    alt: 'Illustrative cleared driveway and walkway bordered by winter snow',
  },
};

export interface ServiceImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  srcset: string;
  sizes: string;
}

// Astro produces compressed WebP assets; original generated files stay intact.
export async function serviceImage(
  key: keyof typeof images,
  width = 1600,
  sizes = '100vw',
): Promise<ServiceImage> {
  const { source, alt } = images[key];
  const image = await getImage({
    src: source,
    width: Math.min(width, source.width),
    format: 'webp',
    quality: 82,
  });
  const small = await getImage({
    src: source,
    width: 720,
    format: 'webp',
    quality: 80,
  });
  return {
    src: image.src,
    width: Number(image.attributes.width),
    height: Number(image.attributes.height),
    alt,
    srcset: `${small.src} 720w, ${image.src} ${image.attributes.width}w`,
    sizes,
  };
}
