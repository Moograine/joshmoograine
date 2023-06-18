export type EventModelType = 'Rehearsal' | 'Concert';

export type AvailabilityStatus = 'available' | 'unavailable' | 'unknown';

export interface ConcertModel {
  date: Date;
  location: string;
  availability: AvailabilityStatus[];
  note: string;
}

export interface RehearsalModel {
  date: Date;
  location: string;
  duration: string;
  availability: AvailabilityStatus[];
  note: string;
}

export class Rehearsal {
  date = new Date;
  location = '';
  duration = '';
  availability: AvailabilityStatus[] = [];
  note: string;

  constructor(date?: Date, location?: string, duration?: string, availability?: AvailabilityStatus[], note?: string) {
    this.date = date || new Date;
    this.location = location || '';
    this.duration = duration || '';
    this.availability = availability || [];
    this.note = note || '';
  }
}

// TODO not used
export class Concert {
  date = new Date;
  location = '';
  availability: AvailabilityStatus[] = [];
  note: string;

  constructor(date?: Date, location?: string, availability?: AvailabilityStatus[], note?: string) {
    this.date = date || new Date;
    this.location = location || '';
    this.availability = availability || [];
    this.note = note || '';
  }
}
