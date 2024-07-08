export interface IPumpRQ {
  id: number;
  name: string;
  maxPressure: number;
  liquidTemperature: number;
  weight: number;
  motorId: number;
  bodyMaterialId: number;
  impellerMaterialId: number;
  description?: string | null;
  imageUrl?: string | null;
  image?: File | null;
  price: number;
}
