import { Component, Input, Output, EventEmitter, ElementRef, ViewChildren, QueryList, OnChanges, SimpleChanges } from '@angular/core';
import { Album } from '../../interfaz_Album';
import { Cancion } from '../../interfaz-Cancion';

import { Firestore, collection, onSnapshot, DocumentData } from '@angular/fire/firestore';


@Component({
  selector: 'app-lista-canciones',
  templateUrl: './lista-canciones.component.html',
  styleUrls: ['./lista-canciones.component.css']
})

export class ListaCancionesComponent implements OnChanges {

    // --------------- CLASS VARIABLES --------------- //

    public static disabledColor: string = '#9B9B9B';
    public static yellowColor: string = '#daa520';
    public static redGranateColor: string = '#f55050e5';

    @Input('albumSeleccionado') albumSeleccionado!: Album;
    @Input('cancionSeleccionada') cancionSeleccionada!: Cancion;
    @Output() enviarCancionSeleccionada = new EventEmitter();

    @ViewChildren('textSongSelected') textSongsItems!: QueryList<ElementRef<HTMLElement>>;


    colorCancionSeleccionada: string = ListaCancionesComponent.yellowColor;
    optionSort: { order: string } = { order: 'default' }
    // optionSort: { property: string | null, order: string } = { property: null, order: 'default' }

    // ---------------- CONSTRUCTOR ----------------- //
    constructor( firestore: Firestore ) {

        this.reloadComponent( firestore );

    }

    ngOnChanges(changes: SimpleChanges): void {

        if( changes['cancionSeleccionada'] ){
            if(changes['cancionSeleccionada'].currentValue !== changes['cancionSeleccionada'].previousValue ){

                this.textSongsItems.forEach( (element: ElementRef<HTMLElement>) => {

                    if( element.nativeElement.id === this.cancionSeleccionada.id.toString() ) {
                        element.nativeElement.setAttribute("style", "color: " + ListaCancionesComponent.redGranateColor );
                    } else {
                        element.nativeElement.setAttribute("style", "color: " + ListaCancionesComponent.yellowColor );
                    }

                });

            }
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

                    this.albumSeleccionado = newAlbum;

                } //end if

            }) //end foreach

        });

    }

    onSelectSingle(cancionSeleccionada: Cancion, textSongSelected: HTMLElement): void {

        //FUNCIÓN PARA PRINTAR LA CANCIÓN SELECCIONADA
        this.textSongsItems.forEach( (element: ElementRef) => {

            if( element.nativeElement === textSongSelected ) {
                element.nativeElement.setAttribute("style", "color: " + ListaCancionesComponent.redGranateColor );
            } else {
                element.nativeElement.setAttribute("style", "color: " + ListaCancionesComponent.yellowColor );
            }

        }); //END FUNCIÓN PARA PRINTAR LA CANCIÓN SELECCIONADA

        this.cancionSeleccionada = cancionSeleccionada;

    }

    enviarCancionSeleccionadaHaciaAppComponent(): void {
        this.enviarCancionSeleccionada.emit(this.cancionSeleccionada);
    }

    changeSortByTittle = (): void => {

        if ( this.optionSort.order === 'default' ) {
            this.optionSort.order = 'asc';
            return;
        }
        if ( this.optionSort.order === 'asc' ) {
            this.optionSort.order = 'desc';
            return;
        }
        else {
            this.optionSort.order = 'default';
            return;
        }

    }

}

// FUNCIÓN SORT, NO ELIMINAR
// changeSort(property: string): void {

//     const { order } = this.optionSort
//     this.optionSort = {
//         order: order === 'asc' ? 'desc' : 'asc'
//     }

// }
