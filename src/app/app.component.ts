import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, expand, EMPTY, map, reduce } from 'rxjs';

const api = 'https://swapi.dev/api/planets/';

interface ApiResponse {
  next: string,
  results: any[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'starwars-app';
  planets: any[] = [];
 
  constructor(private http: HttpClient){}

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

  ngOnInit() {
    this.fetchData(api).subscribe(planets => {
      this.planets = planets
      // console.log(planets)
    })
  }

  handleClick(event: Event) {
    let planetList: any = document.querySelector(".planet-list");
    planetList.hidden = true;
  }
    
}
