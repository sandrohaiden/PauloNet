import { Component, OnInit } from '@angular/core';
import Chamado from 'src/model/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';
import { NavController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx'

@Component({
  selector: 'app-descricao',
  templateUrl: './chamado-descricao.page.html',
  styleUrls: ['./chamado-descricao.page.scss'],
})
export class ChamadoDescricaoPage implements OnInit {
  public chamado: Chamado;

  constructor(public navCtrl: NavController, public chamadoService: ChamadoService,
    public cn: CallNumber) { }

  ngOnInit() {
    this.chamadoService.currentMessage.subscribe(inst => this.chamado = inst);
    console.log(this.chamado);
  }

  list(){
    return this.chamadoService.getChamado()
    .subscribe(resposta => {
      console.log('dados da tabela:', resposta);
      return this.chamado = resposta.json()[0];
    })
  }

  fechar(){
    console.log(this.chamado.assunto)
    if(this.chamado.assunto == 'Cancelamento')
      this.navCtrl.navigateForward("/cancelamento");
    else
      this.navCtrl.navigateForward("/fechamento");
  }

  call(n){
    this.cn.callNumber(n, true);
  }

}
