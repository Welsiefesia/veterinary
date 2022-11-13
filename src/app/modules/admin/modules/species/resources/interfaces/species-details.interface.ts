import { Species } from './species.interface';
import { Specialization } from './specialization.interface';

export interface SpeciesDetails extends Species {
  specialization: Specialization;
  pets: [
    {
      id: number;
      name: string;
      gender: string;
      birthDate: string;
      weightKg: number;
      neutered: boolean;
    }
  ];
}
