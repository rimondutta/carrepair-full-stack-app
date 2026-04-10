import { Service, FilterTab } from '../types/service';
import servicesJson from './services.json';

export const servicesData: Service[] = servicesJson as Service[];

export const filterTabs: FilterTab[] = [
  { label: "All Services", value: "all", count: 8 },
  { label: "Engine & Mechanical", value: "engine-mechanical", count: 2 },
  { label: "Tires & Wheels", value: "tires-wheels", count: 2 },
  { label: "Body & Denting", value: "body-denting", count: 2 },
  { label: "Electrical", value: "electrical", count: 1 },
  { label: "Glass & Windshield", value: "glass-windshield", count: 1 },
];
