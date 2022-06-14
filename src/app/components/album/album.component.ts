import { Component, Input, Output, EventEmitter, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlbumService } from '../../shared/album.service';
import { ToastrService } from 'ngx-toastr';

import { Album } from '../../interfaz_Album';

import { Firestore, collection, onSnapshot, DocumentData } from '@angular/fire/firestore';

@Component({
    selector: 'app-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.css']
})

export class AlbumComponent implements AfterViewInit {

    // --------------- CLASS VARIABLES --------------- //
    @Input('listaAlbums') albums!: Array<Album>;
    @Input('textFilter') textFilter!: string;
    @Output() enviarAlbumSeleccionado = new EventEmitter();
    @ViewChildren('inputId') inputId!: QueryList<ElementRef>;
    @ViewChildren('submitBtn') submitBtn!: QueryList<ElementRef<HTMLButtonElement>>;

    albumSeleccionado!: Album;
    loading: boolean = false;
    modalId!: any;

    // ---------------- CONSTRUCTOR ----------------- //
    constructor( firestore: Firestore,
                 public albumService: AlbumService,
                 private toastr: ToastrService ) { }

    ngAfterViewInit(): void {

      //TRANSFORMAMOS TODOS LOS BOTONES EN DISABLED
      this.submitBtn.changes.subscribe((items: Array<ElementRef<HTMLButtonElement>>) => {
          items.forEach((item: ElementRef<HTMLButtonElement>) => {
              item.nativeElement.disabled = true;
          });
      });

    }

    // --------------- CLASS METODES ---------------- //

    addNewAmbum() {

        this.loading = true;

        //PARA PASAR POR PARAMETRO EL INDICE DEL ALBUM
        const index = this.albums.length;
        const result = this.albumService.agregarAlbum( index );
        result
            .then(() => {
                this.loading = false;
                this.toastr.success('Se ha agregado un nuevo albúm a la BBDD', 'Album creado');
            })
            .catch(() => {
                this.loading = false;
                this.toastr.error('Por favor, revisa tu conexión a internet.', 'Error');
            })

    }

    saveModalId( modalId: any ) {
        this.modalId = modalId;
    }

    updateImg( nuevaImg: any ):void {

        console.log(this.modalId);
        console.log(nuevaImg.img);
        const nuevaUrl = nuevaImg.img;

        this.albumService.actualizarImagen( this.modalId, nuevaUrl );

    }

    updateAlbum( albumModificado: NgForm ):void {

        console.log( albumModificado );
        this.loading = true;

        const result = this.albumService.actualizarAlbum( this.albumSeleccionado, albumModificado );
        result
            .then(() => {
                this.loading = false;
                this.toastr.success('Se han modificado los datos, correctamente', 'Album modificado');
            })
            .catch(() => {
                this.loading = false;
                this.toastr.error('Por favor, revisa tu conexión a internet.', 'Error');
            })

    }

    onSelectAlbum(albumSeleccionado: Album): void {

        this.inputId.forEach( (element) => {

            // const id = element.nativeElement.children[0].value;

            element.nativeElement.children[2].addEventListener("keyup", () => {
                element.nativeElement.children[4].disabled = false;
            })
            element.nativeElement.children[3].addEventListener("keyup", () => {
                element.nativeElement.children[4].disabled = false;
            })

        });

        this.albumSeleccionado = albumSeleccionado;
    }

    enviarPlaylistSeleccionadaHaciaAppComponent(): void {
        this.enviarAlbumSeleccionado.emit(this.albumSeleccionado);
    }

}

/*
 * MODIFICAR EL CSS DEL BOTÓN ADD.
 * PASO 2: PERMITIR QUE LOS ALBUMES PUEDAN HACER UPDATE IMÁGENES.
 *
 */
