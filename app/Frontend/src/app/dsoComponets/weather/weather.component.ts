import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherWidgetMainComponent implements OnInit {
  isDay: boolean | undefined;
  WeatherData: any;
  location: string = "Kragujevac,Serbia";

  constructor() { }

  ngOnInit() {
    this.getWeatherData();
    console.log(this.WeatherData);
  }

  getWeatherData() {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.location}&appid=ff1bc4683fc7325e9c57e586c20cc03e`)
      .then(response => response.json())
      .then(data => {
        this.setWeatherData(data);
      });
  }

  setWeatherData(data: any) {
    this.WeatherData = data;
    this.WeatherData.city = data.city;
    this.WeatherData.list = data.list.filter((item: any, index: number) => index % 8 === 0); // get data for every 24 hours

    this.WeatherData.list.forEach((element: any) => {
      let date = new Date(element.dt * 1000);
      element.dt_txt = date.toLocaleDateString(undefined, { weekday: 'short' }) + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      element.main.temp_celsius = (element.main.temp - 273.15).toFixed(0);
      element.main.temp_min_celsius = (element.main.temp_min - 273.15).toFixed(0);
      element.main.temp_max_celsius = (element.main.temp_max - 273.15).toFixed(0);
      element.main.feels_like_celsius = (element.main.feels_like - 273.15).toFixed(0);
      element.forecastDate = date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    });

    const currentTime = new Date();
    const locationTimeZoneOffset = (this.WeatherData.city.timezone / 3600);
    const locationCurrentTime = new Date(currentTime.getTime() + (locationTimeZoneOffset * 60 * 60 * 1000));
    const locationHours = locationCurrentTime.getHours();
    this.isDay = (locationHours >= 6 && locationHours < 18);
  }

  onSearch() {
    this.getWeatherData();
  }
}
