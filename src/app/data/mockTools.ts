export interface Tool {
  id: string;
  name: string;
  category: string;
  pricePerDay: number;
  owner: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  image: string;
  available: boolean;
}

export const mockTools: Tool[] = [
  {
    id: '1',
    name: 'DeWalt Cordless Drill',
    category: 'power-tools',
    pricePerDay: 15,
    owner: 'John M.',
    location: { lat: 37.7749, lng: -122.4194, address: '0.3 miles away' },
    image: '🔧',
    available: true,
  },
  {
    id: '2',
    name: 'Circular Saw',
    category: 'power-tools',
    pricePerDay: 20,
    owner: 'Sarah K.',
    location: { lat: 37.7751, lng: -122.4180, address: '0.5 miles away' },
    image: '⚙️',
    available: true,
  },
  {
    id: '3',
    name: 'Pipe Wrench Set',
    category: 'plumbing',
    pricePerDay: 10,
    owner: 'Mike R.',
    location: { lat: 37.7740, lng: -122.4200, address: '0.4 miles away' },
    image: '🔧',
    available: true,
  },
  {
    id: '4',
    name: 'Multimeter',
    category: 'electrical',
    pricePerDay: 8,
    owner: 'Lisa T.',
    location: { lat: 37.7755, lng: -122.4185, address: '0.6 miles away' },
    image: '⚡',
    available: true,
  },
  {
    id: '5',
    name: 'Ladder 20ft',
    category: 'roofing',
    pricePerDay: 25,
    owner: 'Tom B.',
    location: { lat: 37.7745, lng: -122.4210, address: '0.7 miles away' },
    image: '🪜',
    available: true,
  },
  {
    id: '6',
    name: 'Paint Sprayer',
    category: 'painting',
    pricePerDay: 30,
    owner: 'Emma W.',
    location: { lat: 37.7748, lng: -122.4175, address: '0.2 miles away' },
    image: '🎨',
    available: true,
  },
  {
    id: '7',
    name: 'Hammer Set',
    category: 'hand-tools',
    pricePerDay: 5,
    owner: 'David L.',
    location: { lat: 37.7752, lng: -122.4195, address: '0.4 miles away' },
    image: '🔨',
    available: true,
  },
  {
    id: '8',
    name: 'Tile Cutter',
    category: 'power-tools',
    pricePerDay: 18,
    owner: 'Rachel P.',
    location: { lat: 37.7747, lng: -122.4188, address: '0.3 miles away' },
    image: '✂️',
    available: false,
  },
];

export const categories = [
  { id: 'all', label: 'All Tools', icon: '🛠️' },
  { id: 'hand-tools', label: 'Hand Tools', icon: '🔨' },
  { id: 'power-tools', label: 'Power Tools', icon: '⚙️' },
  { id: 'plumbing', label: 'Plumbing', icon: '🚰' },
  { id: 'electrical', label: 'Electrical', icon: '⚡' },
  { id: 'roofing', label: 'Roofing', icon: '🏠' },
  { id: 'painting', label: 'Painting', icon: '🎨' },
];
