import { TimeFrame } from './time-frame';

export class Participant {
    public id: String;
    public firstName: String;
    public lastName: String;

    constructor(firstName: String, lastName: String) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

}