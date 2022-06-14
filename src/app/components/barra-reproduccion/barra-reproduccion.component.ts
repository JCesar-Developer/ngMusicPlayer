import { Component, ElementRef, Input, OnInit, OnChanges, SimpleChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { Cancion } from 'src/app/interfaz-Cancion';
import { Album } from 'src/app/interfaz_Album';

@Component({
  selector: 'app-barra-reproduccion',
  templateUrl: './barra-reproduccion.component.html',
  styleUrls: ['./barra-reproduccion.component.css']
})
export class BarraReproduccionComponent implements OnInit, OnChanges {

    public static disabledColor: string = '#9B9B9B';
    public static yellowColor: string = '#daa520';
    public static redGranateColor: string = '#f55050e5';

    @Input('albumSeleccionado') albumSeleccionado!: Album;
    @Input('cancionSeleccionada') cancionSeleccionada!: Cancion;
    @Output() enviarCancionSeleccionadaFromBarraReproduccion = new EventEmitter();

    @ViewChild('currentTime') showedCurrentTime!: ElementRef<HTMLElement>;
    @ViewChild('progressBarRepContainer') progressBarRepContainer!: ElementRef<HTMLElement>;
    @ViewChild('progressBarraReproduccion') progressBarraReproduccion!: ElementRef<HTMLElement>;
    @ViewChild('timeLeft') showedtimeLeft!: ElementRef<HTMLElement>;

    audio = new Audio();

    leftVolume: number = 1;
    iconColor: string = BarraReproduccionComponent.disabledColor;
    muteBtnColor: string = BarraReproduccionComponent.yellowColor;

    arraySongs: Cancion[] = [];
    songSelected: boolean = false;
    songPlaying: boolean = false;

    songMute: boolean = false;
    playPauseIcon: string = 'play_circle';
    volumenIcon: string = 'volume_up';
    currentTimePercent: number = 0;

    idCancion!: number;
    cancionIndefinida!: Cancion;
    playCancionIndefinida!: Cancion;

    constructor() {}

    ngOnInit(): void {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if( changes['albumSeleccionado'] ){
            if(changes['albumSeleccionado'].currentValue !== changes['albumSeleccionado'].previousValue ){
                this.cancionSeleccionada = this.cancionIndefinida;
                this.playPauseIcon = 'play_circle';
                this.stopSingle();
            }
        }

        if( this.cancionSeleccionada !== this.cancionIndefinida ){
            this.iconColor = BarraReproduccionComponent.yellowColor;
            this.songSelected = true;
        }

        if( this.cancionSeleccionada === this.cancionIndefinida ){
            this.iconColor = BarraReproduccionComponent.disabledColor;
            this.songSelected = false;
        }

        if( typeof this.albumSeleccionado !== 'undefined'){
            //CADA VEZ QUE CAMBIA DE ALBUM VACIA EL ARRAY
            this.arraySongs.splice(0, this.arraySongs.length);
            //END CADA VEZ QUE CAMBIA DE ALBUM VACIA EL ARRAY

            this.albumSeleccionado.playlist.forEach((valor) =>{
                this.arraySongs.push(valor);
            })
        }

        if(typeof this.cancionSeleccionada !== 'undefined'){
            this.arraySongs.forEach((valor) => {
                if( valor.id === this.cancionSeleccionada.id ){
                    this.idCancion = valor.id;
                    this.cancionSeleccionada = valor;
                }
            })
        }

        if(typeof this.cancionSeleccionada !== 'undefined'){
            this.audio.src = this.cancionSeleccionada.src;
            //AUTOPLAY
            this.autoplay();
        }

        this.progressUpdate();

    }

    /* --- FUNCIONES DEL REPRODUCTOR DE MÚSICA --- */
    autoplay(){
        this.audio.autoplay = true;
        this.songPlaying = true;
        this.playPauseIcon = "pause_circle"
    }

    loadSong(){
        this.arraySongs.forEach((valor) => {
            if( valor.id == this.idCancion ){
                this.idCancion = valor.id;
                this.cancionSeleccionada = valor;
                this.enviarCancionSeleccionadaFromBarraReproduccion.emit(this.cancionSeleccionada);
            }
        })
        this.audio.src = this.cancionSeleccionada.src;
        this.autoplay();
    }

    progressUpdate() {

        this.audio.addEventListener("timeupdate", () => {

            //VARIABLES GLOBALES
            const totalTime = this.audio.duration;
            const currentTime = this.audio.currentTime;
            const timeLeft = totalTime - currentTime;
            //END VARIABLES GLOBALES

            //LÓGICA PARA EL TIMER QUE AVANZA
            let ct_minutes = Math.round ((currentTime / 60) % 60);
            let ct_seconds = Math.round (currentTime % 60);

            let ct_minutes_toString: string = ct_minutes + '';
            let ct_seconds_toString: string = ct_seconds + '';

            if (ct_minutes < 10 ) { ct_minutes_toString = "0" + ct_minutes };
            if (ct_seconds < 10 ) { ct_seconds_toString = "0" + ct_seconds };

            this.showedCurrentTime.nativeElement.innerHTML = ct_minutes_toString+':'+ct_seconds_toString;
            //END LÓGICA PARA EL TIMER QUE AVANZA

            //LÓGICA PARA PROGRESS BAR
            this.currentTimePercent = ( currentTime / totalTime ) * 100;
            this.progressBarraReproduccion.nativeElement.setAttribute("style", "width: "+this.currentTimePercent+"%");
            // END LÓGICA PARA PROGRESS BAR

            //LÓGICA PARA EL TIMER QUE AVANZA
            let tl_minutes = Math.round ((timeLeft / 60) % 60);
            let tl_seconds = Math.round (timeLeft % 60);

            let tl_minutes_toString: string = tl_minutes + '';
            let tl_seconds_toString: string = tl_seconds + '';

            if (tl_minutes < 10 ) { tl_minutes_toString = "0" + tl_minutes };
            if (tl_seconds < 10 ) { tl_seconds_toString = "0" + tl_seconds };

            this.showedtimeLeft.nativeElement.innerHTML = tl_minutes_toString+':'+tl_seconds_toString;
            //END LÓGICA PARA EL TIMER QUE AVANZA

        });

    }

    //BARRA DE REPRODUCCIÓN CLICABLE
    setProgressValue(event: MouseEvent) {
        if(this.songSelected){

            //TIENE QUE SER LANZADO DESDE AQUÍ
            const progressBarRepContWidth = this.progressBarRepContainer.nativeElement.offsetWidth;
            const progressBarclickWidth = event.offsetX;

            const newCurrentTime = ( progressBarclickWidth / progressBarRepContWidth ) * this.audio.duration;
            this.audio.currentTime = newCurrentTime;

        }
    }
    /* --- END FUNCIONES DEL REPRODUCTOR DE MÚSICA --- */


    /* --- BOTONES DEL REPRODUCTOR DE MÚSICA --- */
    skip_toPrevious_single(){
        if(this.songSelected){

            this.idCancion--;

            if( this.idCancion > 0 ) {
                this.loadSong();
            } else {
                this.idCancion = this.arraySongs.length;
                this.loadSong();
            }

        }
    }

    playPauseSingle(): void {

        if( typeof this.cancionSeleccionada !== 'undefined' ){

            if( this.songPlaying ){
                this.audio.pause();
                this.songPlaying = false;
                this.playPauseIcon = "play_circle"
            }
            else{
                this.audio.play();
                this.songPlaying = true;
                this.playPauseIcon = "pause_circle"
            }

        } else {
            window.alert("¡Tienes que seleccionar una canción!")
        }

    }

    changeVolumen(volumeButton: HTMLInputElement): void {
      volumeButton.addEventListener('click', () => {
          this.songMute = false;
          this.audio.volume = this.leftVolume;
          this.volumenIcon = 'volume_up';
          this.leftVolume  = volumeButton.valueAsNumber;
          this.audio.volume = this.leftVolume;
      })
  }

    muteVolumen(): void {

        //PARA MUTEAR
        if( !this.songMute ){
            this.songMute = true;
            this.audio.volume = 0;
            this.muteBtnColor = BarraReproduccionComponent.disabledColor;
            this.volumenIcon = 'volume_off';
        }//END PARA MUTEAR

        //PARA DESMUTEAR
        else {
            this.songMute = false;
            this.audio.volume = this.leftVolume;
            this.muteBtnColor = BarraReproduccionComponent.yellowColor;
            this.volumenIcon = 'volume_up';
        }//END PARA DESMUTEAR

    }

    stopSingle(){
        if(this.songSelected){

            this.audio.pause();
            this.songPlaying = false;
            this.playPauseIcon = "play_circle"
            this.audio.currentTime = 0;

        }
    }

    skip_toNext_single(){
        if(this.songSelected){

            this.idCancion++;

            if( this.idCancion < this.arraySongs.length + 1 ) {
                this.loadSong();
            } else {
                this.idCancion = 1;
                this.loadSong();
            }

        }
    }

}
