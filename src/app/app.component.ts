import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

const api = 'https://swapi.dev/api/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'starwars-app';
  planets: any[] = [];
 
  constructor(private http: HttpClient){}

  ngOnInit() {
    this.http.get(`${api}/planets/`).subscribe((data:any) => {
      this.planets.push(...data.results);
    })
  }
    
}
