import { Component, OnInit } from '@angular/core';
import { ChamadoService } from 'src/app/services/chamado.service';
import Chamado from 'src/model/chamado';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-fechamento',
  templateUrl: './fechamento.page.html',
  styleUrls: ['./fechamento.page.scss'],
})
export class FechamentoPage implements OnInit {
  public texto: string;
  public chamado: Chamado;
  constructor(public chamadoService: ChamadoService, public navCtrl: NavController) { }

  ngOnInit() {
    this.chamadoService.currentMessage.subscribe(inst => this.chamado = inst);
    console.log(this.chamado);
  }

  concluir(){
    this.chamadoService.fecharChamado(this.texto, this.chamado.chamado);
  }
}
