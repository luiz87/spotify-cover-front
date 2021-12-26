import { Component, OnInit } from '@angular/core';
import { Artista } from '../artista.model';
import { ArtistaService } from '../artista.service';

@Component({
  selector: 'app-artista-crud',
  templateUrl: './artista-crud.component.html',
  styleUrls: ['./artista-crud.component.css']
})
export class ArtistaCrudComponent implements OnInit {

  displayedColumns: string[] = ['nome'];
  listArtista: any[] = []
  artista!: Artista
  constructor(private service: ArtistaService) { }

  ngOnInit(): void {
    this.service.baseUrl += "/artista"
    this.refreshPage()
  }
  save(): void {
    if (this.artista.link == "") {
      this.create()
    } else {
      this.update()
    }
  }

  create(): void {
    this.service.create(this.artista).subscribe(
      resp => {
        console.log(resp)
        this.refreshPage()
      }
    )
  }

  update(): void {
    this.service.update(this.artista).subscribe(
      resp => {
        console.log(resp)
        this.refreshPage()
      }
    )
  }

  findAll(): void {
    this.service.findAll().subscribe(
      resposta => {
        this.listArtista = resposta._embedded.artista
      }
    )
  }

  cancel(): void {
    this.artista = {
      link: "",
      nome: ""
    }
  }

  select(a: any) {
    this.artista = {
      link: a._links.self.href,
      nome: a.nome
    }
  }

  delete(): void {
    this.service.delete(this.artista).subscribe(
      resp => {
        this.refreshPage()
      }
    )
  }

  refreshPage(): void {
    this.findAll()
    this.cancel()
  }

}
