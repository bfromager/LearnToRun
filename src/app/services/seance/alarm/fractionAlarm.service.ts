import {Injectable} from "@angular/core";
import {AlarmService, AlarmType} from "./alarm.service";
import {Fraction} from "../seance.interface";

@Injectable({
    providedIn: 'root',
})
export class FractionAlarmService {
    constructor(private alarm: AlarmService) {
    }

    beginAlarm(fraction: Fraction){
        this.alarm.trigger({type:AlarmType.WAVE, path: fraction.waveBegin});
        this.alarm.trigger({type:AlarmType.VOCAL, msg: fraction.libelle});
        this.alarm.trigger({type:AlarmType.VOCAL, msg: this.getSecondsAsText(fraction.timeInSecond)});
    }


    getSecondsAsText(inputSeconds: number): string {
        var hours = Math.floor(inputSeconds / 3600);
        var minutes = Math.floor((inputSeconds - (hours * 3600)) / 60);
        var seconds = inputSeconds - (hours * 3600) - (minutes * 60);
        var hoursString = '';
        var minutesString = '';
        var secondsString = '';

        if (hours > 0) {
            hoursString = hours.toString() + " heure" + (hours > 1 ? "s " : " ");
        }
        if (minutes > 0) {
            minutesString = minutes.toString();
            if ((hours == 0) || (seconds > 0)) {
                minutesString += " minute" + (minutes > 1 ? "s " : " ");
            };
        }
        if (seconds > 0) {
            secondsString = seconds.toString();
            if ((minutes == 0) || (hours > 0))
                secondsString += " seconde" + (seconds > 1 ? "s " : " ");
        }

        return (hoursString + minutesString + secondsString).trim();
    }

}

