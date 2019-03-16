import { Component } from '@angular/core';
import Chamado from 'src/model/chamado';
import { NavController } from '@ionic/angular';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public chamado: Chamado;
  public chamados: Chamado[]=[];

  constructor(public navCtrl: NavController, public chamadoService: ChamadoService){}

  ngOnInit(){
    this.chamadoService.currentMessage.subscribe(cham => this.chamado = cham);
    this.list();
  }

  changeID(cham){
    this.chamado.id = cham
    this.chamadoService.changeMessage(this.chamado);
  }

  goToDescricao(cham){
    this.changeID(cham);
    this.navCtrl.navigateForward('/descricao');
  }

  list(){
    return this.chamadoService.getChamados()
    .subscribe(resposta => {
      console.log('dados da tabela:', resposta);
      return this.chamados = resposta.json();
    })
  }
}
