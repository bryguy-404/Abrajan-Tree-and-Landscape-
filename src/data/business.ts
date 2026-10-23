// Primary search location. Keep verified service coverage separate from the
// marketing focus so changing the focus does not invent a new service area.
export const primaryLocation = { city: 'Granger', state: 'Indiana' };
export const locationLabel = `${primaryLocation.city}, ${primaryLocation.state}`;
export const serviceRegion = 'Michiana';
export const serviceCommunities = [
  'Granger',
  'South Bend',
  'Mishawaka',
  'Elkhart',
  'Osceola',
  'Notre Dame',
];

export const serviceNavigation = [
  {
    title: 'Tree Services',
    href: '/services/tree-services/',
    description: 'Care for your trees, from root to canopy.',
    icon: 'prune',
  },
  {
    title: 'Tree Removal',
    href: '/services/tree-removal/',
    description: 'A clear plan for the trees that need to go.',
    icon: 'tree',
  },
  {
    title: 'Tree Trimming',
    href: '/services/tree-trimming/',
    description: 'Thoughtful care for growing trees.',
    icon: 'prune',
  },
  {
    title: 'Stump Grinding',
    href: '/services/stump-grinding/',
    description: 'Make room for what comes next.',
    icon: 'stump',
  },
  {
    title: 'Emergency Tree Service',
    href: '/services/emergency-tree-service/',
    description: '24/7 storm damage tree work.',
    icon: 'storm',
  },
];

export const propertyNavigation = [
  {
    title: 'Landscaping',
    href: '/services/landscaping/',
    description: 'Beds, mulch, stone, and fresh starts.',
    icon: 'leaf',
  },
  {
    title: 'Lawn Care',
    href: '/services/lawn-care/',
    description: 'Mowing, edging, and seasonal care.',
    icon: 'sun',
  },
  {
    title: 'Land Clearing',
    href: '/services/land-clearing/',
    description: 'Open up an overgrown space.',
    icon: 'tree',
  },
  {
    title: 'Cleanups',
    href: '/services/cleanups/',
    description: 'Spring, fall, and property resets.',
    icon: 'leaf',
  },
  {
    title: 'Snow & Ice Management',
    href: '/services/snow-ice-management/',
    description: 'Plowing, shoveling, and salting.',
    icon: 'snow',
  },
];

export const serviceNavigationGroups = [
  { title: 'Tree Care', services: serviceNavigation },
  { title: 'Landscape & Property', services: propertyNavigation },
];

export function estimateHref(service?: string) {
  return service
    ? `/contact/?service=${encodeURIComponent(service)}#estimate`
    : '/contact/#estimate';
}

// Public listing matched by business name, website, and phone on October 21, 2026.
export const googleProfileUrl =
  'https://www.google.com/maps/search/?api=1&query=Abrajan%20Tree%20%26%20Complete%20Landscape%20Service&query_place_id=ChIJtdYJBB8V5gwR7LrA79dhelc';
