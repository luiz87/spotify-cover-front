import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Artista } from '../artista.model';
import { ArtistaService } from '../artista.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AlbumCrudComponent } from '../../album/album-crud/album-crud.component';
@Component({
  selector: 'app-artista-crud',
  templateUrl: './artista-crud.component.html',
  styleUrls: ['./artista-crud.component.css']
})
export class ArtistaCrudComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nome'];
  dataSource: any[] = []
  artista!: Artista
  url: string = ""
  @ViewChild('btAlbuns') btAlbuns!: ElementRef

  constructor(private service: ArtistaService, private router: Router) { }
  ngAfterViewInit(): void {
    console.log(this.btAlbuns.nativeElement)
  }

  ngOnInit(): void {
    this.url = environment.baseUrl+"/artista"
    this.refreshPage()
  }

  listAlbum(): void {
    const rota = this.artista.linkAlbum?.replace(environment.baseUrl,'')
    this.router.navigate([rota])
  }

  save(): void {
    if (this.artista.link == "") {
      this.create()
    } else {
      this.update()
    }
  }

  create(): void {
    this.service.create(this.url, this.artista).subscribe(
      resp => {
        console.log(resp)
        this.refreshPage()
      }
    )
  }

  update(): void {
    console.log(this.artista)
    this.service.update(this.artista).subscribe(
      resp => {
        console.log(resp)
        this.refreshPage()
      }
    )
  }

  findAll(): void {
    this.service.findAll(this.url).subscribe(
      resposta => {
        this.dataSource = resposta._embedded.artista
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
      nome: a.nome,
      linkAlbum: a._links.listAlbum.href,
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
    // console.log(this.btAlbuns)
  }

}
