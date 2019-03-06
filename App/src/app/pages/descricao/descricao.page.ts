import { Component, OnInit } from '@angular/core';
import Instalacao from 'src/model/instalacao';
import { InstalacaoService } from 'src/app/services/instalacao.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-descricao',
  templateUrl: './descricao.page.html',
  styleUrls: ['./descricao.page.scss'],
})
export class DescricaoPage implements OnInit {
  public instalacao: Instalacao;

  constructor(public navCtrl: NavController, public instalacaoService: InstalacaoService) { }

  ngOnInit() {
    this.instalacaoService.currentMessage.subscribe(inst => this.instalacao = inst);
    this.list();
  }

  list(){
    return this.instalacaoService.getInstalacao()
    .subscribe(resposta => {
      console.log('dados da tabela:', resposta);
      return this.instalacao = resposta.json()[0];
    })
  }

}
