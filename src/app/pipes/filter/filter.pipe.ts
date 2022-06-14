import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

//TODO: LLAMAR A LA BBDD PARA QUE BUSQUE CANCIONES
//      Y HACER QUE CREE UNA TARJETA CON LA CANCIÓN DE LA BBDD.
export class FilterPipe implements PipeTransform {

    transform(value: any, textFilter: string ): any {
        const filterResult = [];
        for ( const album of value ) {
            if ( album.nombre.toLowerCase().indexOf( textFilter.toLowerCase() ) > -1 ) {
                filterResult.push( album );
            }; //end if
        }; //end for

        return filterResult;

    }; //end transform

}
