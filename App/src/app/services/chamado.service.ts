import { Injectable } from '@angular/core';
import Chamado from 'src/model/chamado';
import { BehaviorSubject } from 'rxjs';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  public chamado = new Chamado();
  public chamados: Chamado [];
  public url = 'http://10.0.0.109:3000/';

  public messageSource = new BehaviorSubject(this.chamado);
  currentMessage = this.messageSource.asObservable();

  public fonteChamados = new BehaviorSubject<Chamado[]>(this.chamados);
  chamadosAtual = this.fonteChamados.asObservable();

  constructor(public http: Http) { }

  changeMessage(chamado: Chamado) {
    this.messageSource.next(chamado);
  }

  changeChamados(chamado: Chamado[]) {
    this.fonteChamados.next(chamado);
  }

  getChamados(){
    return this.http.get(this.url+'JHOSEFE');
  }

  getChamado(){
    console.log(this.url + this.chamado.id);
    return this.http.get(this.url + this.chamado.id);
  }

  fecharChamado(texto: any, chamado: string){
    return this.http.post(this.url + chamado, {texto}).subscribe((data: any) =>{
      this.getChamados().subscribe(chams=>{
        let x = chams as any
        console.log(JSON.parse(x._body));
        this.changeChamados(chams.json());
      })
    });
  }

  liberarCliente(id: number){
    return this.http.post(this.url + 'instalacao/' + id,{});
  }

  finalizarInstalacao(tx: string, id: number){
    return this.http.post(this.url + 'instalacao2/'+id, {tx}).subscribe((data: any) =>{
      this.getChamados().subscribe(chams=>{
        let x = chams as any
        console.log(JSON.parse(x._body));
        this.changeChamados(chams.json());
      })
    });
  }
}
