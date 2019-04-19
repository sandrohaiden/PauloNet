import { Component, OnInit } from '@angular/core';
import Chamado from 'src/model/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cancelamento-finalizacao',
  templateUrl: './cancelamento-finalizacao.page.html',
  styleUrls: ['./cancelamento-finalizacao.page.scss'],
})
export class CancelamentoFinalizacaoPage implements OnInit {
  private outro: string; //valor daa opção que o técnico digitar
  private radioValue: string; //valor do botão selecionado
  private msg: string; //relato do técnico
  private chamado: Chamado

  constructor(public chamadoService: ChamadoService, public navCtrl: NavController) { }

  ngOnInit() {
    this.chamadoService.currentMessage.subscribe(inst => this.chamado = inst);
    console.log(this.chamado);
  }
  
  //O chamado de cancelamento é "fechado" aqui
  finalizar(){
    this.msg = 'Equipamento retirado: ' + this.radioValue + '.\n\n'
    + this.msg;
    let arr = {id:this.chamado.id,
              chamado:this.chamado.chamado,
              tec: 'JHOSEFE',
              msg: this.msg}
    console.log(arr);
    this.chamadoService.responderCancelamento(arr);
    this.navCtrl.navigateRoot('/home');
  }

}
