import { Component, OnInit } from '@angular/core';
import { ClimaService } from '../services/clima.service';
import swal from 'sweetalert';

import {
  trigger,
  style,
  animate,
  transition, 
  state
} from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('openClose', [
        state('open', style({
            height: '*',
            opacity: 1,
        })),
        state('closed', style({
            height: '0',
            opacity: 0
        })),
        transition('open => closed', [
            animate('2s')
        ]),
        transition('closed => open', [
            animate('2s')
        ]),
    ]),
]
})



export class DashboardComponent implements OnInit {
urlImage = 'https://image.flaticon.com/icons/png/512/2112/2112307.png';
ciudad = '';
query = false;
temperatura: number;
humedad: number;
clima:string;

/* hay que importar el servicio aquí, se importa al dar enter */
  constructor(private climaService: ClimaService) { }

  ngOnInit() {
  }

 /*  As I said, an Observable is a source, If you want to use the data from that source,
   you need to subscribe() to the Observable and then you get notified of any data emitted. */
  getWeather(){
    this.climaService.getClima(this.ciudad).subscribe(data => {
      console.log(data);
/* 
      el -273 es para volverlo grados celcius y el data para pasarle el dato 
      ya que nuestro dato se llama data,y el resto, es como sale el nombre
      de cada atributo en la consol, ej, data --> main -->temp (es la temperatura)
      o clima se encuentra en data -->weather ---> 0 ---> main (ya que alli sale la info
        especifica del clima, sino, sale muchos mas datos como descripcion etc,
        es por esto que es muy importante el console.log(data) de arriba, que nos muestra
        todos los datos en la consola y para verificar que todo funciona correctamente,
        data fue creado ahí dentro de subscribe y trae todos los datos*/
      this.temperatura = data.main.temp - 273;
      this.humedad = data.main.humidity;
      this.clima = data.weather[0].main;
      this.query = true;
      swal(
        '¡Súper!',
        'La búsqueda se hizo correctamente',
        'success'
      );
    }, error => 
     
    {this.query = false;
      this.ciudad = '';
      swal(
      '¡Error!',
      'Algo ocurrió, realiza tu búsqueda nuevamente',
      'error'
    )})
    
  }

  gracias(){
    swal({
      title: "¡Gracias por probar mi aplicación!",
      text: "Acepto recomendaciones para poder seguir mejorando poco a poco :)"
    });
  }

}
