import { Cancion } from './interfaz-Cancion';

export interface Album {

    id        : number;
    nombre    : string;
    autor     : string;
    img       : string;
    playlist  : Cancion[];

}
