import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { WeatherModel } from '../models/weatherModel';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) {
  }

  get(query: string): Observable<WeatherModel> {
    let url = `https://api.openweathermap.org/data/2.5/weather?APPID=${environment.openWeatherKey}&units=metric`
    if (query) {
      url = `${url}&q=${query}`;
    }
    return this.httpClient.get<any>(url).pipe(map(res => (res as WeatherModel)));

  }
}
