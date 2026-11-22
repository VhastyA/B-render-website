export type ProjectCategory =
  | 'All Renders'
  | 'Exterior'
  | 'Interior'
  | 'Civic & Cultural'
  | 'Hospitality';

export interface RenderProject {
  id: string;
  title: string;
  location: string;
  architect: string;
  category: Exclude<ProjectCategory, 'All Renders'>;
  serviceType: ServiceScopeId;
  year: string;
  image: string;
  aspectClass: string;
  featured?: boolean;
  specs: {
    engine: string;
    lens: string;
    resolution: string;
    lighting: string;
  };
  summary: string;
}

export type ServiceScopeId =
  | 'exterior-stills'
  | 'interior-stills'
  | 'architectural-film'
  | 'competition-package';

export interface StudioService {
  id: ServiceScopeId;
  index: string;
  title: string;
  turnaround: string;
  deliverables: string[];
  description: string;
  idealFor: string;
}

export const HERO_RENDER = {
  image: '/src/assets/images/hero_coastal_villa_render_1795377165592.jpg',
  alt: 'Minimalist coastal residence terrace 3D visualization with sculpted white oak side table and honed travertine stone',
  caption: 'B-Render Architectural Studio · Aburi Coastal Terrace · Corona 12',
};

export const STUDIO_METRICS = [
  { value: '140+', label: 'Architectural Commissions' },
  { value: '8K', label: 'Native Still Output' },
  { value: '5–10 Days', label: 'Standard Turnaround' },
  { value: '18', label: 'Cities Across 4 Continents' },
];

export const RENDER_PROJECTS: RenderProject[] = [
  {
    id: 'kofi-pavilion',
    title: 'Cantilevered Courtyard Pavilion',
    location: 'Cantonments, Accra',
    architect: 'Okyere & Partners',
    category: 'Exterior',
    serviceType: 'exterior-stills',
    year: '2026',
    image: '/src/assets/images/gallery_courtyard_pavilion_1795377166139.jpg',
    aspectClass: 'aspect-[4/3]',
    featured: true,
    specs: {
      engine: 'V-Ray 7 + Chaos Vantage',
      lens: '24mm Tilt-Shift · f/4.0',
      resolution: '7680 × 5760 px',
      lighting: 'Blue Hour Twilight & 2700K Interior Fill',
    },
    summary:
      'A board-formed charcoal concrete and oiled cedar residence floating above a dark basalt reflecting pool, balancing tropical canopy density with warm interior luminance.',
  },
  {
    id: 'cantonments-penthouse',
    title: 'Travertine & Smoked Oak Residence',
    location: 'Airport Residential, Accra',
    architect: 'Duffy Spatial Lab',
    category: 'Interior',
    serviceType: 'interior-stills',
    year: '2026',
    image: '/src/assets/images/gallery_penthouse_living_1795377166274.jpg',
    aspectClass: 'aspect-[4/3]',
    specs: {
      engine: 'Corona Renderer 12',
      lens: '35mm Prime · f/2.8',
      resolution: '7200 × 5400 px',
      lighting: 'Low-Angle 16:30 Solar Azimuth',
    },
    summary:
      'Double-height living gallery exploring tactile material honesty: raw travertine monoliths, smoked European oak millwork, brushed brass lines, and raking afternoon shadow play.',
  },
  {
    id: 'accra-civic-atrium',
    title: 'Oculus Civic Art Atrium',
    location: 'Osu Cultural District',
    architect: 'Mensah Atelier',
    category: 'Civic & Cultural',
    serviceType: 'competition-package',
    year: '2025',
    image: '/src/assets/images/gallery_cultural_museum_1795377165505.jpg',
    aspectClass: 'aspect-[4/3]',
    specs: {
      engine: 'Unreal Engine 5 + Corona',
      lens: '21mm Architectural Wide · f/5.6',
      resolution: '8192 × 6144 px',
      lighting: 'Diffused Zenithal Oculus Daylight',
    },
    summary:
      'Winning competition visualization for a public contemporary art foundation featuring sweeping curved concrete drums, slatted timber acoustics, and natural skylight choreography.',
  },
  {
    id: 'labadi-cliff-suites',
    title: 'Nocturne Limestone Plunge Suite',
    location: 'Takoradi Coastline',
    architect: 'Studio Kweku',
    category: 'Hospitality',
    serviceType: 'interior-stills',
    year: '2026',
    image: '/src/assets/images/gallery_boutique_hotel_1795377166968.jpg',
    aspectClass: 'aspect-[4/3]',
    specs: {
      engine: 'Corona Renderer 12',
      lens: '28mm Prime · f/3.2',
      resolution: '7680 × 5760 px',
      lighting: 'Dusk Coastal Sky & Concealed Bronze LED',
    },
    summary:
      'Hospitality suite terrace crafted for pre-launch investor presentations, emphasizing fluted dark walnut joinery, honed limestone water reflections, and coastal twilight warmth.',
  },
  {
    id: 'aburi-ridge-terrace',
    title: 'Aburi Horizon Villa Terrace',
    location: 'Aburi Escarpment',
    architect: 'Okyere & Partners',
    category: 'Exterior',
    serviceType: 'exterior-stills',
    year: '2026',
    image: '/src/assets/images/hero_coastal_villa_render_1795377165592.jpg',
    aspectClass: 'aspect-[16/9]',
    specs: {
      engine: 'Corona Renderer 12',
      lens: '38mm Anamorphic · f/2.8',
      resolution: '7680 × 4320 px',
      lighting: 'Warm Coastal Golden Hour',
    },
    summary:
      'Intimate architectural vignette focusing on bespoke white oak joinery, travertine slab tolerances, and unobstructed horizon glazing bathed in late-afternoon sun.',
  },
];

export const STUDIO_SERVICES: StudioService[] = [
  {
    id: 'exterior-stills',
    index: '01',
    title: 'Exterior Architectural Stills',
    turnaround: '5–7 Business Days',
    deliverables: [
      'Up to 8K print-ready TIFF & WebP frames',
      'Clay massing & camera angle sign-off',
      'Two curated lighting studies (Daylight & Dusk)',
      'Landscape & context photogrammetry integration',
    ],
    description:
      'Photorealistic exterior perspectives calibrated to real geographic sun paths, local vegetation species, and authentic structural patina.',
    idealFor: 'Residential developments, private villas, and planning approvals',
  },
  {
    id: 'interior-stills',
    index: '02',
    title: 'Interior Atmospheric Studies',
    turnaround: '5–8 Business Days',
    deliverables: [
      'Custom PBR shader authoring for stone, timber & fabric',
      'Bespoke furniture & luminaire 3D asset modeling',
      '16-bit color-graded editorial stills',
      'Material & lighting moodboard alignment',
    ],
    description:
      'Intimate spatial narratives focused on tactile finishes, natural window falloff, and curated architectural styling that reads like editorial photography.',
    idealFor: 'Interior architects, hospitality brands, and luxury residences',
  },
  {
    id: 'architectural-film',
    index: '03',
    title: '3D Walkthrough & Spatial Film',
    turnaround: '10–14 Business Days',
    deliverables: [
      '45–90 second 4K 60fps cinema-grade sequence',
      'Storyboard & camera choreography animatic',
      'Subtle atmospheric motion (water, foliage, sun shift)',
      'Bespoke sound design & color grading',
    ],
    description:
      'Continuous architectural cinema designed to guide investors and juries smoothly through threshold transitions, volume shifts, and daylight changes.',
    idealFor: 'Flagship developments, investor decks, and exhibition screens',
  },
  {
    id: 'competition-package',
    index: '04',
    title: 'Competition & Jury Visualization',
    turnaround: '4–6 Business Days',
    deliverables: [
      'Hero aerial + human-scale eye-level perspectives',
      'Exploded axonometric & diagram integration',
      'Rapid iterative clay-to-final pipeline',
      'Dedicated senior visualization director',
    ],
    description:
      'High-impact visual storytelling built for tight architectural competition deadlines where spatial clarity and emotional resonance win juries.',
    idealFor: 'Civic institutions, cultural landmarks, and international tenders',
  },
];

export const STUDIO_WORKFLOW = [
  {
    step: '01',
    title: 'CAD & Massing Ingestion',
    detail:
      'We accept Revit, Rhino, SketchUp, ArchiCAD, or 3ds Max models and establish initial clay camera angles within 48 hours.',
  },
  {
    step: '02',
    title: 'Materiality & Light Study',
    detail:
      'Physical material samples, sun azimuth, and atmospheric framing are calibrated in iterative low-res previews for precision sign-off.',
  },
  {
    step: '03',
    title: '8K Rendering & Post-Grading',
    detail:
      'Full-resolution ray-traced frames undergo subtle architectural film grading—preserving shadow depth and realistic material imperfections.',
  },
];
