import { Participant } from './participant';

export class Principle {
    public id: string;
    public participant: Participant;
    public startDate: Date;
    public endDate: Date;

    constructor(participant: Participant, startDate: Date, endDate: Date) {
        this.participant = participant;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}