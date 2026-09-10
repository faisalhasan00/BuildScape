export const siteConfig = {
  brandName: "Buildscape",
  brandFullName: "Buildscape Architects & Engineers",
  tagline: "Designing Spaces. Building Trust. Creating Landmarks.",
  secondaryTagline: "Where Architecture Meets Engineering Excellence.",
  taglineExtra: "Building Dreams with Precision.",
  sinceYear: "2009",
  founder: "Mohammad Khaja Osman",
  founderRole: "Founder & Principal",
  disciplinesScope: "Architecture | Engineering | Construction | Interior Fit-Outs",
  location: "Shadnagar",
  district: "Ranga Reddy District",
  state: "Telangana",
  pincode: "509216",
  address: "Buildscape Corporate Office, Main Road, Near Flyover, Shadnagar, Ranga Reddy District, Telangana — 509216, India",
  phoneNumbers: ["040-45524579", "+91-99999999999", "+91-99999999999"],
  email: "info@buildscape.in",
  whatsappNumber: "9199999999999",
  mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30526.47172088151!2d78.1884!3d17.0691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3abca1b009e46a77%3A0x6b4fb7c4a2428511!2sShadnagar%2C%20Telangana%20509216!5e0!3m2!1sen!2sin!4v1782528000000!5m2!1sen!2sin",
  
  aboutSummary: "Buildscape Architects & Engineers is a multidisciplinary architectural, structural engineering, interior architecture, and turnkey construction firm committed to transforming bold ideas into exceptional built realities. We believe every project is far more than a physical structure—it is an enduring reflection of our clients' aspirations, lifestyle, brand identity, and long-term vision.",
  
  vision: "To become the foremost architectural and engineering authority recognized for crafting sustainable, technologically advanced, and inspiring spaces that elevate lives and urban environments.",
  visionTitle: "Shaping Timeless Landscapes",
  
  mission: "Deliver high-performance design and construction solutions through uncompromising quality benchmarks, transparent project management, cost efficiency, and lasting client partnerships.",
  missionTitle: "Excellence & Total Integrity",
  
  officialQuote: "At Buildscape Architects & Engineers, we don't simply construct buildings—we create spaces where families build memories, businesses scale to new heights, and communities thrive. Every line drawn on paper represents a vision; every foundation laid represents trust."
};

export const heroSlides = [
  {
    id: 1,
    image: "/assets/images/hero1.jpg",
    title: "Designing Spaces. Building Trust. Creating Landmarks.",
    subtitle: "Buildscape Architects & Engineers — Multidisciplinary practice delivering precision-crafted living and commercial environments since 2009."
  },
  {
    id: 2,
    image: "/assets/images/hero2.jpg",
    title: "Luxury That Feels Timeless, Designed for Modern Living",
    subtitle: "High-end luxury residential and commercial interior architecture with uncompromised engineering precision."
  },
  {
    id: 3,
    image: "/assets/images/hero3.jpg",
    title: "Engineering Rigor & Ground-Up Construction",
    subtitle: "Advanced structural analysis, RCC designs, and turnkey general contracting across Shadnagar & Telangana."
  },
  {
    id: 4,
    image: "/assets/images/hero4.jpg",
    title: "Single-Point Accountability from Land to Key",
    subtitle: "Turnkey execution taking projects seamlessly from initial architectural brief through structural completion and interior handover."
  }
];

export const disciplines = [
  {
    id: "arch",
    category: "Discipline 01",
    title: "Architecture & Design Build",
    description: "Our principals are directly involved in every project we undertake, ensuring every building we deliver is functional, precisely engineered, and built to last.",
    linkText: "Explore Architecture"
  },
  {
    id: "interiors",
    category: "Discipline 02",
    title: "Interiors & Turnkey Executions",
    description: "We execute residential and commercial interiors around how you actually live, beginning with an understanding of your life rather than a list of preferences.",
    linkText: "Explore Interiors"
  }
];

// --- FEATURED PORTFOLIO & GALLERY DATASET ---
export const projectsGallery = [
  {
    id: 1,
    title: "The Glass & Concrete Oasis Villa",
    category: "villas",
    categoryLabel: "Luxury Villa",
    location: "Shadnagar, Telangana",
    area: "6,800 sq.ft",
    year: "2024",
    client: "Dr. K. Raghavendra Rao",
    image: "/assets/images/hero1.jpg",
    gallery: [
      "/assets/images/hero1.jpg",
      "/assets/images/hero2.jpg",
      "/assets/images/capability_architecture.jpg"
    ],
    scope: "Architectural 3D Design, RCC Structural Framework & Turnkey Execution",
    description: "A contemporary multi-level luxury residence featuring cantilevered concrete volumes, double-height glazing, and climate-responsive courtyard zoning.",
    featured: true
  },
  {
    id: 2,
    title: "Sovereign Heights Corporate Hub",
    category: "commercial",
    categoryLabel: "Commercial HQ",
    location: "Ranga Reddy District, Telangana",
    area: "32,000 sq.ft",
    year: "2023",
    client: "Green Meadows Enterprises",
    image: "/assets/images/hero3.jpg",
    gallery: [
      "/assets/images/hero3.jpg",
      "/assets/images/capability_construction.jpg"
    ],
    scope: "Master Planning, Municipal Approvals, Heavy RCC Engineering & Glass Facade",
    description: "A flagship 5-story commercial development engineered for high footfall traffic with energy-efficient daylighting fins and subterranean parking.",
    featured: true
  },
  {
    id: 3,
    title: "Minimalist Marble & Timber Duplex",
    category: "interiors",
    categoryLabel: "Bespoke Interiors",
    location: "Farooqnagar / Shadnagar",
    area: "4,200 sq.ft",
    year: "2024",
    client: "Farhan Residence",
    image: "/assets/images/hero2.jpg",
    gallery: [
      "/assets/images/hero2.jpg",
      "/assets/images/capability_interior_design.jpg"
    ],
    scope: "Full-Scope Interior Architecture, Custom Joinery & Architectural Lighting",
    description: "Bespoke interior fit-out featuring imported Statuario marble flooring, concealed linear LED acoustics, and in-house fabricated veneer millwork.",
    featured: true
  },
  {
    id: 4,
    title: "The Courtyard Country Farmhouse",
    category: "farmhouses",
    categoryLabel: "Country Farmhouse",
    location: "Telangana Rural Belt",
    area: "8,500 sq.ft (3-Acre Estate)",
    year: "2023",
    client: "Ch. Anjaneyulu Estate",
    image: "/assets/images/hero4.jpg",
    gallery: [
      "/assets/images/hero4.jpg",
      "/assets/images/about_hero.jpg"
    ],
    scope: "Site Microclimate Planning, Landscape Architecture & Rustic-Modern Construction",
    description: "A tranquil private weekend retreat built with exposed brick, steel pergolas, and passive natural cross-ventilation overlooking expansive gardens.",
    featured: true
  },
  {
    id: 5,
    title: "Apex Plaza & Commercial Showrooms",
    category: "commercial",
    categoryLabel: "Commercial Retail",
    location: "Main Road, Shadnagar",
    area: "18,500 sq.ft",
    year: "2022",
    client: "Apex Commercial Group",
    image: "/assets/images/capability_construction.jpg",
    gallery: [
      "/assets/images/capability_construction.jpg",
      "/assets/images/hero3.jpg"
    ],
    scope: "Turnkey Contracting, Fire Safety, MEP & Structural Seismic Design",
    description: "High-visibility retail complex designed to maximize storefront display frontage and seamless customer circulation.",
    featured: false
  },
  {
    id: 6,
    title: "Contemporary Villa Royale",
    category: "villas",
    categoryLabel: "Luxury Villa",
    location: "Shadnagar Enclave",
    area: "5,400 sq.ft",
    year: "2023",
    client: "Private Client",
    image: "/assets/images/capability_architecture.jpg",
    gallery: [
      "/assets/images/capability_architecture.jpg",
      "/assets/images/hero1.jpg"
    ],
    scope: "Architectural 3D Renders, Vastu Spatial Planning & Turnkey Build",
    description: "Luxurious 4BHK duplex villa designed strictly around solar orientation and Vastu principles with a private terrace lounge.",
    featured: false
  },
  {
    id: 7,
    title: "Executive Penthouse Suite & Lounge",
    category: "interiors",
    categoryLabel: "Bespoke Interiors",
    location: "Shadnagar",
    area: "3,100 sq.ft",
    year: "2024",
    client: "Corporate Executive",
    image: "/assets/images/capability_interior_design.jpg",
    gallery: [
      "/assets/images/capability_interior_design.jpg",
      "/assets/images/hero2.jpg"
    ],
    scope: "Turnkey Modular Kitchen, Walk-In Wardrobes & Italian Lighting Design",
    description: "Modern penthouse interior showcasing acoustic paneling, matte charcoal modular kitchen islands, and smart ambient lighting automation.",
    featured: false
  },
  {
    id: 8,
    title: "Turnkey Gated Community Development",
    category: "turnkey",
    categoryLabel: "Turnkey Project",
    location: "Ranga Reddy District",
    area: "120,000 sq.ft Township",
    year: "2023",
    client: "Buildscape Township Development",
    image: "/assets/images/capability_turnkey.jpg",
    gallery: [
      "/assets/images/capability_turnkey.jpg",
      "/assets/images/hero4.jpg"
    ],
    scope: "End-to-End General Contracting, Road Infrastructure & Villa Construction",
    description: "Single-point execution encompassing land appraisal, municipal approvals, RCC construction, and final landscape delivery.",
    featured: true
  },
  {
    id: 9,
    title: "Grand Horizon Duplex Residence",
    category: "villas",
    categoryLabel: "Luxury Villa",
    location: "Shadnagar, Telangana",
    area: "4,800 sq.ft",
    year: "2024",
    client: "Prestige Living Group",
    image: "/assets/images/about_hero.jpg",
    gallery: [
      "/assets/images/about_hero.jpg",
      "/assets/images/hero1.jpg"
    ],
    scope: "Architectural Space Planning, Structural Engineering & Luxury Interior Finishing",
    description: "An ultra-modern dual-level residential masterpiece designed with floor-to-ceiling glass fenestrations, double-height foyer, and landscaped boundary aesthetics.",
    featured: true
  }
];


// --- TECHNICAL BLUEPRINTS & DRAFTING ASSETS ---
export const technicalBlueprints = [
  {
    id: "floor-plans",
    title: "Architectural Floor Plans",
    category: "Architectural",
    image: "/assets/images/First.png",
    specs: ["Comprehensive 2D Spatial Layout", "Door & Window Schedules", "Vastu Axis & Room Dimensioning", "Furniture Zoning Layout"]
  },
  {
    id: "structural-rcc",
    title: "Structural & Column Schedules",
    category: "Engineering",
    image: "/assets/images/Second.png",
    specs: ["RCC Beam & Slab Framing", "Footing & Foundation Analysis", "Seismic Load Distribution", "Reinforcement Rebar Details"]
  },
  {
    id: "elevation-3d",
    title: "3D Exterior Elevation Blueprints",
    category: "3D Elevation",
    image: "/assets/images/Third.png",
    specs: ["Multi-Angle Facade Views", "Material & Texture Finishes", "Exterior Lighting Schedules", "Parapet & Boundary Wall Profiles"]
  },
  {
    id: "interiors-rcp",
    title: "Reflected Ceiling & MEP Plans",
    category: "Interiors & MEP",
    image: "/assets/images/Fourth.png",
    specs: ["Concealed HVAC Ducting", "Electrical & Mood Lighting Points", "Plumbing & Drainage Traps", "Custom False Ceiling Drops"]
  }
];

// --- COST & BUDGET ESTIMATOR CONFIGURATION ---
export const estimatorConfig = {
  typologies: [
    { id: 'residential', name: 'Luxury Villa / Residential', baseRateSqFt: 2200, unit: 'sq.ft' },
    { id: 'commercial', name: 'Commercial Complex / Office', baseRateSqFt: 2600, unit: 'sq.ft' },
    { id: 'interior', name: 'High-End Interior Architecture', baseRateSqFt: 1500, unit: 'sq.ft' },
    { id: 'turnkey', name: 'Turnkey Design & Build (Full EPC)', baseRateSqFt: 3100, unit: 'sq.ft' }
  ],
  qualityMultipliers: {
    standard: { name: 'Standard Grade', mult: 1.0, desc: 'Quality vitrified tiles, standard CP fittings, ISI structural steel' },
    premium: { name: 'Premium Luxury', mult: 1.35, desc: 'Italian marble, imported sanitaryware, double-glazed facade, smart automation' },
    ultra: { name: 'Ultra Bespoke', mult: 1.75, desc: 'Custom stone cladding, high-performance acoustic envelope, bespoke joinery & VRV HVAC' }
  }
};

export const designMatrix = {
  formula: ["FUNCTION", "AESTHETICS", "ENGINEERING RIGOR", "SUSTAINABILITY"],
  considerations: [
    { title: "Site-Responsive Microclimate", icon: "Sun" },
    { title: "Space Optimization", icon: "Maximize" },
    { title: "Structural Safety & Longevity", icon: "ShieldCheck" },
    { title: "Vastu Principles (When Required)", icon: "Compass" },
    { title: "Passive Natural Ventilation", icon: "Wind" },
    { title: "Daylight Maximization", icon: "Sparkles" },
    { title: "Material Efficiency", icon: "Layers" },
    { title: "Contemporary Global Trends", icon: "Globe" }
  ]
};

export const operationalStandards = [
  {
    number: "01",
    title: "Quality Uncompromised",
    description: "Rigorous multi-point quality control from foundation testing to final surface handovers."
  },
  {
    number: "02",
    title: "Engineering Rigor",
    description: "Advanced structural analysis, earthquake/load considerations, and strict technical tolerance."
  },
  {
    number: "03",
    title: "Total Transparency",
    description: "Itemized BOQs, regular site logs, clear milestone billings, and zero hidden costs."
  },
  {
    number: "04",
    title: "Timely Project Execution",
    description: "Critical-path scheduling and dynamic resource management ensuring on-time project handovers."
  },
  {
    number: "05",
    title: "Micro-Detail Focus",
    description: "Craftsmanship focused on flawless joinery, MEP concealment, and superior architectural finishes."
  }
];

export const servicePillars = [
  {
    id: "architectural-design",
    pillar: "01",
    title: "Architectural Design",
    image: "/assets/images/capability_architecture.jpg",
    summary: "Conceptualizing context-responsive structures from site analysis to comprehensive municipal approval drawings.",
    services: [
      "Master Planning & Site Analysis",
      "Conceptual 2D & 3D Massing",
      "Photorealistic 3D Elevations",
      "Municipal & Approval Drawings",
      "Comprehensive Working Drawings",
      "Renovation & Adaptive Reuse",
      "Landscape Architecture"
    ]
  },
  {
    id: "engineering-build",
    pillar: "02",
    title: "Engineering & Build",
    image: "/assets/images/capability_construction.jpg",
    summary: "Heavy-duty structural engineering, strict on-site QA supervision, and end-to-end turnkey general contracting.",
    services: [
      "RCC Structural Design & Analysis",
      "Turnkey General Contracting",
      "Project & Construction Management",
      "On-Site Quality Supervision",
      "MEP (Mech, Elec, Plumb) Design",
      "HVAC & Fire Safety Planning",
      "Cost Estimation & BOQ Prep"
    ]
  },
  {
    id: "interior-architecture",
    pillar: "03",
    title: "Interior Architecture",
    image: "/assets/images/capability_interior_design.jpg",
    summary: "Bespoke residential and commercial interior environments crafted with custom joinery and acoustic precision.",
    services: [
      "Bespoke Residential Interiors",
      "Modular Kitchen & Wardrobe Systems",
      "Corporate Office Fit-Outs",
      "Custom Joinery & Millwork",
      "Architectural Lighting Design",
      "Acoustic & Ceiling Layouts",
      "Material & Finish Sourcing"
    ]
  }
];

export const capabilities = [
  {
    id: 1,
    title: "Architectural Design",
    image: "/assets/images/capability_architecture.jpg",
    description: "Good architecture begins long before a drawing is made. It begins with understanding a site, a brief, and the life or work that a building needs to support. Our practice covers luxury homes, villas, apartments, gated communities, commercial complexes, and institutions."
  },
  {
    id: 2,
    title: "Structural Engineering & Build",
    image: "/assets/images/capability_construction.jpg",
    description: "With over 15 years of ground-up construction and RCC structural engineering experience, our site teams work with strict technical tolerances, accountable milestone billing, and uncompromised structural integrity."
  },
  {
    id: 3,
    title: "Interior Architecture",
    image: "/assets/images/capability_interior_design.jpg",
    description: "We design bespoke interiors that harmoniously align with human lifestyle and routine. From luxury villas to corporate headquarters, we deliver custom millwork, mood lighting, and flawless surface finishes."
  },
  {
    id: 4,
    title: "Turnkey Project Execution",
    image: "/assets/images/capability_turnkey.jpg",
    description: "Taking full ownership from raw land to key handover. Single-point accountability managing material sourcing, municipal coordination, on-site supervision, and final warranty delivery."
  }
];

export const projectTypologies = [
  {
    id: "residential",
    category: "Residential Sector",
    badge: "Bespoke Living",
    tagline: "Tailored living environments combining luxury, comfort, and functionality.",
    types: [
      { name: "Luxury Villas", desc: "Expansive private estates designed with bespoke spatial flow and private landscaping." },
      { name: "Independent Houses", desc: "Custom family homes built for multigenerational comfort and climate resilience." },
      { name: "Duplex Residences", desc: "Contemporary vertical living maximizing natural light, ventilation, and double-height volumes." },
      { name: "Country Farmhouses", desc: "Serene weekend getaways harmonizing with rural landscapes and open courtyards." },
      { name: "Gated Apartments", desc: "Master-planned residential communities engineered for premium modern lifestyle." }
    ]
  },
  {
    id: "commercial",
    category: "Commercial & Retail Sector",
    badge: "Productivity & Commerce",
    tagline: "High-traffic, brand-enhancing spaces optimized for productivity and commerce.",
    types: [
      { name: "Corporate Headquarters", desc: "State-of-the-art office spaces designed to foster innovation and corporate prestige." },
      { name: "Retail Flagships & Showrooms", desc: "Immersive commercial environments engineered to maximize customer flow and display." },
      { name: "Commercial Complexes", desc: "Multi-tenant business hubs built with robust RCC engineering and high footfall endurance." },
      { name: "Mixed-Use Developments", desc: "Integrated spaces combining retail, workspaces, and lifestyle amenities." },
      { name: "Hospitality Fit-Outs", desc: "Bespoke restaurants, lounges, and hotels crafted for memorable guest experiences." }
    ]
  }
];

export const technicalDeliverables = [
  { id: 1, name: "Comprehensive Site Plan", category: "Architectural" },
  { id: 2, name: "Architectural Floor Plans", category: "Architectural" },
  { id: 3, name: "3D Exterior Elevation Sets", category: "Architectural" },
  { id: 4, name: "Longitudinal / Cross Sections", category: "Architectural" },
  { id: 5, name: "Detailed Structural Plans", category: "Engineering" },
  { id: 6, name: "Foundation & Column Schedules", category: "Engineering" },
  { id: 7, name: "Electrical & Lighting Layouts", category: "Engineering" },
  { id: 8, name: "Complete Plumbing & Drainage", category: "Engineering" },
  { id: 9, name: "HVAC & Mechanical Layouts", category: "MEP" },
  { id: 10, name: "Landscape Hardscape Plans", category: "Landscape" },
  { id: 11, name: "Millwork & Joinery Details", category: "Interiors" },
  { id: 12, name: "Interior Reflected Ceiling Plans", category: "Interiors" }
];

export const deliveryWorkflow = [
  {
    step: "01",
    title: "CONSULT",
    summary: "Client brief, site appraisal & budget alignment",
    details: "We start by listening to your aspirations, conducting in-depth topographical site visits, assessing orientation, and defining realistic budget parameters."
  },
  {
    step: "02",
    title: "CONCEPT",
    summary: "Zoning, spatial planning & 3D visualizations",
    details: "Translating ideas into functional 2D floor layouts, volume massing, and photorealistic 3D architectural renders."
  },
  {
    step: "03",
    title: "PLANNING",
    summary: "Approval drawings, BOQ & structural coordination",
    details: "Generating comprehensive municipal documentation, detailed structural engineering calculations, and transparent itemized BOQs."
  },
  {
    step: "04",
    title: "BUILD",
    summary: "Turnkey execution & supervised on-site QA",
    details: "Ground-up RCC construction guided by experienced site engineers, milestone-based inspection logs, and critical path scheduling."
  },
  {
    step: "05",
    title: "INTERIORS",
    summary: "Bespoke joinery, lighting & finishing works",
    details: "Precision fit-outs, modular kitchen and wardrobe fabrication, MEP concealment, and architectural lighting integration."
  },
  {
    step: "06",
    title: "HANDOVER",
    summary: "Snag resolution, sign-off & warranty delivery",
    details: "Rigorous final multi-point quality check, snag rectifications, complete documentation handover, and ongoing client warranty backing."
  }
];

export const whyUsItems = [
  {
    id: 1,
    icon: "Users",
    title: "Multidisciplinary Architect & Engineer Team",
    description: "Led directly by Founder Mohammad Khaja Osman, our practice unifies architectural vision, structural engineering rigor, and interior crafting under one roof."
  },
  {
    id: 2,
    icon: "Key",
    title: "Single-Point Accountability from Land to Key",
    description: "No finger-pointing between architects and contractors. We take complete end-to-end responsibility from preliminary sketch to final key handover."
  },
  {
    id: 3,
    icon: "FileSpreadsheet",
    title: "Transparent Costing with Milestone BOQs",
    description: "Itemized BOQs, open billing, and milestone-linked payments ensure clients always have complete financial clarity with zero hidden surprises."
  },
  {
    id: 4,
    icon: "ShieldAlert",
    title: "High-Precision Structural Safety Compliance",
    description: "Advanced structural analysis, seismic load considerations, and rigorous foundation-to-slab testing standards."
  },
  {
    id: 5,
    icon: "Box",
    title: "Cutting-Edge 3D Elevation & Visualization",
    description: "High-fidelity 3D modeling and elevation renderings let you experience and refine every detail before breaking ground."
  },
  {
    id: 6,
    icon: "Layers",
    title: "Premium Custom Interior Joinery Solutions",
    description: "In-house joinery craftsmanship and quality-controlled manufacturing deliver durable luxury millwork and finishes."
  },
  {
    id: 7,
    icon: "CheckCircle2",
    title: "Strict On-Site Quality Assurance Inspections",
    description: "Dedicated project engineers stationed on-site daily, enforcing technical compliance and material verification at every stage."
  },
  {
    id: 8,
    icon: "Clock",
    title: "Schedule-Bound Timely Project Execution",
    description: "Critical-path scheduling and dynamic resource management ensure predictable, on-time project delivery."
  },
  {
    id: 9,
    icon: "Sparkles",
    title: "Value Engineering & Space Optimization",
    description: "Smart architectural design that maximizes usable floor area, natural daylight, and passive cross-ventilation while curbing material waste."
  },
  {
    id: 10,
    icon: "Award",
    title: "Long-Term Client Support & Warranty Backing",
    description: "Our relationship extends beyond handover with structured warranty support and responsive post-occupancy care."
  }
];

export const testimonials = [
  {
    id: 1,
    clientName: "Dr. K. Raghavendra Rao",
    clientTitle: "Managing Director, Sri Krishna Healthcare",
    projectType: "Luxury Villa & Private Estate (6,800 sq.ft)",
    location: "Shadnagar, Telangana",
    rating: 5,
    quote: "Buildscape under Mohammad Khaja Osman's leadership delivered our dream villa with unmatched precision. From the initial 3D elevation drawings to structural RCC casting and final Italian marble finishes, the single-point accountability was a game changer. No hidden costs, completed on schedule.",
    highlight: "Flawless Turnkey Execution & Transparency"
  },
  {
    id: 2,
    clientName: "S. Venkat Reddy",
    clientTitle: "Director, Green Meadows Agro & Warehousing",
    projectType: "Commercial Complex & Corporate Office",
    location: "Ranga Reddy District, Telangana",
    rating: 5,
    quote: "What separates Buildscape from others is their uncompromising engineering rigor. Their structural team designed heavy-duty foundation and column schedules that passed every municipal and load test effortlessly. The milestone billing with itemized BOQs gave our board total financial clarity.",
    highlight: "Engineering Rigor & Strict Compliance"
  },
  {
    id: 3,
    clientName: "Mohammed Farhan & Family",
    clientTitle: "Property Investor",
    projectType: "Contemporary Duplex Residence (4,200 sq.ft)",
    location: "Farooqnagar / Shadnagar",
    rating: 5,
    quote: "The interior architecture and custom joinery Buildscape delivered surpassed our expectations. Every wardrobe, modular kitchen element, and concealed lighting detail was crafted in-house with micro-precision. The natural ventilation and double-height living room feel magnificent.",
    highlight: "Bespoke Interior & Space Optimization"
  },
  {
    id: 4,
    clientName: "Ch. Anjaneyulu",
    clientTitle: "Business Executive",
    projectType: "Country Farmhouse & Eco-Retreat",
    location: "Telangana Rural Belt",
    rating: 5,
    quote: "Their understanding of site-responsive microclimates and Vastu alignment made our farmhouse a serene sanctuary. Their site engineers were present daily, rigorously testing every cement and steel batch. Truly masters of consistency and quality.",
    highlight: "Site-Responsive Design & Quality Control"
  }
];

