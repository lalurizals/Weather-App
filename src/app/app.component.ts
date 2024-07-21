import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './services/weather-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  @ViewChild('myModal') model: ElementRef | undefined;
  weatherObj: Weather = new Weather();
  weatherList: Weather[] = [];
  title = 'weather-app';
  searchQuery: string = '';
  weatherDetail: string = '';
  modalStatus: string = '';

  ngOnInit(): void {
    const localData = localStorage.getItem('weatherApp');
    if (localData != null) {
      this.weatherList = JSON.parse(localData);
    }
  }

  openModel() {
    const model = document.getElementById('myModal');
    if (model != null) {
      model.style.display = 'block';
    }
  }

  closeModel() {
    this.weatherObj = new Weather();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  onDelete(item: Weather) {
    const isDelet = confirm('Are you sure want to Delete');
    if (isDelet) {
      const currentRecord = this.weatherList.findIndex(
        (m) => m.id === this.weatherObj.id
      );
      this.weatherList.splice(currentRecord, 1);
      localStorage.setItem('weatherApp', JSON.stringify(this.weatherList));
      this.closeModel();
    }
  }
  onDetail(item: Weather) {
    this.weatherObj = item;
    this.modalStatus = "show";
    this.openModel();
  }


  onAdd() {
    this.modalStatus = "add";
    this.openModel();
  }

  saveWeather() {

    this.searchWeather(this.weatherObj.name);

    this.closeModel();
  }


  constructor(private weatherService: WeatherService) { }


  searchWeather(query: string) {
    this.weatherDetail = 'Weather details';
    const isLocalPresent = localStorage.getItem('weatherApp');

    this.weatherService.get(query).subscribe((results) => {

      this.weatherObj.description = results.weather[0].description;
      this.weatherObj.main = results.weather[0].main;
      this.weatherObj.weatherId = results.weather[0].id;
      this.weatherObj.icon = results.weather[0].icon;
      this.weatherObj.status = `Its ${results.weather[0].main} and overall its ${results.weather[0].description}`;
      this.weatherObj.name = query;
      this.weatherObj.temp = results.main.temp;
      this.weatherObj.humidity = results.main.humidity;
      this.weatherObj.pressure = results.main.pressure;

      if (isLocalPresent != null) {
        const oldArray = JSON.parse(isLocalPresent);
        this.weatherObj.id = oldArray.length + 1;
        oldArray.push(this.weatherObj);
        this.weatherObj = oldArray;
        localStorage.setItem('weatherApp', JSON.stringify(oldArray));
      } else {
        const newArr = [];
        newArr.push(this.weatherObj);
        this.weatherObj.id = 1;
        this.weatherList = newArr;
        localStorage.setItem('weatherApp', JSON.stringify(newArr));
      }
    });
  };
}


export class Weather {
  id: number;
  weatherId: number;
  name: string;
  description: string;
  icon: string;
  main: string;
  status: string;
  temp: string;
  pressure: string;
  humidity: string;

  constructor() {
    this.id = 0;
    this.weatherId = 0;
    this.name = '';
    this.description = '';
    this.icon = '';
    this.main = '';
    this.status = '';
    this.temp = '';
    this.pressure = "";
    this.humidity = "";
  }
}
