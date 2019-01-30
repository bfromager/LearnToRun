export interface Fraction {
    type: "Fraction";
    timeInSecond: number;
    libelle: string;

    waveBegin?: string;
    waveEnd?: string;

    extraVocalBegin?: string;
    extraVocalEnd?: string;
}

export interface Bloc {
    type: "Bloc";
    items: (Fraction | Bloc) [];
    repeat: number;
}
