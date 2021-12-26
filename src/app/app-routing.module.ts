import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumCrudComponent } from './components/views/album/album-crud/album-crud.component';
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
  },
  {
    path: "artista/:id/listAlbum",
    component: AlbumCrudComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
