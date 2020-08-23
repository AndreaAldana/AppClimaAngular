import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  /* /* sacado de la pagina de open weather */
  /* http: */// esto se agregó a parte ya que daba error en la consola al inspeccionar */
  url = 'http://api.openweathermap.org/data/2.5/weather?&appid=';
  key = 'da23fd7cb3e65e0a5f6fcd2ff0077940';

  /* para poder inyectar esto al cosntructor, hayque importar en el app module 
  import { HttpClientModule } from '@angular/common/http' */

  constructor(private http: HttpClient) { }


 /*  la peticion es de tipo observable por ser get, el se importa al escribirlo y hacer enter
 debe tener return el metodo o marca error */
  getClima(ciudad: string): Observable<any>{

   return this.http.get(this.url + this.key + '&q=' + ciudad);

  }
}
