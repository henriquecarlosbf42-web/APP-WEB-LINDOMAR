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

export const CAR_COLORS = [
  "Branco",
  "Prata",
  "Cinza",
  "Preto",
  "Vermelho",
  "Azul",
  "Verde",
  "Amarelo",
  "Marrom",
  "Bege",
  "Dourado",
  "Vinho",
  "Laranja",
];

const CURRENT_YEAR = new Date().getFullYear();
const OLDEST_YEAR = 1960;

export const CAR_YEARS = Array.from(
  { length: CURRENT_YEAR + 1 - OLDEST_YEAR + 1 },
  (_, i) => String(CURRENT_YEAR + 1 - i)
);
