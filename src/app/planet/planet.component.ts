import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, expand, map, Observable, reduce, Subscription } from 'rxjs';

const api = 'https://swapi.dev/api/planets/';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})
export class PlanetComponent implements OnInit {

  id: number | undefined;
  private subscription: Subscription;
  planet: any;
  residentsList: any = [];

  constructor(private activateRoute: ActivatedRoute, private http: HttpClient) {
      this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit(): void {
    this.http.get(api + this.id).subscribe((data:any) => {
      this.planet = data;
      this.fetchData(data.residents)
    })
  }

  fetchData(residentsUrl: string[]): void {
    for (let url of residentsUrl) {
      this.http.get(url).subscribe((data:any) => {
        this.residentsList.push(data)
      })
    }
  }

  filter(template: string): void {
    let residents = document.querySelectorAll('.resident-description');
    residents.forEach((node: any) => node.hidden = false);
    if (template == 'reset') return;
    residents.forEach((node: any) => {
      if (!node.textContent.includes(template)) {
        node.hidden = true;
      }
    });
  }
}
