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

    constructor(){
    }

    getFractions() {
        return this.fractions;
    }

    public getNextFraction(): Promise<Fraction> {
        return new Promise((resolve, reject) => {
            if (this.fractions.length == 0) {
                reject("End of seance");
            } else {
                resolve(this.fractions.shift());
            }
        });
    }

}