import { Component, DoCheck, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';

//COMPONENTES IMPORTADOS
import { Album } from './interfaz_Album';
import { Cancion } from './interfaz-Cancion';

//BBDD IMPORTADA
import { Firestore, collection, collectionData, onSnapshot } from '@angular/fire/firestore';

OverlayContainer
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    title = 'Angular-180º';

    albums!: Album[];
    item$!: Observable<Album[]>;

    albumSeleccionado!: Album;
    cancionSeleccionada!: Cancion;
    textFilter: string = '';


    @HostBinding('class') componentCssClass:any;
    


    //CONSTRUCTOR
    constructor( firestore: Firestore,  public overlayContainer:OverlayContainer) {

        this.dataObserver( firestore );

    }
    public onSetTheme(e:string){
        this.overlayContainer.getContainerElement().classList.add(e);
        this.componentCssClass=e;
    }


    ngOnInit(): void { }

    dataObserver = ( firestore: Firestore  ) => {

        const queryResult = collection( firestore, 'albums' );

        onSnapshot( queryResult , () => {

            this.item$ = collectionData( queryResult ) as Observable<Album[]>;
            this.item$.subscribe( element => {
                this.albums = element;
            });

        });

    }

}










/** NO ELIMINAR - OTRA FORMA DE HACER GET A FIREBASE:
 *
 *  this.getAlbums( firestore )
 *
    getAlbums = async ( firestore: Firestore ) => {

        const querySnapshot = await getDocs(collection( firestore, "albums" ));
        const data = querySnapshot.docs;

        data.forEach( element => {
            const item = element.data();
            console.log(item);
            albums.push(item);
        });

    }
*
    [
        {
            "id": null,
            "nombre": "",
            "autor": "",
            "img": "",
            "playlist": [
                {
                    "id": "",
                    "titulo": "",
                    "artista": "",
                    "ano": "",
                    "album": "",
                    "genero": "",
                    "biografia": "",
                    "src": "",
                    "type": ""
                }
            ]
        }
    ]
 *
*
    // const getAlbums = collection(firestore, 'albums') ;
    // this.item$ = collectionData(getAlbums) as Observable<Album[]>;
    // this.item$.subscribe( element => {
    //     this.albums = element;
    // });

    // console.log( this.albums );
 *
    // dataObserver = ( firestore: Firestore  ) => {

    //     const queryResult = query(collection( firestore, 'albums' ));

    //     let item$: Observable<Album[]>;

    //     const unsubscribe = onSnapshot( queryResult , (querySnapshot) => {
    //         const listaAlbums: DocumentData[] = [];

    //         querySnapshot.forEach((doc) => {
    //             listaAlbums.push( doc.data() );

    //             this.albums = listaAlbums as Album[];
    //         })

    //         // item$ = listaAlbums as Observable<Album[]>;
    //         console.log( this.albums );

    //     });

    // }
 */
