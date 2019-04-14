import { Component, OnInit } from '@angular/core';
import Chamado from 'src/model/chamado';

@Component({
  selector: 'app-cancelamento-finalizacao',
  templateUrl: './cancelamento-finalizacao.page.html',
  styleUrls: ['./cancelamento-finalizacao.page.scss'],
})
export class CancelamentoFinalizacaoPage implements OnInit {
  private outro: string;
  private radioValue: string;
  private msg: string;
  private chamado: Chamado

  constructor() { }

  ngOnInit() {
  }

  finalizar(){
    console.log(this.radioValue);
  }

}
