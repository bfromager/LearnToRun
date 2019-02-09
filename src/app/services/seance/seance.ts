import {Injectable} from "@angular/core";

import {Bloc, Fraction, SeanceInterface} from "./seance.interface";


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
    // private _fractions: Fraction[] = [];
    private name: string = "Nouvelle séance";
    private bloc: Bloc = {
        type: "Bloc",
        items: [],
        repeat: 1,
        nesting: 0
    }

    private fractions: Fraction[] = [];

    constructor(){
    }

    getName() {
        return this.name;
    }
    setName(name: string) {
        this.name = name;
    }

    init() {
        // this.fractions = this._fractions.slice();
        this.fractions = [];
        this.pushBloc(this.bloc);
    }

    private pushBloc(bloc: Bloc) {
        for (let i=0; i < bloc.repeat; ++i) {
            for (let item of bloc.items) {
                if (item.type === "Bloc") {
                    this.pushBloc(<Bloc>item);
                } else {
                    this.fractions.push(item);
                }
            }
        }
    }

    public getRootBloc() : Bloc {
        return this.bloc;
    }

    public addFraction(fraction: Fraction, bloc: Bloc){
        // this._fractions.push(fraction);
        bloc.items.push(fraction);
    }

    public addBloc(bloc: Bloc): Bloc{
        let result: Bloc = {
            type: "Bloc",
            items: [],
            repeat: 1,
            nesting: bloc.nesting + 1
        }
        bloc.items.push(result);
        return result;
    }

    public del(bloc: Bloc, index: number) {
        if ((index > -1) &&  (index < bloc.items.length)) {
            bloc.items.splice(index, 1);
        }
    }

    public reorder(bloc: Bloc, from: number, to: number) {
        const itemToMove = bloc.items.splice(from, 1)[0];
        bloc.items.splice(to, 0, itemToMove);
    }

    saveToInterface(): SeanceInterface {
        console.log (this.name);
        let seanceInterface: SeanceInterface = {
            name: this.name,
            bloc: this.bloc
        };
        return seanceInterface;
    }

    loadFromInterface(seanceInterface: SeanceInterface) {
        this.name = seanceInterface.name;
        this.bloc = seanceInterface.bloc;
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

    public getFirstFraction(): Promise<Fraction> {
        return new Promise((resolve, reject) => {
            this.init();
            if (this.fractions.length == 0) {
                reject("Factions is empty");
            } else {
                resolve(this.fractions[0]);
            }
        });
    }

}