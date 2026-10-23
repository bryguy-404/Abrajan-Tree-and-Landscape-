import { primaryLocation } from './business';

export interface ServicePage {
  slug: string;
  title: string;
  value: string;
  category: 'tree' | 'property';
  theme:
    | 'portrait'
    | 'ground'
    | 'urgent'
    | 'garden'
    | 'panorama'
    | 'clearing'
    | 'editorial'
    | 'winter';
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  generated?: boolean;
  eyebrow: string;
  headline: string;
  intro: string;
  description: string;
  workTitle: string;
  workIntro: string;
  work: { title: string; text: string; icon: string }[];
  featureEyebrow: string;
  featureTitle: string;
  featureText: string;
  featureItems: { title: string; text: string }[];
  faqTitle: string;
  questions: { question: string; answer: string }[];
  related: string[];
  cta: string;
}

const city = primaryLocation.city;

export const servicePages: ServicePage[] = [
  {
    slug: 'tree-trimming',
    title: 'Tree Trimming',
    value: 'Tree trimming',
    category: 'tree',
    theme: 'portrait',
    image: '/images/tree-care.webp',
    imageAlt:
      'An Abrajan crew member working among the branches of a mature tree',
    imageWidth: 900,
    imageHeight: 1471,
    eyebrow: 'ROOM TO GROW. ROOM TO ENJOY.',
    headline: 'Thoughtful Cuts. Lasting Care.',
    intro:
      'A branch over the driveway. Limbs reaching toward the roof. A tree that has outgrown its space. Let’s talk about the trimming your property needs, with care for the tree you want to keep.',
    description: `Tree trimming in ${city}, Indiana. Discuss branch clearance, overgrowth, and maintenance with Abrajan’s licensed and insured tree crew. Free estimates.`,
    workTitle: 'Start With What Needs Attention.',
    workIntro:
      'Every tree grows into a different space. We look at your concerns, the surrounding property, and access for the work before agreeing on the scope.',
    work: [
      {
        title: 'Branches Near Your Property',
        text: 'Tell us about limbs reaching toward a roof, driveway, walkway, or another area you use. We’ll discuss the clearance you have in mind and how to approach the work.',
        icon: 'home',
      },
      {
        title: 'Overgrowth & Canopy Care',
        text: 'When branches feel crowded or extend beyond the space available, a considered trimming plan can help address the growth without treating every tree the same.',
        icon: 'prune',
      },
      {
        title: 'Damaged or Unwanted Limbs',
        text: 'Point out broken branches and changes you’ve noticed. Storm-damaged trees may need a different approach; let us know about recent damage when you get in touch.',
        icon: 'tree',
      },
    ],
    featureEyebrow: 'A PLAN BEFORE THE FIRST CUT',
    featureTitle: 'Keep the Tree. Improve the Space Around It.',
    featureText:
      'Trimming starts with a conversation about the result. Share what you want to keep, what is getting in the way, and what you hope will feel different when the work is done.',
    featureItems: [
      {
        title: 'Your Priorities',
        text: 'Clearance, appearance, or a particular branch: knowing the concern helps define the work.',
      },
      {
        title: 'The Surroundings',
        text: 'Buildings, fences, planting beds, and access all belong in the plan.',
      },
      {
        title: 'The Finish',
        text: 'Agree on the branches to address and how cut material will be handled in your estimate.',
      },
    ],
    faqTitle: 'A Little Clarity Before We Trim.',
    questions: [
      {
        question: 'When should I have a tree trimmed?',
        answer:
          'Timing depends on the tree, its condition, and the reason for the work. Tell us what you have noticed and whether there is damage or an urgent concern so we can discuss the next step.',
      },
      {
        question: 'Is tree trimming the same as hedge trimming?',
        answer:
          'They are separate types of work. This page covers trees and their branches. Abrajan also offers hedge trimming and pruning as part of its lawn and property care services.',
      },
      {
        question: 'Can you quote trimming and removal together?',
        answer:
          'Yes. Identify which trees you want to keep and which you are considering removing. We can discuss both as part of the same project and make the scope clear in the estimate.',
      },
      {
        question: 'What information helps with an estimate?',
        answer:
          'Your property location, the number of trees, the branches you are concerned about, and any nearby buildings or access restrictions are useful starting points. An estimate can then account for the actual work.',
      },
    ],
    related: ['tree-removal', 'lawn-care'],
    cta: 'Give Your Trees the Right Attention.',
  },
  {
    slug: 'stump-grinding',
    title: 'Stump Grinding',
    value: 'Stump grinding',
    category: 'tree',
    theme: 'ground',
    image: 'stump',
    imageAlt: 'Illustrative close view of a cut tree stump awaiting grinding',
    imageWidth: 1536,
    imageHeight: 1024,
    generated: true,
    eyebrow: 'A FRESH START AT GROUND LEVEL',
    headline: 'The Tree Is Gone. What Comes Next?',
    intro:
      'An old stump can interrupt a lawn, a planting bed, or your next outdoor project. We’ll help you plan the grinding work and talk through what happens to the space afterward.',
    description: `Stump grinding in ${city}, Indiana. Plan access, grinding, and the finish for an old stump or a recent tree removal. Ask Abrajan for a free estimate.`,
    workTitle: 'Reclaim the Space Around the Stump.',
    workIntro:
      'The visible stump is only part of the conversation. Access, the area around it, and your plans for the ground help determine the scope.',
    work: [
      {
        title: 'Old Stumps',
        text: 'Address a stump that has been left behind in the lawn or landscape. Tell us its approximate size and what is nearby so we can start planning.',
        icon: 'stump',
      },
      {
        title: 'After Tree Removal',
        text: 'If you are having a tree removed, discuss stump grinding at the estimate stage. It is a separate item to confirm, rather than something to assume is included.',
        icon: 'tree',
      },
      {
        title: 'Your Next Use for the Area',
        text: 'A lawn repair, a new bed, or simply easier mowing each calls for a different finish. Let us know how you want to use the area after grinding.',
        icon: 'leaf',
      },
    ],
    featureEyebrow: 'KNOW WHAT STAYS. PLAN WHAT FOLLOWS.',
    featureTitle: 'Grinding Is One Step. The Finish Matters, Too.',
    featureText:
      'Grinding reduces the stump into woody material. It is different from excavating the entire root system, and it does not automatically leave a finished lawn. We’ll discuss the next steps with you.',
    featureItems: [
      {
        title: 'Access & Obstacles',
        text: 'Mention gates, slopes, fences, and anything known to be underground near the stump.',
      },
      {
        title: 'Grinding Material',
        text: 'Agree on whether the resulting material stays on site or is handled as part of the work.',
      },
      {
        title: 'Soil & Lawn Repair',
        text: 'Ask about soil, sod, or landscaping separately so your estimate reflects the finish you want.',
      },
    ],
    faqTitle: 'What to Expect From Stump Grinding.',
    questions: [
      {
        question: 'Does tree removal include stump grinding?',
        answer:
          'Not automatically. Ask for stump grinding when discussing removal so the estimate can clearly show which work is included.',
      },
      {
        question: 'Does grinding remove every root?',
        answer:
          'Stump grinding addresses the stump; it is not the same as digging out the entire root system. Discuss the depth and area of work, along with future plans for that spot, before work begins.',
      },
      {
        question: 'Will the area be ready for grass afterward?',
        answer:
          'That depends on the agreed finish. Grinding material, soil, settling, and lawn repair need to be considered. Tell us if you want to return the area to lawn so those steps can be discussed.',
      },
      {
        question: 'Can you reach a stump behind a fence?',
        answer:
          'Access needs to be checked for each property. Include gate openings, the route to the stump, and any slopes or tight spaces in your request.',
      },
    ],
    related: ['tree-removal', 'landscaping'],
    cta: 'Make Room for What Comes Next.',
  },
  {
    slug: 'emergency-tree-service',
    title: 'Emergency Tree Service',
    value: 'Emergency tree service',
    category: 'tree',
    theme: 'urgent',
    image: '/images/tree-care.webp',
    imageAlt: 'Abrajan tree worker among branches',
    imageWidth: 900,
    imageHeight: 1471,
    eyebrow: '24/7 EMERGENCY & STORM DAMAGE TREE WORK',
    headline: 'When the Unexpected Comes Down.',
    intro: `A fallen tree or broken limb changes the day in an instant. Abrajan offers emergency tree service for storm damage and unexpected tree problems across ${city} and the surrounding Michiana area.`,
    description: `24/7 emergency tree service in ${city}, Indiana. Abrajan handles storm-damaged trees, fallen trees, and broken limbs. Online forms are not emergency dispatch.`,
    workTitle: 'Tree Work After the Storm.',
    workIntro:
      'The condition of the tree and everything around it shape the work. Share what happened and what has been affected so the situation can be understood.',
    work: [
      {
        title: 'Fallen Trees',
        text: 'Trees down across a yard or access route may need removal in sections. The location, the surrounding property, and access for the crew all matter.',
        icon: 'tree',
      },
      {
        title: 'Broken & Hanging Limbs',
        text: 'Damaged branches can remain overhead after a storm has passed. Keep clear of the affected area and let the crew know about any limbs still in the tree.',
        icon: 'storm',
      },
      {
        title: 'Storm-Damaged Trees',
        text: 'A tree can be damaged without coming down completely. Describe visible changes and nearby structures when discussing the work needed.',
        icon: 'home',
      },
    ],
    featureEyebrow: 'THE FIRST PRIORITY',
    featureTitle: 'Keep Your Distance From the Damage.',
    featureText:
      'Do not approach hanging limbs, unstable trees, or trees touching power lines. Keep people and pets out of the affected area. If there is immediate danger, contact emergency services; report damaged power lines to the utility.',
    featureItems: [
      {
        title: 'Where It Happened',
        text: 'Give the property location and describe any blocked access without entering the damaged area.',
      },
      {
        title: 'What Is Affected',
        text: 'Mention buildings, vehicles, fences, or utility lines involved in the incident.',
      },
      {
        title: 'What You Can See Safely',
        text: 'Describe the tree and visible damage from a safe place. Do not get closer just to take a photo.',
      },
    ],
    faqTitle: 'After the Immediate Danger Is Addressed.',
    questions: [
      {
        question: 'Do you offer emergency tree work outside normal hours?',
        answer:
          'Yes. Abrajan offers 24/7 emergency tree service. Timing and availability depend on the situation, conditions, and the work involved; this website does not guarantee an arrival time.',
      },
      {
        question: 'Can I use the website form for an emergency?',
        answer:
          'No. Online estimate requests are not an emergency dispatch channel and may not be monitored immediately. Use the form only for non-urgent follow-up planning. For immediate danger, contact emergency services or the utility involved.',
      },
      {
        question: 'What if the tree is touching a power line?',
        answer:
          'Stay away from the tree, wires, and the surrounding area. Contact the utility and emergency services as appropriate. Do not touch or try to move the tree or line yourself.',
      },
      {
        question: 'What happens to debris and the remaining stump?',
        answer:
          'Discuss debris handling, hauling, and any stump grinding as part of the scope. Tree removal, the cleanup afterward, and restoring the yard are separate details to confirm.',
      },
    ],
    related: ['tree-removal', 'cleanups'],
    cta: 'Planning the Work After the Storm?',
  },
  {
    slug: 'landscaping',
    title: 'Landscaping',
    value: 'Landscaping & mulch',
    category: 'property',
    theme: 'garden',
    image: '/images/garden-beds.webp',
    imageAlt:
      'Curved mulch and stone beds around mature trees in a landscape from Abrajan’s gallery',
    imageWidth: 1024,
    imageHeight: 768,
    eyebrow: 'A LITTLE MORE LIFE OUTSIDE',
    headline: 'Bring the Whole Yard Together.',
    intro:
      'Fresh mulch, a defined garden bed, or the finishing touch after tree work. We help turn those outdoor plans into a space that feels cared for, from the lawn to the edges.',
    description: `Landscaping in ${city}, Indiana. Mulch, sod, stone, soil, and landscape refreshes from Abrajan Tree & Complete Landscaping Service. Free estimates.`,
    workTitle: 'The Details Make the Difference.',
    workIntro:
      'Start with the part of your landscape you want to change. We’ll discuss the materials, preparation, and finish that fit your project.',
    work: [
      {
        title: 'Mulch & Garden Beds',
        text: 'Refresh tired beds and define the areas around your lawn, shrubs, and trees. Talk through the existing condition and the look you want before choosing the scope.',
        icon: 'leaf',
      },
      {
        title: 'Stone, Gravel & Soil',
        text: 'Abrajan offers gravel, stone, topsoil, sand, and black dirt for property projects. We’ll discuss the material, location, and work needed for your space.',
        icon: 'home',
      },
      {
        title: 'Sod & Fresh Starts',
        text: 'New sod can be part of a lawn or landscape project. Ground preparation and care after installation belong in the conversation as much as the finished appearance.',
        icon: 'sun',
      },
    ],
    featureEyebrow: 'WORK WITH WHAT MAKES YOUR YARD YOURS',
    featureTitle: 'A Refresh. A Reset. A Better View.',
    featureText:
      'You don’t need to have every detail decided. Tell us which areas you enjoy, which need attention, and how much you want to change. We’ll start there.',
    featureItems: [
      {
        title: 'Keep What You Love',
        text: 'Identify the existing trees, shrubs, and beds that should remain part of the landscape.',
      },
      {
        title: 'Choose the Finish',
        text: 'Discuss mulch, stone, soil, or sod in the context of the space and your maintenance plans.',
      },
      {
        title: 'Bring the Work Together',
        text: 'If trimming, clearing, or a cleanup comes first, include it in the project conversation.',
      },
    ],
    faqTitle: 'Let’s Shape Your Outdoor Plans.',
    questions: [
      {
        question: 'Can you refresh existing landscaping?',
        answer:
          'Yes. You can start with the beds and landscape already on your property. Tell us what needs refreshing and what you want to keep so we can discuss the right scope.',
      },
      {
        question: 'Do you offer mulch and stone work?',
        answer:
          'Yes. Mulch, gravel, and stone are listed among Abrajan’s services, along with topsoil, sand, black dirt, and sod. Material choice, quantity, preparation, and placement are details to confirm in the estimate.',
      },
      {
        question: 'Can landscaping follow a tree removal?',
        answer:
          'Yes, we can discuss the next stage of your yard as part of the project. Stump grinding, soil preparation, and landscape work should each be included explicitly if needed.',
      },
      {
        question: 'Can I request a small project?',
        answer:
          'Tell us the area you want to improve and your property location. We can discuss the work and provide a free estimate rather than assuming you need a complete yard redesign.',
      },
    ],
    related: ['lawn-care', 'cleanups'],
    cta: 'Let’s Make More of Your Outdoor Space.',
  },
  {
    slug: 'lawn-care',
    title: 'Lawn Care',
    value: 'Lawn & property care',
    category: 'property',
    theme: 'panorama',
    image: '/images/lawn-care.webp',
    imageAlt:
      'A green front lawn and landscaped beds around a home from Abrajan’s gallery',
    imageWidth: 594,
    imageHeight: 448,
    eyebrow: 'THE EVERYDAY CARE THAT SHOWS',
    headline: 'A Yard You Can Come Home to.',
    intro:
      'Keep the weekly work off your list. From mowing and edging to hedge trimming and seasonal lawn attention, Abrajan helps keep your property looking cared for through the growing season.',
    description: `Lawn care in ${city}, Indiana. Weekly mowing, edging, hedge trimming, pruning, power raking, and de-thatching. Ask Abrajan about care for your property.`,
    workTitle: 'Regular Care. A More Finished Look.',
    workIntro:
      'A lawn is part of a larger outdoor space. Combine routine upkeep with the specific attention your property needs, and agree on the schedule and scope before work starts.',
    work: [
      {
        title: 'Weekly Mowing & Edging',
        text: 'Stay on top of growth with regular mowing and defined lawn edges. Discuss the areas to maintain, access, and scheduling when arranging service.',
        icon: 'sun',
      },
      {
        title: 'Hedge Trimming & Pruning',
        text: 'Keep hedges and shrubs part of a tidy landscape. Point out the plants you want addressed and the shape or clearance you have in mind.',
        icon: 'prune',
      },
      {
        title: 'Seasonal Lawn Attention',
        text: 'Power raking and de-thatching are available for lawns that need more than mowing. Ask about the condition of your lawn and which work is appropriate.',
        icon: 'leaf',
      },
    ],
    featureEyebrow: 'THROUGH THE GROWING SEASON',
    featureTitle: 'Give Your Lawn a Rhythm.',
    featureText:
      'Your property’s needs change through the year. Routine visits and occasional projects can be planned together, with clear expectations for what each service includes.',
    featureItems: [
      {
        title: 'Start Fresh',
        text: 'Discuss spring cleanup, accumulated leaves, and any lawn preparation before regular growth gets underway.',
      },
      {
        title: 'Keep It Cared For',
        text: 'Arrange mowing and edging, and identify hedges or shrubs that need separate attention.',
      },
      {
        title: 'Finish the Season',
        text: 'Plan fall cleanup and leaf hauling so the season’s last big job is accounted for.',
      },
    ],
    faqTitle: 'Your Lawn, Your Routine.',
    questions: [
      {
        question: 'Do you offer recurring mowing?',
        answer:
          'Yes. Weekly mowing and edging are listed services. Share your property location and the areas you want maintained so scheduling and the scope can be discussed.',
      },
      {
        question: 'Is hedge trimming included with mowing?',
        answer:
          'Confirm it in your estimate. Hedge trimming and pruning are available, but a mowing arrangement should not be assumed to include every type of property care.',
      },
      {
        question: 'What about de-thatching or grub control?',
        answer:
          'Power raking, de-thatching, and grub control appear on Abrajan’s service list. Describe the condition of your lawn and ask about current options, timing, and suitability for your property.',
      },
      {
        question: 'Can you help with leaves and garden beds too?',
        answer:
          'Yes. Seasonal cleanups, leaf hauling, and landscaping are also offered. They can be discussed alongside lawn care, with the details included in the estimate.',
      },
    ],
    related: ['cleanups', 'landscaping'],
    cta: 'Enjoy Your Yard. We’ll Talk About the Upkeep.',
  },
  {
    slug: 'land-clearing',
    title: 'Land Clearing',
    value: 'Land clearing',
    category: 'property',
    theme: 'clearing',
    image: 'clearing',
    imageAlt:
      'Illustrative residential clearing with retained mature trees along a wooded edge',
    imageWidth: 1536,
    imageHeight: 1024,
    generated: true,
    eyebrow: 'OPEN UP THE POSSIBILITIES',
    headline: 'See What Your Space Can Be.',
    intro:
      'Overgrowth can hide the potential of a property. Start with the space you want to open up, the trees you want to keep, and a clear conversation about what comes next.',
    description: `Land clearing in ${city}, Indiana. Discuss overgrowth, brush, tree work, access, and material handling with Abrajan. Free estimates for your property project.`,
    workTitle: 'Start With the Land. Plan Around Your Goal.',
    workIntro:
      'A usable clearing starts with a defined scope. Walk us through the area, the growth to address, and how you hope to use it after the work.',
    work: [
      {
        title: 'Overgrown Areas',
        text: 'Talk through brush and unwanted growth that have taken over part of your property. Define the area to address and anything that should remain.',
        icon: 'leaf',
      },
      {
        title: 'Trees Within the Project',
        text: 'If trees need to come out, include them in the conversation. Tree removal and stump grinding have their own access and finishing requirements.',
        icon: 'tree',
      },
      {
        title: 'Material & Access Planning',
        text: 'Discuss how the crew can reach the area and what should happen to cut material. Hauling, retained wood, and the finish should be agreed on before work starts.',
        icon: 'home',
      },
    ],
    featureEyebrow: 'DEFINE THE JOB BEFORE OPENING THE SPACE',
    featureTitle: 'A Clear Boundary. A Clear Plan.',
    featureText:
      'Land clearing is not automatically excavation, grading, or a construction-ready site. We’ll discuss the vegetation work you need and where other project requirements may begin.',
    featureItems: [
      {
        title: 'What Stays',
        text: 'Identify retained trees, planting areas, fences, and other features you want protected.',
      },
      {
        title: 'What Goes',
        text: 'Agree on the area and the growth to address, including any trees or stumps in the scope.',
      },
      {
        title: 'What Comes Next',
        text: 'Share your intended use so material handling and any separate follow-up work can be discussed.',
      },
    ],
    faqTitle: 'Before We Clear the Way.',
    questions: [
      {
        question: 'Can you clear only part of a property?',
        answer:
          'Tell us the area you want opened up and which trees or plants should stay. The project can be discussed around that defined area, rather than assuming the whole property needs clearing.',
      },
      {
        question: 'Does clearing include stump removal or grinding?',
        answer:
          'Not automatically. Identify stumps and trees when requesting the estimate, and ask for any stump grinding to be included explicitly.',
      },
      {
        question: 'Will the land be ready for construction afterward?',
        answer:
          'Clearing vegetation does not by itself establish that land is ready for construction. Grading, excavation, drainage, permits, and other requirements are separate matters to discuss with the appropriate professionals.',
      },
      {
        question: 'What happens to branches and other material?',
        answer:
          'Material handling depends on the agreed scope. Discuss what stays, what is removed, and how you want the area left when the clearing work is complete.',
      },
    ],
    related: ['tree-removal', 'stump-grinding'],
    cta: 'Let’s Talk About the Space You See.',
  },
  {
    slug: 'cleanups',
    title: 'Property Cleanups',
    value: 'Seasonal cleanup',
    category: 'property',
    theme: 'editorial',
    image: '/images/yard-work.webp',
    imageAlt: 'An Abrajan worker tending beds beside a backyard lawn',
    imageWidth: 864,
    imageHeight: 648,
    eyebrow: 'A RESET FOR THE SEASON AHEAD',
    headline: 'Less on Your List. More Room to Enjoy.',
    intro:
      'Leaves collect. Beds get untidy. The seasons leave their mark. From spring and fall cleanups to leaf hauling and gutter cleaning, we help you catch up with your outdoor space.',
    description: `Spring and fall property cleanups in ${city}, Indiana. Leaf hauling, seasonal yard care, and gutter cleaning from Abrajan. Request a free estimate.`,
    workTitle: 'Take Care of What Has Built Up.',
    workIntro:
      'Tell us which parts of the property need attention. A cleanup can focus on a particular area or bring several seasonal tasks into one conversation.',
    work: [
      {
        title: 'Spring & Fall Cleanups',
        text: 'Prepare for a new growing season or tidy up after it. Share the condition of your lawn and beds so the work can be planned around what is there.',
        icon: 'leaf',
      },
      {
        title: 'Leaf Hauling',
        text: 'When fallen leaves become more than a weekend task, ask about collecting and hauling them. The size of the area and volume of material help define the job.',
        icon: 'tree',
      },
      {
        title: 'Gutter Cleaning',
        text: 'Include gutters that need attention in your request. Access, building height, and the conditions on your property are details to discuss for the estimate.',
        icon: 'home',
      },
    ],
    featureEyebrow: 'TWO SEASONS. A FRESH START EACH TIME.',
    featureTitle: 'Ready for What Comes Next.',
    featureText:
      'The best cleanup plan starts with the season you’re in and the work still ahead. Lawn care, landscape refreshes, and tree work can be discussed separately when more attention is needed.',
    featureItems: [
      {
        title: 'Spring: Open the Season',
        text: 'Address accumulated leaves and untidy outdoor areas before mowing and landscape work become regular tasks.',
      },
      {
        title: 'Fall: Bring It Together',
        text: 'Plan leaf cleanup, hauling, and gutter attention as the growing season winds down.',
      },
    ],
    faqTitle: 'A Few Details Make Cleanup Easier.',
    questions: [
      {
        question: 'What is included in a property cleanup?',
        answer:
          'That depends on the work you request. Spring and fall cleanup, leaf hauling, and gutter cleaning are available. Identify the areas and tasks you want included so the estimate is clear.',
      },
      {
        question: 'Can you haul away leaves?',
        answer:
          'Yes. Leaf hauling is listed among Abrajan’s services. Tell us the area involved and whether leaves have already been gathered when you request an estimate.',
      },
      {
        question: 'Can a cleanup be combined with fresh mulch?',
        answer:
          'Yes. We can discuss a cleanup and a landscaping refresh together. Mulch, lawn work, and any trimming should be identified separately in the project scope.',
      },
      {
        question: 'Is this the right service for storm-damaged trees?',
        answer:
          'Fallen trees and broken or hanging limbs need a tree-service conversation first. Use our emergency tree service information for storm damage; a routine seasonal cleanup is a different type of work.',
      },
    ],
    related: ['lawn-care', 'snow-ice-management'],
    cta: 'A Fresh Start for Your Property.',
  },
  {
    slug: 'snow-ice-management',
    title: 'Snow & Ice Management',
    value: 'Snow & ice management',
    category: 'property',
    theme: 'winter',
    image: 'winter',
    imageAlt:
      'Illustrative cleared driveway and walkway bordered by winter snow',
    imageWidth: 1536,
    imageHeight: 1024,
    generated: true,
    eyebrow: 'CARE DOESN’T STOP WHEN THE SEASONS CHANGE',
    headline: 'Keep Winter Moving.',
    intro:
      'When snow becomes the next job on the list, it helps to have a plan. Talk with Abrajan about plowing, shoveling, and salting for the areas your property depends on.',
    description: `Snow and ice management in ${city}, Indiana. Snow plowing, shoveling, and salting for sidewalks and parking lots. Discuss winter service with Abrajan.`,
    workTitle: 'Plan for the Places People Use.',
    workIntro:
      'Different areas need different care. Identify the vehicle access, walking routes, and parking spaces you want included in your winter service request.',
    work: [
      {
        title: 'Snow Plowing',
        text: 'Discuss the driving and parking areas that need clearing, access to the property, and where snow can be placed during the work.',
        icon: 'home',
      },
      {
        title: 'Shoveling',
        text: 'Include walks and smaller access areas in the plan. Let us know which entrances and routes matter most for your property.',
        icon: 'snow',
      },
      {
        title: 'Sidewalk & Parking Lot Salting',
        text: 'Salting is available for sidewalks and parking lots. Ask about the areas, surface conditions, and scope of treatment when arranging service.',
        icon: 'check',
      },
    ],
    featureEyebrow: 'MAKE THE ARRANGEMENTS BEFORE THE SNOW',
    featureTitle: 'A Winter Plan That Starts With Your Property.',
    featureText:
      'Weather and surface conditions can change quickly. A service arrangement should spell out the areas included, how scheduling is handled, and what to expect as conditions change.',
    featureItems: [
      {
        title: 'Mark the Priorities',
        text: 'List entrances, walks, driveways, and parking areas that need attention.',
      },
      {
        title: 'Discuss the Details',
        text: 'Point out obstacles, surface edges, and suitable snow placement areas before winter work begins.',
      },
      {
        title: 'Confirm Availability',
        text: 'Ask about scheduling and current capacity. This website does not promise an automatic visit or response time.',
      },
    ],
    faqTitle: 'Before Winter Arrives.',
    questions: [
      {
        question: 'Which winter services do you offer?',
        answer:
          'Abrajan lists snow plowing, snow shoveling, and salting for sidewalks and parking lots. Tell us the areas you need maintained so we can discuss the arrangement.',
      },
      {
        question: 'Can I arrange service ahead of a snowfall?',
        answer:
          'You can contact us to discuss your property, scheduling, and current availability. Confirm the service terms directly; sending a form does not establish a snow-service agreement.',
      },
      {
        question: 'Is salting included with plowing?',
        answer:
          'Confirm both in your estimate or service arrangement. Plowing, shoveling, and salting address different areas and should not be assumed to be bundled together.',
      },
      {
        question: 'Will every surface stay clear of snow and ice?',
        answer:
          'Conditions can change after work is completed, including additional snow and refreezing. Discuss the scope and timing of service, and continue to use care on winter surfaces.',
      },
    ],
    related: ['cleanups', 'lawn-care'],
    cta: 'Let’s Get Your Property Ready for Winter.',
  },
];
