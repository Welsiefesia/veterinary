export interface VisitInterface {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  diagnosis: string;
  recommendations: string;
  procedures: [
    {
      id: number;
      name: string;
      description: string;
    }
  ];
}
