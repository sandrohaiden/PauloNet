import { Component, OnInit } from '@angular/core';
import Chamado from 'src/model/chamado';
import { NavController, ToastController } from '@ionic/angular';
import { ChamadoService } from 'src/app/services/chamado.service';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-instalacao',
  templateUrl: './instalacao-descricao.page.html',
  styleUrls: ['./instalacao-descricao.page.scss'],
})
export class InstalacaoDescricaoPage implements OnInit {
  public chamado: Chamado;
  public toast: any;

  constructor(public navCtrl: NavController, public chamadoService: ChamadoService,
    public cn: CallNumber, public toastCtrl: ToastController) { }

  ngOnInit() {
    this.chamadoService.currentMessage.subscribe(inst => this.chamado = inst);
    console.log(this.chamado);
  }

  call(n){
    this.cn.callNumber(n, true);
  }

  fechar(){
    this.chamadoService.liberarCliente(this.chamado.id)
    .subscribe(data=>{
      console.log(data);
      let x = (data as any)._body;
      x = JSON.parse(x);
      this.showToast(x.msg);
    });
    this.navCtrl.navigateForward("/finalizacao");
  }

  showToast(msg: string) {
    this.toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then((toastData)=>{
      console.log(toastData);
      toastData.present();
    });
  }
  HideToast(){
    this.toast = this.toastCtrl.dismiss();
  }

}
