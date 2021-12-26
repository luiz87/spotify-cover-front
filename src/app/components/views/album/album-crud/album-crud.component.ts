import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Artista } from '../../artista/artista.model';
import { ArtistaService } from '../../artista/artista.service';
import { Album } from './album.model';

@Component({
  selector: 'app-album-crud',
  templateUrl: './album-crud.component.html',
  styleUrls: ['./album-crud.component.css']
})
export class AlbumCrudComponent implements OnInit {

  artista: any = {}
  dataSource: any[] = []
  displayedColumns: string[] = ['nome'];
  album!: Album
  urlArtista!: string
  urlAlbum!: string

  constructor(private service: ArtistaService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.urlArtista = environment.baseUrl + "/artista/" + this.route.snapshot.paramMap.get('id');
    this.urlAlbum = environment.baseUrl + "/album"
    this.buscarArtista()
    this.refreshPage()
  }

  buscarArtista() {
    this.service.find(`${this.urlArtista}`).subscribe(
      resp => {
        this.artista = resp
      }
    )
  }

  find(): void {
    this.service.find(`${this.urlArtista}/listAlbum`).subscribe(
      resposta => {
        this.dataSource = resposta._embedded.album

      }
    )
  }

  cancel(): void {
    this.album = {
      link: "",
      nome: "",
      artista: this.urlArtista
    }
  }

  select(a: any) {
    this.album = {
      link: a._links.self.href,
      nome: a.nome,
      artista: `${this.urlArtista}`
    }
    console.log(this.album)
  }

  create(): void {
    this.service.create(this.urlAlbum, this.album).subscribe(
      resp => {
        console.log(resp)
        this.refreshPage()
      }
    )
  }

  update(): void {
    this.service.update(this.album).subscribe(
      resp => {
        this.refreshPage()
      }
    )
  }

  refreshPage(): void {
    this.find()
    this.cancel()
  }

  save(): void {
    if (this.album.link == "") {
      this.create()
    } else {
      this.update()
    }
  }

  delete(): void {
    this.service.delete(this.album).subscribe(
      resp => {
        this.refreshPage()
      }
    )
  }
}
