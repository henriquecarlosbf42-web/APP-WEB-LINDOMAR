export const CAR_BRANDS: { brand: string; models: string[] }[] = [
  {
    brand: "Volkswagen",
    models: ["Gol", "Voyage", "Polo", "Virtus", "T-Cross", "Nivus", "Saveiro", "Fox", "Up!", "Jetta", "Amarok", "Golf", "Fusca"],
  },
  {
    brand: "Chevrolet",
    models: ["Onix", "Onix Plus", "Prisma", "Cruze", "Tracker", "S10", "Spin", "Cobalt", "Celta", "Corsa", "Astra", "Vectra", "Montana"],
  },
  {
    brand: "Fiat",
    models: ["Mobi", "Argo", "Cronos", "Pulse", "Fastback", "Toro", "Strada", "Palio", "Siena", "Uno", "Punto", "Fiorino", "Doblò"],
  },
  {
    brand: "Ford",
    models: ["Ka", "Ka Sedan", "EcoSport", "Fiesta", "Focus", "Ranger", "Fusion", "Territory", "Edge", "Maverick"],
  },
  {
    brand: "Toyota",
    models: ["Corolla", "Corolla Cross", "Yaris", "Etios", "Hilux", "SW4", "RAV4"],
  },
  {
    brand: "Honda",
    models: ["Civic", "City", "Fit", "HR-V", "WR-V", "CR-V"],
  },
  {
    brand: "Hyundai",
    models: ["HB20", "HB20S", "Creta", "Tucson", "Santa Fe", "i30", "HB20X"],
  },
  {
    brand: "Renault",
    models: ["Kwid", "Sandero", "Logan", "Duster", "Captur", "Oroch", "Fluence", "Stepway"],
  },
  {
    brand: "Nissan",
    models: ["March", "Versa", "Kicks", "Sentra", "Frontier"],
  },
  {
    brand: "Jeep",
    models: ["Renegade", "Compass", "Commander", "Wrangler"],
  },
  {
    brand: "Peugeot",
    models: ["208", "2008", "3008", "308", "Partner"],
  },
  {
    brand: "Citroën",
    models: ["C3", "C4 Cactus", "C4 Lounge", "Aircross"],
  },
  {
    brand: "Mitsubishi",
    models: ["L200 Triton", "Pajero", "ASX", "Outlander", "Eclipse Cross"],
  },
  {
    brand: "Kia",
    models: ["Sportage", "Cerato", "Sorento", "Stonic", "Picanto"],
  },
  {
    brand: "BMW",
    models: ["Série 1", "Série 3", "Série 5", "X1", "X3", "X5"],
  },
  {
    brand: "Mercedes-Benz",
    models: ["Classe A", "Classe C", "Classe E", "GLA", "GLC", "Sprinter"],
  },
  {
    brand: "Audi",
    models: ["A3", "A4", "Q3", "Q5"],
  },
  {
    brand: "Volvo",
    models: ["XC40", "XC60", "XC90", "S60"],
  },
  {
    brand: "Land Rover",
    models: ["Discovery", "Discovery Sport", "Range Rover", "Range Rover Evoque", "Defender"],
  },
  {
    brand: "Suzuki",
    models: ["Vitara", "Jimny", "S-Cross"],
  },
  {
    brand: "Chery",
    models: ["Tiggo 5x", "Tiggo 7", "Tiggo 8", "Arrizo 6"],
  },
  {
    brand: "GWM",
    models: ["Haval H6", "Ora 03", "Poer"],
  },
  {
    brand: "BYD",
    models: ["Dolphin", "Song Plus", "Yuan Plus", "Seal"],
  },
  {
    brand: "RAM",
    models: ["1500", "2500", "Rampage"],
  },
  {
    brand: "Troller",
    models: ["T4", "Pantanal"],
  },
];

export const CAR_BRAND_NAMES = CAR_BRANDS.map((b) => b.brand);

export function modelsForBrand(brand: string): string[] {
  return CAR_BRANDS.find((b) => b.brand === brand)?.models ?? [];
}

export const CAR_COLORS: { name: string; hex: string }[] = [
  { name: "Branco", hex: "#F2F2EF" },
  { name: "Prata", hex: "#B7BCC0" },
  { name: "Cinza", hex: "#6E747A" },
  { name: "Preto", hex: "#191B1E" },
  { name: "Vermelho", hex: "#B4231E" },
  { name: "Vinho", hex: "#6C1F28" },
  { name: "Azul", hex: "#1F4C8C" },
  { name: "Azul claro", hex: "#7FA3C4" },
  { name: "Verde", hex: "#2C5B43" },
  { name: "Bege", hex: "#C9B79A" },
  { name: "Marrom", hex: "#5A4232" },
  { name: "Amarelo", hex: "#D9A81C" },
  { name: "Dourado", hex: "#B8963E" },
  { name: "Laranja", hex: "#C96218" },
];

export const CAR_COLOR_NAMES = CAR_COLORS.map((c) => c.name);

export function hexForColorName(name: string): string | null {
  return CAR_COLORS.find((c) => c.name === name)?.hex ?? null;
}

export const PAINT_FINISHES: { value: string; description: string }[] = [
  { value: "Sólida", description: "Cor lisa, sem brilho metálico." },
  { value: "Metálica", description: "Tem partículas que brilham no sol." },
  { value: "Perolizada", description: "Muda de tom conforme o ângulo." },
  { value: "Não sei", description: "A oficina identifica na hora." },
];

const CURRENT_YEAR = new Date().getFullYear();
const OLDEST_YEAR = 1960;

export const CAR_YEARS = Array.from(
  { length: CURRENT_YEAR + 1 - OLDEST_YEAR + 1 },
  (_, i) => String(CURRENT_YEAR + 1 - i)
);
