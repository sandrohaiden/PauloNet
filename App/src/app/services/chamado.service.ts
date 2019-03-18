import { Injectable } from '@angular/core';
import Chamado from 'src/model/chamado';
import { BehaviorSubject } from 'rxjs';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  public chamado = new Chamado();
  public url = 'http://10.0.0.107:3000/';

  public messageSource = new BehaviorSubject(this.chamado);
  currentMessage = this.messageSource.asObservable();

  constructor(public http: Http) { }

  changeMessage(chamado: Chamado) {
    this.messageSource.next(chamado);
    console.log(this.chamado)
  }

  getChamados(){
    return this.http.get(this.url);
  }

  getChamado(){
    console.log(this.url + this.chamado.id);
    return this.http.get(this.url + this.chamado.id);
  }

  fecharChamado(texto: any, chamado: string){
    return this.http.post(this.url + chamado, {texto}).subscribe((data: any) =>{
    });
  }
}
