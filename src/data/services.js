// Shared by the homepage and the private estimate endpoint.
export const treeServices = [
  {
    id: 'tree-removal',
    title: 'Tree Removal',
    value: 'Tree removal',
    icon: 'tree',
    text: 'When a tree is damaged, overgrown, or in the wrong place, make room for what comes next.',
    detail: 'Thoughtful planning. Care for your property.',
  },
  {
    id: 'emergency-tree-service',
    title: 'Emergency Tree Service',
    value: 'Emergency tree service',
    icon: 'storm',
    text: 'Tree trouble doesn’t keep business hours. Help with storm damage, fallen trees, and broken limbs.',
    detail: '24/7 emergency & storm damage service.',
  },
  {
    id: 'tree-trimming',
    title: 'Tree Trimming',
    value: 'Tree trimming',
    icon: 'prune',
    text: 'Give your trees the attention they need, with careful trimming for shape, clearance, and healthier growth.',
    detail: 'Less overgrowth. More room to thrive.',
  },
  {
    id: 'stump-grinding',
    title: 'Stump Grinding',
    value: 'Stump grinding',
    icon: 'stump',
    text: 'Finish the job below the surface. Clear an old stump and open up usable space in your yard.',
    detail: 'A fresh start, from the ground up.',
  },
];

// Display labels can change without changing the values sent to the API.
export const estimateServiceOptions = [
  ...treeServices.map(({ title, value }) => ({ label: title, value })),
  { label: 'Land Clearing', value: 'Land clearing' },
  { label: 'Landscaping & Mulch', value: 'Landscaping & mulch' },
  { label: 'Lawn & Property Care', value: 'Lawn & property care' },
  { label: 'Seasonal Cleanup', value: 'Seasonal cleanup' },
  { label: 'Snow & Ice Management', value: 'Snow & ice management' },
  { label: 'Something Else', value: 'Something else' },
];
export const estimateServices = estimateServiceOptions.map(
  ({ value }) => value,
);
