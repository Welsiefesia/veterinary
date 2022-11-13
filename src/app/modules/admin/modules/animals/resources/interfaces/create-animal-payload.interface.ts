export interface CreateAnimalPayloadInterface {
  name: string;
  gender: string;
  birthDate: string;
  weightKg: number;
  neutered: boolean;
  ownerId: string;
  speciesId: number;
}
