export interface ParticipantModel {
  name: string;
  available: boolean;
}

export class Participant {
  name: string;
  available: boolean | undefined;

  constructor(name: string, available?: boolean) {
    this.name = name;
    this.available = available;
  }
}
