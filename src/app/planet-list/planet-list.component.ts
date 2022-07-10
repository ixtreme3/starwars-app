import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, expand, EMPTY, map, reduce } from 'rxjs';

const api = 'https://swapi.dev/api/planets/';

interface ApiResponse {
  next: string,
  results: any[]
}

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.css']
})
export class PlanetListComponent implements OnInit {
  title = 'starwars-app';
  planets: any[] = [];
 
  constructor(private http: HttpClient){}

  ngOnInit(): void  {
    this.fetchData(api).subscribe(planets => {
      this.planets = planets
    })
  }

  fetchData(apiEndpoint: string): Observable<any[]> {
    return this.http.get<ApiResponse>(apiEndpoint)
      .pipe(
        expand(apiResponse => {
          if (!apiResponse.next) {
            return EMPTY;
          }
          return this.http.get<ApiResponse>(apiResponse.next);
        }),
        map(apiResponse => apiResponse.results),
        reduce((accData, results) => accData.concat(results))
      )
  }

  getId(url: string): number {
    return +url.replace(/\D/g, '');
  }

}
