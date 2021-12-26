import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistaCrudComponent } from './components/views/artista/artista-crud/artista-crud.component';
import { HomeComponent } from './components/views/home/home.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "artista",
    component: ArtistaCrudComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
