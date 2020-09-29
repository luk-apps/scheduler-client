import { TimeFrame } from './time-frame';

export class ScheduleParameters {
    public timeStep: number;
    public timeFrames: TimeFrame[];
    public numberOfRooms: number;
    public useLimitedTimeFrames: boolean;
    public maxNumberOfResults: number;

    constructor() {
        this.timeFrames = [];
    }
}