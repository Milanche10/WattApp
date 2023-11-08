import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import * as L from 'leaflet';
import { environment } from 'src/environment/environment';
//import "leaflet-control-geocoder/dist/Control.Geocoder.css";
//import "leaflet-control-geocoder/dist/Control.Geocoder.js"
import { MatDialog } from '@angular/material/dialog';
import { DsoProsumersTable } from '../dso-prosumers-table/dso-prosumers-table.component';
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Vector } from 'ol/source';
import { Style, Icon } from 'ol/style';
import { Observable } from 'rxjs';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

@Component({
  selector: 'app-dso-map',
  templateUrl: './dso-map.component.html',
  styleUrls: ['./dso-map.component.css']
})
export class DsoMapComponent {
  @Input() selectedProsumerId: number = 0;
  private map?: L.Map ;
  private data:any;
  private centroid: L.LatLngExpression = [44.01667, 20.911423]; //

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 8 // reduce the zoom level
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18, // increase the max zoom
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    // create a layer group for the markers
    const jitteryGroup = L.layerGroup();

    // create 5 random jitteries and add them to the layer group
    const centroid = this.centroid as [number, number];
const jitteryLatLng: [number, number] = [
  centroid[0] + (Math.random() - 0.5) / 10,
  centroid[1] + (Math.random() - 0.5) / 10,
];



/*// Create a marker and add it to the map
    this.data.forEach((prosumer: { lat: number; lon: number; }) => {
  const marker = L.marker([prosumer.lat, prosumer.lon]).addTo(this.map!);
  marker.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

});*/
// Add a popup to the marker
//marker.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

    // add the layer group and tiles to the map
    tiles.addTo(this.map);
    jitteryGroup.addTo(this.map);
  }



  

  constructor(private HTTP:HttpClient,public dialog: MatDialog) {
}
 markers: L.Marker[] = [];
  ngOnInit(): void {
    
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
  
  this.HTTP.get(`${environment.apiUrl}/api/Prosummer/getAllProsummers`,{headers}).subscribe(data => {
    this.data = data;
    this.initMap(); // move initMap() call inside the subscribe callback function
    this.addMarkersToMap(); // add this function call inside the subscribe callback function
  });
  const lat = 51.5074; // example latitude
const lng = -0.1278; // example longitude

this.reverseGeocode(lat, lng).subscribe(response => {
  const address = response.address;

  const city = address.city || address.town || address.village || address.hamlet;
  const country = address.country;
  const postcode = address.postcode;

  console.log(`City: ${city}`);
  console.log(`Country: ${country}`);
  console.log(`Postcode: ${postcode}`);
});

}
 onSubmit() {
    // Send an HTTP request to the Nominatim API to geocode the user's address
    this.HTTP.get<any>('https://nominatim.openstreetmap.org/search', {
      params: {
     //   q: this.adress,
        format: 'json'
      }
    }).subscribe(data => {
      if (data.length > 0) {
        // Get the latitude and longitude coordinates from the API response
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);

        // Mark the location on the map
        const marker = L.marker([lat, lon]).addTo(this.map!);
        (this.map!).setView([lat, lon], 13);
      }
    });
  }
private addMarkersToMap(): void {
  if (!this.data) return; // check if data is undefined before using it
  this.data.forEach((prosumer: { lat: number; lon: number; firstName:string; lastName:string; adress:string;}) => {
    const marker = L.marker([prosumer.lat, prosumer.lon], {
  icon: L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
    iconSize: [25, 41], // set the size of the icon
    iconAnchor: [12, 41], // set the anchor point of the icon
    shadowSize: [41, 41], // set the size of the shadow
    shadowAnchor: [12, 41] // set the anchor point of the shadow
  })
}).addTo(this.map!);

    
  marker.bindPopup(`<b>${prosumer.firstName} ${prosumer.lastName}</b><br />${prosumer.adress}`).openPopup();

  });
  (L.Control as any).geocoder().addTo(this.map);
  
}

public showOnMap(prosumer: any) {
    // Remove previous markers
    //this.markers.forEach(marker => marker.remove());
    this.markers = [];

    // Create new marker for selected prosumer
  //  const marker = L.marker([prosumer.latitude, prosumer.longitude]).addTo(this.map!);
   // this.markers.push(marker);

    // Zoom in to selected prosumer
    (this.map!).setView([prosumer.lat, prosumer.lon], 15);
  }
reverseGeocode(lat: number, lng: number): Observable<any> {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;

  return this.HTTP.get<any>(url);
}



openDialog(): void {
    const dialogRef = this.dialog.open(DsoProsumersTable, {
      width: '80%',
      maxWidth: '1200px',
      panelClass: 'prosumers-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
function onProsumerSelected(prosumer: any, any: any) {
  throw new Error('Function not implemented.');
}

