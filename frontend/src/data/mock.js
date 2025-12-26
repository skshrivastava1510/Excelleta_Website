// CostGenie Landing Page Mock Data

export const heroData = {
  headline: "Quote Faster. Cost Smarter. Win More Deals.",
  subtext: "A complete costing and quotation platform built for engineering & manufacturing businesses. Generate accurate, detailed quotes in minutes—based on processes, materials, tooling, overheads, and margins.",
  primaryCta: "Request a Demo",
  secondaryCta: "See How It Works",
  trustBadges: [
    "Trusted by leading manufacturers",
    "Accurate costing across processes",
    "Built for engineering complexity"
  ]
};

export const problemData = {
  heading: "Manual costing kills margins.",
  painPoints: [
    { icon: "FileSpreadsheet", text: "Excel-based cost sheets cause costly errors" },
    { icon: "AlertTriangle", text: "Overheads and wastage often missed" },
    { icon: "TrendingDown", text: "Wrong margins = lost profits or lost deals" },
    { icon: "Clock", text: "Quotation process takes too long" }
  ]
};

export const featuresSteps = [
  {
    id: 1,
    title: "Material Costing",
    description: "Scrap and yield included, auto rate library for instant calculations",
    icon: "Layers"
  },
  {
    id: 2,
    title: "Process Costing",
    description: "Stamping, fabrication, welding, machining, bending, heat treatment—all covered",
    icon: "Cog"
  },
  {
    id: 3,
    title: "Tooling & Development",
    description: "Die cost amortization, tooling lifecycle tracking, trial costs",
    icon: "Wrench"
  },
  {
    id: 4,
    title: "Overheads & Profit",
    description: "Fixed + variable OH, packaging, logistics, customizable margin models",
    icon: "Calculator"
  },
  {
    id: 5,
    title: "Quote Builder",
    description: "Professional quote formats, one-click export to PDF/Excel",
    icon: "FileText"
  }
];

export const featureCards = [
  { icon: "Workflow", title: "Process-based cost models", description: "Tailored costing for every manufacturing process" },
  { icon: "ListTree", title: "BOM + routing support", description: "Full bill of materials and routing integration" },
  { icon: "GitBranch", title: "Version control", description: "Track changes across cost sheet revisions" },
  { icon: "Users", title: "Vendor rate library", description: "Centralized purchase rates from all vendors" },
  { icon: "FileStack", title: "Quotation templates", description: "Pre-built templates for faster quotes" },
  { icon: "CheckSquare", title: "Approval workflows", description: "Multi-level approvals for compliance" },
  { icon: "Building2", title: "Multi-plant costing", description: "Unified costing across locations" },
  { icon: "Plug", title: "ERP integration ready", description: "SAP, Zoho, Tally, and custom APIs" }
];

export const benefitsData = [
  { value: 60, suffix: "%", label: "Reduce quote time" },
  { value: 40, suffix: "%", label: "Improve costing accuracy" },
  { value: 90, suffix: "%", label: "Margin leakages reduced" },
  { value: 100, suffix: "%", label: "Process standardization" }
];

export const industriesData = [
  { icon: "Car", title: "Automotive Suppliers", description: "Tier 1/2/3 component manufacturers" },
  { icon: "Factory", title: "Fabrication Shops", description: "Custom metal fabrication" },
  { icon: "Layers", title: "Sheet Metal Components", description: "Precision sheet metal work" },
  { icon: "Hammer", title: "Tooling & Die Makers", description: "Tool & die manufacturing" },
  { icon: "Briefcase", title: "Contract Manufacturers", description: "Job shops & contract work" },
  { icon: "Truck", title: "Heavy Equipment", description: "Earthmoving & construction" }
];

export const workflowSteps = [
  { step: "RFQ", description: "Receive customer request" },
  { step: "Cost Sheet", description: "Build detailed costing" },
  { step: "Review", description: "Internal validation" },
  { step: "Quote", description: "Generate quotation" },
  { step: "Customer", description: "Send to customer" },
  { step: "Win Deal", description: "Close the order" }
];

export const securityFeatures = [
  { icon: "Lock", title: "Data Encryption", description: "Enterprise-grade AES-256" },
  { icon: "Shield", title: "Role-based Access", description: "Granular permissions" },
  { icon: "FileSearch", title: "Audit Logs", description: "Complete activity tracking" },
  { icon: "Cloud", title: "Deployment Options", description: "On-prem or cloud" },
  { icon: "Webhook", title: "Integration APIs", description: "RESTful API access" }
];

export const testimonials = [
  {
    quote: "CostGenie reduced our quotation time from 3 days to 3 hours. The accuracy improvement has directly impacted our win rate.",
    author: "Rajesh Kumar",
    role: "VP Operations",
    company: "AutoParts India Ltd"
  },
  {
    quote: "Finally, a costing tool that understands manufacturing complexity. The process-based models are exactly what we needed.",
    author: "Sarah Chen",
    role: "Costing Manager",
    company: "Precision Fab Co."
  },
  {
    quote: "We standardized costing across 4 plants in 2 months. The ROI was visible within the first quarter.",
    author: "Michael Torres",
    role: "CFO",
    company: "MetalWorks Global"
  }
];

export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Benefits", href: "#benefits" },
  { label: "Industries", href: "#industries" },
  { label: "Security", href: "#security" }
];
