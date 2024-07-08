import { IMotor } from './motor';
import { IMaterial } from './material';

export class Pump {
  constructor(
    public id: number = 0,
    public name: string = '',
    public maxPressure: number = 0,
    public liquidTemperature: number = 0,
    public weight: number = 0,
    public motorId: number = 0,
    public motor: IMotor = {} as IMotor,
    public bodyMaterialId: number = 0,
    public bodyMaterial: IMaterial = {} as IMaterial,
    public impellerMaterialId: number = 0,
    public impellerMaterial: IMaterial = {} as IMaterial,
    public description: string = '',
    public imageUrl: string = '',
    public price: number = 0
  ) {}
}