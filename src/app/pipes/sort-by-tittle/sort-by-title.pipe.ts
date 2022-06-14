import { Pipe, PipeTransform } from '@angular/core';
import { Cancion } from '../../interfaz-Cancion';
import * as _ from 'underscore';

@Pipe({
  name: 'sortByTitle'
})
export class SortByTitlePipe implements PipeTransform {

    transform(value: Cancion[], order: string ): Cancion[] {

        if( order === 'default' ) {
            return value;
        }
        if( order === 'asc' ) {
            return _.sortBy( value , function( cancion ) { return cancion.titulo ; });
        }
        else {
            return _.sortBy( value , function( cancion ) { return cancion.titulo ; }).reverse();
        }

    }

}
