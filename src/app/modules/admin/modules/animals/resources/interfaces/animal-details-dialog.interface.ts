import { AnimalsInterface } from './animals.interface';

export interface AnimalDetailsDialogInterface extends AnimalsInterface {
  owner: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  species: {
    id: number;
    name: string;
  };
}
