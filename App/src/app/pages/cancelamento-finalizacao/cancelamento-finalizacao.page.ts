import { Component, OnInit } from '@angular/core';
import Chamado from 'src/model/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cancelamento-finalizacao',
  templateUrl: './cancelamento-finalizacao.page.html',
  styleUrls: ['./cancelamento-finalizacao.page.scss'],
})
export class CancelamentoFinalizacaoPage implements OnInit {
  private outro: string; //valor daa opção que o técnico digitar
  private radioValue: string; //valor do botão selecionado
  private msg: string; //relato do técnico
  private chamado: Chamado;
  private toast: any;

  constructor(public chamadoService: ChamadoService, public navCtrl: NavController,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.chamadoService.currentMessage.subscribe(inst => this.chamado = inst);
    console.log(this.chamado);
  }

  //O chamado de cancelamento é "fechado" aqui
  finalizar() {
    this.msg = 'Equipamento retirado: ' + this.radioValue + '.\n\n'
      + this.msg;
    let arr = {
      id: this.chamado.id,
      chamado: this.chamado.chamado,
      tec: 'JHOSEFE',
      msg: this.msg
    }
    console.log(arr);
    this.chamadoService.responderCancelamento(arr)
      .subscribe((data: any) => {
        let x = (data as any)._body;
        x = JSON.parse(x);
        this.showToast(x.msg);
        this.chamadoService.getChamados().subscribe(chams => {
          let x = chams as any
          console.log(JSON.parse(x._body));
          this.chamadoService.changeChamados(chams.json());
        })
        if (data.status != 214)
          this.navCtrl.navigateRoot('/home');
      });
  }

  showToast(msg: string) {
    this.toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: "middle"
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }

  HideToast() {
    this.toast = this.toastCtrl.dismiss();
  }

}
