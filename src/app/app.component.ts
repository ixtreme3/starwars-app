import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, expand, EMPTY, map, reduce } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `<div class="flex-container">
               <div class="main-component">
                 <h1 class="page-header"><a class="logo-link" href="">Star Wars App 🌌 🔫</a></h1>
                 <router-outlet></router-outlet>
               </div>
             </div>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() { }

  ngOnInit(): void {
  }
    
}
