export interface Candidat {
    id?: number;
    firstname: string;
    lastname: string;
    email: string;
    birthday?: string;
    missions?: Mission[];
    nb_missions?: number;
    role?: string;
}

export interface Administrator extends Candidat { }
