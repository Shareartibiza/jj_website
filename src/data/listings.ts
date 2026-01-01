export interface ListingImage {
    url: string;
    alt: string;
}

export interface PropertyListing {
    id: string;
    title: string;
    location: string;
    price: string;
    category: string;
    images: ListingImage[];
    specs: {
        bedrooms: number;
        bathrooms: number;
        buildSize: string;
        plotSize?: string;
    };
    description: string;
    features: string[];
}

export interface LifestyleListing {
    id: string;
    title: string;
    description: string;
    price: string;
    category: 'Yacht' | 'Jet' | 'Watch' | 'Car';
    images: ListingImage[];
    specs: Record<string, string>;
    features: string[];
}

export const properties: PropertyListing[] = [
    {
        id: '1',
        title: 'Villa Es Cubells',
        location: 'Es Cubells, Ibiza',
        price: '€12,500,000',
        category: 'Villas',
        images: [
            { url: '/assets/listings/villa_es_cubells/ext_1.png', alt: 'Villa Es Cubells Exterior' },
            { url: '/assets/listings/villa_es_cubells/int_1.png', alt: 'Villa Es Cubells Interior' },
            { url: '/assets/listings/villa_es_cubells/pool_1.png', alt: 'Infinity Pool' },
            { url: '/assets/listings/villa_es_cubells/kitchen_1.png', alt: 'Designer Kitchen' },
            { url: '/assets/listings/villa_es_cubells/bedroom_1.png', alt: 'Master Bedroom' },
            { url: '/assets/listings/villa_es_cubells/wine_1.png', alt: 'Wine Cellar' },
            { url: '/assets/lifestyle_pool_steps.jpg', alt: 'Pool Area' },
            { url: '/assets/lifestyle_yacht_dining.jpg', alt: 'Outdoor Dining' },
            { url: '/assets/lifestyle_interior_detail.png', alt: 'Living Space' },
            { url: '/assets/lifestyle_drink_sea.jpg', alt: 'Sunset Drinks' },
            { url: '/assets/uploaded_image_0_1765377317186.jpg', alt: 'Villa View 1' },
            { url: '/assets/uploaded_image_1_1765377317186.jpg', alt: 'Villa View 2' }
        ],
        specs: {
            bedrooms: 6,
            bathrooms: 7,
            buildSize: '550 sq m',
            plotSize: '2,500 sq m'
        },
        description: 'Perched on the cliffs of Es Cubells, this architectural masterpiece offers unparalleled Mediterranean views. The villa combines brutalist concrete lines with warm, organic materials, creating a sanctuary of light and space. Designed for the ultimate indoor-outdoor lifestyle, every room opens onto expansive terraces overlooking the sea.',
        features: [
            'Infinity pool with saline system',
            'Full-service outdoor kitchen',
            'Professional-grade gym',
            'Staff quarters with separate entrance',
            'Private beach access path',
            'Smart home automation throughout'
        ]
    },
    {
        id: '2',
        title: 'Can Rimbau Estate',
        location: 'Jesus, Ibiza',
        price: 'Price on Request',
        category: 'Big Projects',
        images: [
            { url: '/assets/luxury_villa_facade_1.jpg', alt: 'Can Rimbau Exterior' },
            { url: '/assets/lifestyle_yacht_dining.jpg', alt: 'Can Rimbau Dining' },
            { url: '/assets/lifestyle_oysters_dining.jpg', alt: 'Fine Dining' },
            { url: '/assets/lifestyle_interior_detail.png', alt: 'Interior Detail' },
            { url: '/assets/lifestyle_pool_steps.jpg', alt: 'Pool Area' },
            { url: '/assets/lifestyle_drink_sea.jpg', alt: 'Terrace View' },
            { url: '/assets/uploaded_image_2_1765377317186.jpg', alt: 'Estate View' },
            { url: '/assets/uploaded_image_3_1765377317186.jpg', alt: 'Guest House' },
            { url: '/assets/lifestyle_woman_sea.jpg', alt: 'Lifestyle View' },
            { url: '/assets/journal_bespoke_travel.png', alt: 'Exclusive Access' }
        ],
        specs: {
            bedrooms: 9,
            bathrooms: 11,
            buildSize: '1,200 sq m',
            plotSize: '15,000 sq m'
        },
        description: 'One of Ibiza\'s most exclusive estates, located within the secure gates of Can Rimbau. This sprawling property offers complete privacy just minutes from Ibiza Town. The estate features a main villa, two guest houses, and a world-class wellness center, all surrounded by meticulously landscaped Mediterranean gardens.',
        features: [
            'Secure gated community (24/7 security)',
            'Indoor and outdoor pools',
            'Private cinema and media room',
            '10-car underground garage',
            'Wine cellar and tasting room',
            'Heliport access'
        ]
    },
    {
        id: '3',
        title: 'Modern Bay Retreat',
        location: 'Talamanca, Ibiza',
        price: '€6,800,000',
        category: 'Villas',
        images: [
            { url: '/assets/lifestyle_speedboat_aerial.jpg', alt: 'Modern Bay Exterior' },
            { url: '/assets/lifestyle_pool_steps.jpg', alt: 'Terrace View' },
            { url: '/assets/lifestyle_drink_sea.jpg', alt: 'Bay View' },
            { url: '/assets/uploaded_image_4_1765377317186.jpg', alt: 'Modernist Lines' },
            { url: '/assets/lifestyle_interior_detail.png', alt: 'Bedroom View' },
            { url: '/assets/lifestyle_oysters_dining.jpg', alt: 'Dining Detail' },
            { url: '/assets/lifestyle_woman_sea.jpg', alt: 'Coastal Lifestyle' },
            { url: '/assets/journal_hidden_ibiza.png', alt: 'Hidden Gems' },
            { url: '/assets/lifestyle_yacht_dining.jpg', alt: 'Evening Terrace' },
            { url: '/assets/uploaded_image_0_1765432651320.jpg', alt: 'Details' }
        ],
        specs: {
            bedrooms: 5,
            bathrooms: 5,
            buildSize: '380 sq m',
            plotSize: '800 sq m'
        },
        description: 'A sleek, contemporary villa just steps from the sand of Talamanca Bay. This property is defined by its clean lines and floor-to-ceiling glass walls that disappear to merge the interior with the sea breeze. An ideal residence for those who want the energy of the Marina and the serenity of a private home.',
        features: [
            'Rooftop sun deck with Jacuzzi',
            'Walking distance to Marina Botafoch',
            'Designer kitchen by Bulthaup',
            'Advanced security systems',
            'Underfloor heating',
            'Minimalist garden design'
        ]
    }
];

export const lifestyleItems: LifestyleListing[] = [
    {
        id: '1',
        title: 'Sunseeker 131 Yacht',
        description: 'The epitome of luxury cruising with 5 cabins and sky deck. A masterpiece of British engineering and Italian-inspired luxury.',
        price: '€145,000 / week',
        category: 'Yacht',
        images: [
            { url: '/assets/lifestyle_yacht_freedom.png', alt: 'Sunseeker 131' },
            { url: '/assets/lifestyle_yacht_dining.jpg', alt: 'Aft Deck Dining' },
            { url: '/assets/lifestyle_oysters_dining.jpg', alt: 'Gourmet Service' },
            { url: '/assets/lifestyle_drink_sea.jpg', alt: 'Deck Cocktails' },
            { url: '/assets/lifestyle_speedboat_aerial.jpg', alt: 'Chase Boat' },
            { url: '/assets/lifestyle_woman_sea.jpg', alt: 'Ocean Breeze' },
            { url: '/assets/lifestyle_interior_detail.png', alt: 'Main Saloon' },
            { url: '/assets/lifestyle_aircraft_cockpit.jpg', alt: 'Navigation Bridge' },
            { url: '/assets/journal_bespoke_travel.png', alt: 'Global Standard' },
            { url: '/assets/uploaded_image_1_1765432651320.jpg', alt: 'Deck View' }
        ],
        specs: {
            'Length': '40.05m',
            'Guests': '12',
            'Cabins': '5',
            'Crew': '8',
            'Built': '2023'
        },
        features: [
            'Tri-deck configuration',
            'Zero-speed stabilizers',
            'On-deck Master suite',
            'Sky lounge with wet bar',
            'Full array of water toys',
            'Submersible swim platform'
        ]
    },
    {
        id: '2',
        title: 'Gulfstream G650ER',
        description: 'Ultra-long-range business jet connecting Ibiza to the world. The gold standard for business aviation, offering the quietest cabin in the industry.',
        price: 'On Request',
        category: 'Jet',
        images: [
            { url: '/assets/lifestyle_aircraft_cockpit.jpg', alt: 'G650ER Cockpit' },
            { url: '/assets/lifestyle_interior_detail.png', alt: 'Cabin Interior' }
        ],
        specs: {
            'Range': '7,500 nm',
            'Speed': 'Mach 0.925',
            'Passengers': '16',
            'Sleeping': '10',
            'Interior': 'Bespoke leather'
        },
        features: [
            'Fresh air replenishment system',
            'Whisper-quiet cabin technology',
            'Ka-band high-speed Wi-Fi',
            'Dual lavatories',
            'State-of-the-art entertainment',
            'Panoramic oval windows'
        ]
    },
    {
        id: '3',
        title: 'Patek Philippe Nautilus',
        description: 'A legendary timepiece that is both sporty and elegant. The ultimate status symbol.',
        price: 'On Request',
        category: 'Watch',
        images: [
            { url: '/assets/uploaded_image_0_1765432651320.jpg', alt: 'Patek Philippe Nautilus' },
            { url: '/assets/uploaded_image_1_1765432651320.jpg', alt: 'Patek Philippe Nautilus Detail' }
        ],
        specs: {
            'Case': 'Stainless Steel',
            'Diameter': '40mm',
            'Movement': 'Automatic',
            'Water Resistance': '120m',
            'Year': '2022'
        },
        features: [
            'Iconic porthole case design',
            'Self-winding mechanical movement',
            'Date in an aperture',
            'Stainless steel bracelet',
            'Fold-over clasp'
        ]
    },
    {
        id: '4',
        title: 'Ferrari 296 GTB',
        description: 'The new era of V6-powered supercars from Ferrari. A revolution in performance and driving pleasure.',
        price: 'On Request',
        category: 'Car',
        images: [
            { url: '/assets/lifestyle_car_luggage.jpg', alt: 'Ferrari 296 GTB' },
            { url: '/assets/lifestyle_car_mirror.jpg', alt: 'Ferrari 296 GTB Detail' },
            { url: '/assets/lifestyle_interior_detail.png', alt: 'Dashboard Detail' },
            { url: '/assets/lifestyle_pool_steps.jpg', alt: 'Scenic Road' },
            { url: '/assets/lifestyle_oysters_dining.jpg', alt: 'GT Lifestyle' },
            { url: '/assets/uploaded_image_2_1765432651320.jpg', alt: 'Sleek Lines' },
            { url: '/assets/journal_market_report.png', alt: 'Investment Grade' },
            { url: '/assets/lifestyle_drink_sea.jpg', alt: 'Coastal Drive' },
            { url: '/assets/uploaded_image_3_1765432651320.jpg', alt: 'Performance' },
            { url: '/assets/uploaded_image_4_1765432651320.jpg', alt: 'Design' }
        ],
        specs: {
            'Engine': 'V6 - 120°',
            'Power': '830 hp',
            '0-100 km/h': '2.9s',
            'Top Speed': '> 330 km/h',
            'Dry Weight': '1470 kg'
        },
        features: [
            'Plug-in hybrid architecture',
            'eManettino steering wheel',
            'Aerodynamic active spoiler',
            'Full-digital interface',
            'Carbon-fiber trim'
        ]
    }
];
