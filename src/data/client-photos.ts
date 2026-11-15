import { getImage } from 'astro:assets';
import equipment from '../assets/client-photos/tree-removal-equipment.jpg';
import climber from '../assets/client-photos/tree-climber-canopy.jpg';
import crew from '../assets/client-photos/crew-at-work.jpg';
import bucket from '../assets/client-photos/bucket-operator.jpg';
import hauling from '../assets/client-photos/log-hauling.jpg';
import together from '../assets/client-photos/crew-together.jpg';
import portrait from '../assets/client-photos/team-portrait.jpg';

// Original client photographs; source filenames are recorded beside the assets.
const photos = {
  equipment: {
    source: equipment,
    alt: 'An Abrajan equipment operator lifting a large cut log beside the crew’s tree-service trucks',
  },
  climber: {
    source: climber,
    alt: 'An Abrajan tree climber wearing a helmet and harness among sunlit branches',
  },
  crew: {
    source: crew,
    alt: 'Two members of the Abrajan team in their green work shirts at a residential job',
  },
  bucket: {
    source: bucket,
    alt: 'An Abrajan crew member in a raised bucket lift looking up into a tree',
  },
  hauling: {
    source: hauling,
    alt: 'Large cut tree sections loaded on an Abrajan work truck after tree removal',
  },
  together: {
    source: together,
    alt: 'Three people posing together beside cut tree sections at an Abrajan job',
  },
  portrait: {
    source: portrait,
    alt: 'Two members of the Abrajan team in orange company shirts',
  },
};

export async function clientPhoto(
  key: keyof typeof photos,
  width = 1440,
  sizes = '100vw',
) {
  const { source, alt } = photos[key];
  const maxWidth = Math.min(width, source.width);
  const widths = [
    ...new Set([480, 768, 1200, maxWidth].filter((w) => w <= maxWidth)),
  ].sort((a, b) => a - b);
  const variants = await Promise.all(
    widths.map((width) =>
      getImage({ src: source, width, format: 'webp', quality: 82 }),
    ),
  );
  const image = variants[variants.length - 1];
  return {
    src: image.src,
    width: Number(image.attributes.width),
    height: Number(image.attributes.height),
    alt,
    srcset: variants
      .map((image) => `${image.src} ${image.attributes.width}w`)
      .join(', '),
    sizes,
  };
}
