import { Injectable } from '@angular/core';
import { doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cancion } from '../interfaz-Cancion';

import { Album } from '../interfaz_Album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService implements Album {

    id: number;
    nombre: string;
    autor: string;
    img: string;
    playlist: Cancion[];

    constructor( public firestore: Firestore ) {
        this.id = 0,
        this.nombre = 'sinNombre',
        this.autor = 'anonimo',
        this.img = '../../assets/img/Logo.jpeg',
        this.playlist = []
    }

    formAlbum: FormGroup = new FormGroup({
        id: new FormControl(null),
        nombre: new FormControl('', Validators.required),
    });


    agregarAlbum = async ( index: number ) => {

        const indexStr: string = ( index ).toString();

        await setDoc( doc( this.firestore, 'albums', indexStr ), {
          id: ( index ).toString(),
          nombre: this.nombre,
          autor: this.autor,
          img: this.img,
          playlist: this.playlist,
        });

    }

    actualizarImagen = async ( albumRef: string, nuevaUrl: string ) => {

        const album = doc( this.firestore, 'albums', albumRef );

        await updateDoc( album, {
            img: nuevaUrl
        });

    }

    actualizarAlbum = async ( albumSeleccionado: Album, albumActualizado: any ) => {

        //VARIABLES
        const albumRef = albumSeleccionado.id.toString();

        //GRABAMOS EN LA BBDD
        const album = doc( this.firestore, 'albums', albumRef );

        await updateDoc( album, {
            nombre: albumActualizado.nombre,
            autor: albumActualizado.autor
        });

    }

}

//CAMBIAR IMAGEN
