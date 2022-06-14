import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormCancionService } from '../../shared/form-cancion.service';
import { ToastrService } from 'ngx-toastr';

import { Album } from '../../interfaz_Album';
import { Cancion } from '../../interfaz-Cancion';

import { Firestore, collection, onSnapshot, DocumentData } from '@angular/fire/firestore';


@Component({
    selector: 'app-cancion',
    templateUrl: './cancion.component.html',
    styleUrls: ['./cancion.component.css']
})

export class CancionComponent implements OnChanges {

    @Input('albumSeleccionado') albumSeleccionado!: Album;
    @Input('cancionSeleccionada') cancionSeleccionada!: Cancion;

    readMode: string = 'list';
    readModes: string[] = ['list', 'onePage'];
    addNewSong: boolean = false;
    cancionIndefinida!: Cancion;
    loading: boolean = false;

    constructor( firestore: Firestore,
                 public songService: FormCancionService,
                 private toastr: ToastrService ) {

        this.reloadComponent( firestore );

    }

    ngOnChanges(changes: SimpleChanges): void {

        if( changes['albumSeleccionado'] ){
            if(changes['albumSeleccionado'].currentValue !== changes['albumSeleccionado'].previousValue ){
                this.cancionSeleccionada = this.cancionIndefinida;
                this.addNewSong = false;
            }
        }

        if( changes['cancionSeleccionada'] ) {
            this.addNewSong = false;
        }

        if( changes['hasChange'] ) {
            console.log('Han habido cambios desde Detalle-Canción component')
        }

    }

    reloadComponent = ( firestore: Firestore  ) => {


        const queryResult = collection( firestore, 'albums' );

        onSnapshot( queryResult , ( querySnapshot ) => {
            const listaAlbums: DocumentData[] = [];

            querySnapshot.forEach((doc) => {
                listaAlbums.push( doc.data() );

            })

            listaAlbums.forEach( (album) => {

                const newAlbum = album as Album;

                if( this.albumSeleccionado.id == newAlbum.id ){

                    newAlbum.playlist.forEach( (cancion) => {

                        if( this.cancionSeleccionada.id == cancion.id ) {
                            this.cancionSeleccionada = cancion;
                        } //end if

                    }); //end foreach

                } //end if

            }) //end foreach

        });

    }

    changeAddNewSong(): void {
        this.addNewSong = true;
    }

    saveSong():void {

        this.loading = true;
        let result: Promise<void>;
        const inputSong = this.songService.formSave.value;

        result = this.songService.agregarCancion( this.albumSeleccionado, inputSong );

        result
            .then(() => {
                this.addNewSong = false;
                this.loading = false;
                this.toastr.success('Canción agregada/modificada con exito.', 'Canción registrada');
            })
            .catch(() => {
                this.loading = false;
                this.toastr.error('La canción no pudo ser agregada/modificada. Por favor, revisa tu conexión a internet.', 'Error');
            })

    }

    updateSong():void {

        this.loading = true;
        let result: Promise<void>;
        const inputSong = this.songService.formUpdate.value;

        result = this.songService.actualizarCancion( this.albumSeleccionado, inputSong );

        result
            .then(() => {
                this.addNewSong = false;
                this.loading = false;
                this.toastr.success('Canción agregada/modificada con exito.', 'Canción registrada');
            })
            .catch(() => {
                this.loading = false;
                this.toastr.error('La canción no pudo ser agregada/modificada. Por favor, revisa tu conexión a internet.', 'Error');
            })

    }

    cancelAddNewSong(): void {
        this.addNewSong = false;
    }

}


// if( inputSong.id == null ){
//   result = this.songService.agregarCancion( this.albumSeleccionado, inputSong );
// } else {
//   result = this.songService.actualizarCancion( this.albumSeleccionado, inputSong );
// }

// updateSong():void {
//     this.loading = true;
//     const inputSong = this.songService.form.value;
//     const result = this.songService.actualizarCancion( this.albumSeleccionado, inputSong );

//     result
//     .then(() => {
//         this.toastr.success('Canción actualizada correctamente.', 'Canción actualizada');
//         this.loading = false;
//     })
//     .catch(() => {
//         this.toastr.error('La canción no pudo ser actualizada. Por favor, revisa tu conexión a internet.', 'Error');
//         this.loading = false;
//     })

// }
