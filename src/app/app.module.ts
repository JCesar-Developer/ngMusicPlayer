//ANGULAR CORE
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from "@angular/flex-layout";

//PROJECT COMPONENTS
import { AppComponent } from './app.component';
import { AlbumComponent } from './components/album/album.component';
import { ListaCancionesComponent } from './components/lista-canciones/lista-canciones.component';
import { CancionComponent } from './components/detalles-cancion/cancion.component';
import { BarraReproduccionComponent } from './components/barra-reproduccion/barra-reproduccion.component';
import { BarraNavComponent } from './components/barra-nav/barra-nav.component';

//PROJECT PIPES
import { FilterPipe } from './pipes/filter/filter.pipe';
import { SortPipe } from './pipes/sort/sort.pipe';
import { SortByTitlePipe } from './pipes/sort-by-tittle/sort-by-title.pipe';

//SERVICES
import { FormCancionService } from './shared/form-cancion.service';
import { AlbumService } from './shared/album.service';


//EXTERNAL LIBRARIES:
//VIDEOGULAR
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';

//ANGULAR MODULE
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ToastrModule } from 'ngx-toastr';

//FIREBASE IMPORT
import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    AlbumComponent,
    ListaCancionesComponent,
    CancionComponent,
    BarraReproduccionComponent,
    FilterPipe,
    SortPipe,
    BarraNavComponent,
    SortByTitlePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,

    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,

    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    MaterialModule,
    ToastrModule.forRoot(), // ToastrModule added

    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    // AngularFireModule.initializeApp(environment.firebase),
    // AppRoutingModule,
  ],
  exports:[
    MaterialModule,
  ],
  providers: [
    FormCancionService,
    AlbumService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
