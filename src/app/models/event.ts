import { Participant } from './participant';

export class Event {
    public id: string;
    public name: String;
    public durationInMinutes: number;
    public participants: Participant[];

    constructor(name: String, durationInMinutes: number, participants: Participant[]) {
        this.name = name;
        this.durationInMinutes = durationInMinutes;
        this.participants = participants;
    }
}
