
export interface Image {
  url: string;
  alt: string;
}

export interface Specs {
  [key: string]: string | number;
}

interface Listing {
  id: string;
  title: string;
  price: string;
  category: string;
  images: Image[];
  specs: Specs;
  description: string;
  features: string[];
}

export interface Property extends Listing {}

export interface Lifestyle extends Listing {}

export interface DB {
  properties: Property[];
  lifestyle: Lifestyle[];
}
