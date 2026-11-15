import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { clientPhoto } from './client-photos';
import feature from '../assets/work-posters/tree-work-feature.webp';
import crane from '../assets/work-posters/crane-work.webp';
import bucket from '../assets/work-posters/bucket-work.webp';
import winter from '../assets/work-posters/winter-tree-work.webp';
import equipment from '../assets/work-posters/equipment-at-work.webp';
import beds from '../../public/images/garden-beds.webp';
import lawn from '../../public/images/lawn-care.webp';
import property from '../../public/images/property-care.webp';

async function responsiveImage(
  source: ImageMetadata,
  alt: string,
  sizes: string,
) {
  const widths = [
    ...new Set([480, 768, 1280, source.width].filter((w) => w <= source.width)),
  ].sort((a, b) => a - b);
  const variants = await Promise.all(
    widths.map((width) =>
      getImage({ src: source, width, format: 'webp', quality: 82 }),
    ),
  );
  const largest = variants[variants.length - 1];
  return {
    src: largest.src,
    width: Number(largest.attributes.width),
    height: Number(largest.attributes.height),
    alt,
    sizes,
    srcset: variants.map((v) => `${v.src} ${v.attributes.width}w`).join(', '),
  };
}

export async function workPhotos() {
  const sizes = '(max-width: 600px) 100vw, (max-width: 1000px) 45vw, 30vw';
  return Promise.all(
    [
      {
        key: 'climber' as const,
        title: 'A Different View of the Work',
        category: 'tree',
        label: 'Tree Work',
        shape: 'portrait',
        position: '50% 40%',
      },
      {
        key: 'equipment' as const,
        title: 'The Equipment Behind the Work',
        category: 'tree',
        label: 'Tree Removal',
        shape: 'landscape',
        position: '50% 50%',
      },
      {
        key: 'hauling' as const,
        title: 'From the Tree to the Truck',
        category: 'tree',
        label: 'On the Job',
        shape: 'landscape',
        position: '50% 50%',
      },
      {
        key: 'bucket' as const,
        title: 'Up in the Canopy',
        category: 'tree',
        label: 'Tree Work',
        shape: 'portrait',
        position: '50% 40%',
      },
      {
        key: 'together' as const,
        title: 'Faces Behind the Work',
        category: 'people',
        label: 'Our People',
        shape: 'landscape',
        position: '50% 25%',
      },
      {
        key: 'crew' as const,
        title: 'Local Roots. Familiar Faces.',
        category: 'people',
        label: 'Our People',
        shape: 'landscape',
        position: '50% 30%',
      },
      {
        key: 'portrait' as const,
        title: 'Proud to Be Abrajan',
        category: 'people',
        label: 'Our People',
        shape: 'landscape',
        position: '50% 35%',
      },
    ].map(async (photo) => ({
      ...photo,
      image: await clientPhoto(photo.key, 1600, sizes),
    })),
  ).then(async (photos) => {
    const landscape = await Promise.all(
      [
        {
          source: beds,
          title: 'Care Around Every Tree',
          alt: 'Dark mulch and decorative stone arranged around mature trees, with ornamental grasses along the lawn',
          label: 'Landscaping',
          position: '50% 50%',
        },
        {
          source: lawn,
          title: 'Room to Enjoy the Yard',
          alt: 'A lawn and planting beds maintained by Abrajan',
          label: 'Lawn & Landscape',
          position: '50% 50%',
        },
        {
          source: property,
          title: 'The Finishing Touches',
          alt: 'Landscaped planting beds and an open lawn at a residential property',
          label: 'Property Care',
          position: '50% 50%',
        },
      ].map(async (photo) => ({
        ...photo,
        category: 'landscape',
        shape: 'landscape',
        image: await responsiveImage(photo.source, photo.alt, sizes),
      })),
    );
    // Curated order mixes the work and the people rather than repeating one job.
    return [
      photos[0],
      photos[1],
      landscape[0],
      photos[3],
      photos[2],
      photos[4],
      landscape[1],
      photos[5],
      photos[6],
      landscape[2],
    ];
  });
}

export async function workFilms() {
  return Promise.all(
    [
      {
        id: 'feature',
        title: 'Every Piece Takes a Team.',
        label: 'Tree Removal',
        duration: '0:24',
        src: '/videos/tree-work-loop.mp4',
        poster: feature,
        description:
          'The Abrajan crew guides a large tree section onto a work truck.',
        position: '50% 48%',
      },
      {
        id: 'crane',
        title: 'A Lift Above the Rooftops',
        label: 'Crane Work',
        duration: '0:07',
        src: '/videos/work/crane-work.mp4',
        poster: crane,
        description:
          'A crane lifts a tree section above a residential property.',
        position: '50% 30%',
      },
      {
        id: 'winter',
        title: 'A Winter Workday',
        label: 'On the Job',
        duration: '0:18',
        src: '/videos/work/winter-tree-work.mp4',
        poster: winter,
        description:
          'A look around the crew’s trucks, equipment, and tree work on a snowy day.',
        position: '50% 50%',
      },
      {
        id: 'equipment',
        title: 'On the Ground',
        label: 'Equipment at Work',
        duration: '0:04',
        src: '/videos/work/equipment-at-work.mp4',
        poster: equipment,
        description:
          'The crew and compact loaders at work in a residential yard.',
        position: '50% 50%',
      },
      {
        id: 'bucket',
        title: 'A Closer Look Up Above',
        label: 'Bucket Work',
        duration: '0:21',
        src: '/videos/work/bucket-work.mp4',
        poster: bucket,
        description:
          'A bucket-lift operator works among the upper branches of a tree.',
        position: '50% 25%',
      },
    ].map(async (film) => ({
      ...film,
      image: await responsiveImage(
        film.poster,
        film.description,
        film.id === 'feature'
          ? '(max-width: 760px) 100vw, 90vw'
          : '(max-width: 600px) 100vw, 40vw',
      ),
    })),
  );
}
