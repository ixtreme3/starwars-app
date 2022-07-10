import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PlanetListComponent } from './planet-list/planet-list.component';
import { PlanetComponent } from './planet/planet.component';

const appRoutes: Routes = [
  { path: '', component: PlanetListComponent},
  { path: 'planet/:id', component: PlanetComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    PlanetListComponent,
    PlanetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
