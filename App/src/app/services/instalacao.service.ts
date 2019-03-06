import { Injectable } from '@angular/core';
import Instalacao from 'src/model/instalacao';
import { BehaviorSubject } from 'rxjs';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class InstalacaoService {

  public instalacao = new Instalacao();
  public url = 'http://10.0.0.107:3000/';

  public messageSource = new BehaviorSubject(this.instalacao);
  currentMessage = this.messageSource.asObservable();

  constructor(public http: Http) { }

  changeMessage(instalacao: Instalacao) {
    this.messageSource.next(instalacao);
    console.log(this.instalacao)
  }

  getInstalacoes(){
    return this.http.get(this.url);
  }

  getInstalacao(){
    console.log(this.url + this.instalacao.id);
    return this.http.get(this.url + this.instalacao.id);
  }
}
