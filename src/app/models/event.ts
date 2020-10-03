import { Participant } from './participant';

export class Event {
    public id: string;
    public name: string;
    public durationInMinutes: number;
    public participants: Participant[];

    constructor(name: string, durationInMinutes: number, participants: Participant[]) {
        this.name = name;
        this.durationInMinutes = durationInMinutes;
        this.participants = participants;
    }
}
