import { Component } from '@angular/core';
import Instalacao from 'src/model/instalacao';
import { NavController } from '@ionic/angular';
import { InstalacaoService } from 'src/app/services/instalacao.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public instalacao: Instalacao;
  public instalacoes: Instalacao[]=[];

  constructor(public navCtrl: NavController, public instalacaoService: InstalacaoService){}

  ngOnInit(){
    this.instalacaoService.currentMessage.subscribe(inst => this.instalacao = inst);
    this.list();
  }

  changeID(inst){
    this.instalacao.id = inst
    this.instalacaoService.changeMessage(this.instalacao);
  }

  goToDescricao(inst){
    this.changeID(inst);
    this.navCtrl.navigateForward('/descricao');
  }

  list(){
    return this.instalacaoService.getInstalacoes()
    .subscribe(resposta => {
      console.log('dados da tabela:', resposta);
      return this.instalacoes = resposta.json();
    })
  }
}
