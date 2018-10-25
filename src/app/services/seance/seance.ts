import {Injectable} from "@angular/core";

import {Fraction} from "./fraction.interface";


@Injectable({
    providedIn: 'root',
})
export class SeanceFactoryService {

    constructor() {
    }

    create(): Seance{
        return new Seance();
    }
}

export class Seance {
    private fractions: Fraction[] = [];
    private curFractions: Fraction[] = [];

    constructor(){
    }

    pushFraction(fraction: Fraction){
        this.fractions.push(fraction);
    }

    init() {
        this.curFractions = this.fractions.slice();
    }

    public getNextFraction(): Promise<Fraction> {
        return new Promise((resolve, reject) => {
            if (this.curFractions.length == 0) {
                reject("End of seance");
            } else {
                resolve(this.curFractions.shift());
            }
        });
    }

    public getFirstFraction(): Promise<Fraction> {
        return new Promise((resolve, reject) => {
            if (this.fractions.length == 0) {
                reject("Factions is empty");
            } else {
                resolve(this.fractions[0]);
            }
        });
    }

}