import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import { Album } from '../interfaz_Album';
import { Cancion } from '../interfaz-Cancion';

@Injectable({
  providedIn: 'root'
})
export class FormCancionService {

    constructor( public firestore: Firestore ) { }

    formSave: FormGroup = new FormGroup({
        id: new FormControl(null), //Ok
        titulo: new FormControl('', Validators.required), //Ok
        artista: new FormControl('', Validators.required), //Ok
        ano: new FormControl(''), //Ok
        album: new FormControl(''), //Ok
        genero: new FormControl('', Validators.required), //Ok
        biografia: new FormControl(''), //Ok
        src: new FormControl('', Validators.required), //Ok
        type: new FormControl('audio/mp3')
    });

    formUpdate: FormGroup = new FormGroup({
        id: new FormControl(null), //Ok
        titulo: new FormControl('', Validators.required), //Ok
        artista: new FormControl('', Validators.required), //Ok
        ano: new FormControl(''), //Ok
        album: new FormControl(''), //Ok
        genero: new FormControl('', Validators.required), //Ok
        biografia: new FormControl(''), //Ok
        src: new FormControl('', Validators.required), //Ok
        type: new FormControl('audio/mp3')
    });

    agregarCancion = async ( album: Album, nuevaCancion: Cancion ) => {

        //VARIABLES
        let songIndex;
        const albumRef = album.id.toString();

        //ASIGNAMOS ID
        songIndex = album.playlist.length + 1;
        nuevaCancion.id = songIndex;

        //GRABAMOS EN LA BBDD
        const playlistRef = doc( this.firestore, 'albums', albumRef );
        await updateDoc( playlistRef, {
            playlist: arrayUnion( nuevaCancion )
        });

    }

    actualizarCancion = async ( album: Album, cancionActualizada: any ) => {

        //VARIABLES
        const albumRef = album.id.toString();

        //ASIGNAMOS NUEVAS VARIABLES
        const songIndex = parseInt( cancionActualizada.id ) - 1;
        album.playlist[songIndex] = cancionActualizada;

        //GRABAMOS EN LA BBDD
        const playlistRef = doc( this.firestore, 'albums', albumRef );

        await updateDoc( playlistRef, {
            playlist: album.playlist
        });

    }


}
