// Primary search location. Keep verified service coverage separate from the
// marketing focus so changing the focus does not invent a new service area.
export const primaryLocation = { city: 'South Bend', state: 'Indiana' };
export const locationLabel = `${primaryLocation.city}, ${primaryLocation.state}`;
export const serviceRegion = 'Michiana';
export const serviceCommunities = [
  'South Bend',
  'Mishawaka',
  'Granger',
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
];

export function estimateHref(service?: string) {
  return service
    ? `/contact/?service=${encodeURIComponent(service)}#estimate`
    : '/contact/#estimate';
}

// Public listing matched by business name, website, and phone on October 21, 2026.
export const googleProfileUrl =
  'https://www.google.com/maps/search/?api=1&query=Abrajan%20Tree%20%26%20Complete%20Landscape%20Service&query_place_id=ChIJtdYJBB8V5gwR7LrA79dhelc';
