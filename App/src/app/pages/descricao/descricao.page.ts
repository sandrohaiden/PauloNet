import { Component, OnInit } from '@angular/core';
import Chamado from 'src/model/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-descricao',
  templateUrl: './descricao.page.html',
  styleUrls: ['./descricao.page.scss'],
})
export class DescricaoPage implements OnInit {
  public chamado: Chamado;

  constructor(public navCtrl: NavController, public chamadoService: ChamadoService) { }

  ngOnInit() {
    this.chamadoService.currentMessage.subscribe(inst => this.chamado = inst);
    this.list();
  }

  list(){
    return this.chamadoService.getChamado()
    .subscribe(resposta => {
      console.log('dados da tabela:', resposta);
      return this.chamado = resposta.json()[0];
    })
  }

}
