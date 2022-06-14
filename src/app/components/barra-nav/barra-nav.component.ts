import { Component, EventEmitter, Output } from '@angular/core';
import { MenuItem } from './menu-item';
import menuItems from './menu-items.json';

@Component({
  selector: 'app-barra-nav',
  templateUrl: './barra-nav.component.html',
  styleUrls: ['./barra-nav.component.css']
})
export class BarraNavComponent {

    @Output() enviarTextFilter = new EventEmitter();

    navbarOpen = false;
    items: MenuItem[] = menuItems;
    textFilter!: string;

    constructor() {}

    navigate( url: string ): void {
        window.open(url);
    }

    onSearchChange(searchValue: string): void {
        this.enviarTextFilter.emit(searchValue);
    }

}
