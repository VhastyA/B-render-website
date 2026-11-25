export type ProjectCategory =
  | 'All'
  | 'Exterior'
  | 'Interior'
  | 'Civic'
  | 'Hospitality';

export interface RenderProject {
  id: string;
  title: string;
  location: string;
  architect: string;
  category: Exclude<ProjectCategory, 'All'>;
  serviceType: ServiceScopeId;
  year: string;
  image: string;
  specs: {
    engine: string;
    lens: string;
    resolution: string;
  };
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
}

export const STUDIO_LOGO = '/assets/aistudio/b-render-logo_1d9d096d.png';

export const HERO_RENDER = {
  image: '/src/assets/images/hero_coastal_villa_render_1795377165592.jpg',
  alt: 'Aburi Horizon Villa Terrace 3D architectural render',
};

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
    specs: {
      engine: 'V-Ray 7',
      lens: '24mm',
      resolution: '8K',
    },
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
    specs: {
      engine: 'Corona 12',
      lens: '35mm',
      resolution: '8K',
    },
  },
  {
    id: 'accra-civic-atrium',
    title: 'Oculus Civic Art Atrium',
    location: 'Osu, Accra',
    architect: 'Mensah Atelier',
    category: 'Civic',
    serviceType: 'competition-package',
    year: '2025',
    image: '/src/assets/images/gallery_cultural_museum_1795377165505.jpg',
    specs: {
      engine: 'Unreal 5 + Corona',
      lens: '21mm',
      resolution: '8K',
    },
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
    specs: {
      engine: 'Corona 12',
      lens: '28mm',
      resolution: '8K',
    },
  },
];

export const STUDIO_SERVICES: StudioService[] = [
  {
    id: 'exterior-stills',
    index: '01',
    title: 'Exterior Architectural Stills',
    turnaround: '5–7 Days',
    deliverables: [
      '8K Print-Ready Frames',
      'Clay & Camera Sign-Off',
      'Daylight & Dusk Lighting',
    ],
  },
  {
    id: 'interior-stills',
    index: '02',
    title: 'Interior Atmospheric Studies',
    turnaround: '5–8 Days',
    deliverables: [
      'Custom PBR Materials',
      'Bespoke 3D Furniture',
      '16-Bit Color Grading',
    ],
  },
  {
    id: 'architectural-film',
    index: '03',
    title: '3D Walkthrough Film',
    turnaround: '10–14 Days',
    deliverables: [
      '4K 60fps Sequence',
      'Camera Choreography',
      'Sound & Color Grade',
    ],
  },
  {
    id: 'competition-package',
    index: '04',
    title: 'Competition Visualization',
    turnaround: '4–6 Days',
    deliverables: [
      'Hero Aerial & Street Views',
      'Axonometric Diagrams',
      'Rapid Clay Pipeline',
    ],
  },
];
