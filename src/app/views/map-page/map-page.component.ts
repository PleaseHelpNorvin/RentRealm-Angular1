import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-page',
  standalone: true,
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements AfterViewInit {
  private map!: L.Map;

  // Array of marker locations (latitude, longitude, and popup message)
  private locations = [
    { lat: 14.5995, lng: 120.9842, popup: "Manila, Philippines" },
    { lat: 14.6760, lng: 121.0437, popup: "Quezon City" },
    { lat: 14.5547, lng: 121.0244, popup: "Makati City" }
  ];

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([14.5995, 120.9842], 12); // Center on Manila

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(this.map);

    // Add markers from locations array
    this.addMarkers();
  }

  private addMarkers(): void {
    this.locations.forEach(location => {
      L.marker([location.lat, location.lng])
        .addTo(this.map)
        .bindPopup(location.popup)
        .openPopup();
    });
  }
}
