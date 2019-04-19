import { Component, OnInit } from '@angular/core';
import Chamado from 'src/model/chamado';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChamadoService } from 'src/app/services/chamado.service';
import { NavController, ToastController } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';

@Component({
  selector: 'app-instalacao-finalizacao',
  templateUrl: './instalacao-finalizacao.page.html',
  styleUrls: ['./instalacao-finalizacao.page.scss'],
})
export class InstalacaoFinalizacaoPage implements OnInit {

  public chamado: Chamado;
  public chamados: Chamado[];
  private formulario: FormGroup;
  private toast: any;

  constructor(public chamadoService: ChamadoService, public navCtrl: NavController,
    public brmasker: BrMaskerModule, public toastCtrl: ToastController) {
    this.formulario = new FormGroup({
      download: new FormControl(),
      upload: new FormControl(),
      ping: new FormControl(),
      inicial: new FormControl(),
      final: new FormControl()
    })
  }

  ngOnInit() {
    this.chamadoService.currentMessage.subscribe(inst => this.chamado = inst);
    console.log(this.chamado);
  }

  concluir() {
    let { download, upload, ping, inicial, final } = this.formulario.controls;

    if (!this.formulario.valid) {
      this.showToast('Preencha todos os campos corretamente!');
    }
    else {
      let vl = this.formulario.value;
      let tx = '\nDownload: ' + vl.download + '  |  Upload:' + vl.upload
        + '  |  Ping: ' + vl.ping + '  |  Cabo Início: ' + vl.inicial + '  |  Cabo fim: ' + vl.final;

      this.chamadoService.finalizarInstalacao(tx, this.chamado.id);
      this.navCtrl.navigateRoot('/home');
    }
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
