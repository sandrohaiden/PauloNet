import { Component, OnInit } from '@angular/core';
import Chamado from 'src/model/chamado';
import { NavController } from '@ionic/angular';
import { ChamadoService } from 'src/app/services/chamado.service';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-instalacao',
  templateUrl: './instalacao-descricao.page.html',
  styleUrls: ['./instalacao-descricao.page.scss'],
})
export class InstalacaoDescricaoPage implements OnInit {
  public chamado: Chamado;

  constructor(public navCtrl: NavController, public chamadoService: ChamadoService,
    public cn: CallNumber) { }

  ngOnInit() {
    this.chamadoService.currentMessage.subscribe(inst => this.chamado = inst);
    console.log(this.chamado);
  }

  call(n){
    this.cn.callNumber(n, true);
  }

  fechar(){
    this.navCtrl.navigateForward("/finalizacao");
  }

}
