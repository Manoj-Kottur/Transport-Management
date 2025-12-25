import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TransportNavigationComponent } from './transport/transport-navigation/transport-navigation.component';
import { FormsModule } from '@angular/forms';
import { OfferRideComponent } from './transport/offer-ride/offer-ride.component';
import { BookRideComponent } from './transport/book-ride/book-ride.component';
import { LogDropComponent } from './transport/log-drop/log-drop.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'offer-ride', component: OfferRideComponent },
  { path: 'book-ride', component: BookRideComponent },
  { path: 'log-drop', component: LogDropComponent },
  { path: '', redirectTo: 'offer-ride', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent, TransportNavigationComponent, OfferRideComponent, BookRideComponent, LogDropComponent
  ],
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserModule, FormsModule,
],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
