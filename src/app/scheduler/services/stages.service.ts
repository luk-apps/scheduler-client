import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StagesService {

    public readonly stages = [
        '/scheduler/start',
        '/scheduler/participants',
        '/scheduler/events',
        '/scheduler/generate_schedule',
        '/scheduler/results'
    ]

    constructor() {}

    getNextStage(stage: String) {
        var i = this.stages.findIndex(e => e == stage);
        var nextStage = this.stages[i + 1];
        if(nextStage)
            return nextStage;
        else return null;
    }

    getPrevStage(stage: String) {
        var i = this.stages.findIndex(e => e == stage);
        var nextStage = this.stages[i - 1];
        if(nextStage)
            return nextStage;
        else return null;
    }

    isFirstStage(stage: string): boolean {
        return stage == this.stages[0];
    }

    isLastStage(stage: string): boolean {
        return stage == this.stages[this.stages.length - 1];
    }
}