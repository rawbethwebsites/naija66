export type GeopoliticalZone =
  | "south-west"
  | "south-south"
  | "south-east"
  | "north-central"
  | "north-west"
  | "north-east";

export interface NigeriaState {
  name: string;
  code: string;
  zone: GeopoliticalZone;
  capital: string;
}

export const ZONES: Record<
  GeopoliticalZone,
  { label: string; color: string; active: boolean }
> = {
  "south-west": {
    label: "South West",
    color: "#F4A900",
    active: true,
  },
  "south-south": {
    label: "South South",
    color: "#0A6847",
    active: true,
  },
  "south-east": {
    label: "South East",
    color: "#E85D4A",
    active: false,
  },
  "north-central": {
    label: "North Central",
    color: "#11A87A",
    active: false,
  },
  "north-west": {
    label: "North West",
    color: "#FFD166",
    active: false,
  },
  "north-east": {
    label: "North East",
    color: "#8B5CF6",
    active: false,
  },
};

export const STATES: NigeriaState[] = [
  // South West
  { name: "Lagos", code: "LA", zone: "south-west", capital: "Ikeja" },
  { name: "Ogun", code: "OG", zone: "south-west", capital: "Abeokuta" },
  { name: "Oyo", code: "OY", zone: "south-west", capital: "Ibadan" },
  { name: "Osun", code: "OS", zone: "south-west", capital: "Osogbo" },
  { name: "Ondo", code: "ON", zone: "south-west", capital: "Akure" },
  { name: "Ekiti", code: "EK", zone: "south-west", capital: "Ado-Ekiti" },
  // South South
  { name: "Edo", code: "ED", zone: "south-south", capital: "Benin City" },
  { name: "Delta", code: "DE", zone: "south-south", capital: "Asaba" },
  { name: "Bayelsa", code: "BY", zone: "south-south", capital: "Yenagoa" },
  { name: "Rivers", code: "RI", zone: "south-south", capital: "Port Harcourt" },
  { name: "Akwa Ibom", code: "AK", zone: "south-south", capital: "Uyo" },
  { name: "Cross River", code: "CR", zone: "south-south", capital: "Calabar" },
  // South East
  { name: "Anambra", code: "AN", zone: "south-east", capital: "Awka" },
  { name: "Enugu", code: "EN", zone: "south-east", capital: "Enugu" },
  { name: "Imo", code: "IM", zone: "south-east", capital: "Owerri" },
  { name: "Abia", code: "AB", zone: "south-east", capital: "Umuahia" },
  { name: "Ebonyi", code: "EB", zone: "south-east", capital: "Abakaliki" },
  // North Central
  { name: "Kwara", code: "KW", zone: "north-central", capital: "Ilorin" },
  { name: "Kogi", code: "KO", zone: "north-central", capital: "Lokoja" },
  { name: "Plateau", code: "PL", zone: "north-central", capital: "Jos" },
  { name: "Nasarawa", code: "NA", zone: "north-central", capital: "Lafia" },
  { name: "Benue", code: "BE", zone: "north-central", capital: "Makurdi" },
  { name: "Niger", code: "NI", zone: "north-central", capital: "Minna" },
  { name: "FCT", code: "FC", zone: "north-central", capital: "Abuja" },
  // North West
  { name: "Sokoto", code: "SO", zone: "north-west", capital: "Sokoto" },
  { name: "Kebbi", code: "KB", zone: "north-west", capital: "Birnin Kebbi" },
  { name: "Zamfara", code: "ZA", zone: "north-west", capital: "Gusau" },
  { name: "Katsina", code: "KT", zone: "north-west", capital: "Katsina" },
  { name: "Kano", code: "KN", zone: "north-west", capital: "Kano" },
  { name: "Jigawa", code: "JI", zone: "north-west", capital: "Dutse" },
  { name: "Kaduna", code: "KD", zone: "north-west", capital: "Kaduna" },
  // North East
  { name: "Bauchi", code: "BA", zone: "north-east", capital: "Bauchi" },
  { name: "Gombe", code: "GO", zone: "north-east", capital: "Gombe" },
  { name: "Yobe", code: "YO", zone: "north-east", capital: "Damaturu" },
  { name: "Borno", code: "BO", zone: "north-east", capital: "Maiduguri" },
  { name: "Adamawa", code: "AD", zone: "north-east", capital: "Yola" },
  { name: "Taraba", code: "TA", zone: "north-east", capital: "Jalingo" },
];
