// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-app-routing',
//   templateUrl: './app-routing.component.html',
//   styleUrls: ['./app-routing.component.scss']
// })
// export class AppRoutingComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { routes } from './routes';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: [],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' }
  ]
})
export class AppRoutingModule { }