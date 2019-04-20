import { Component, OnInit } from '@angular/core';
import { ChamadoService } from 'src/app/services/chamado.service';
import Chamado from 'src/model/chamado';
import { NavController, ToastController } from '@ionic/angular';
import { BrMaskDirective, BrMaskModel, BrMaskerModule } from 'br-mask';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-fechamento',
  templateUrl: './fechamento.page.html',
  styleUrls: ['./fechamento.page.scss'],
})
export class FechamentoPage implements OnInit {
  public texto: string;
  public chamado: Chamado;
  public chamados: Chamado[];
  private formulario: FormGroup;
  private toast: any;

  constructor(public chamadoService: ChamadoService, public navCtrl: NavController,
    public brmasker: BrMaskerModule, public toastCtrl: ToastController) {

    this.formulario = new FormGroup({
      desc: new FormControl(),
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

    if (!this.formulario.valid) {
      this.showToast('Preencha todos os campos corretamente!');
    }
    else {
      let vl = this.formulario.value;
      let tx = '\nDownload: ' + vl.download + '  |  Upload:' + vl.upload
        + '  |  Ping: ' + vl.ping + '  |  Cabo Início: ' + vl.inicial + '  |  Cabo fim: ' + vl.final;

      this.chamadoService.fecharChamado(this.texto + tx, this.chamado.id)
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
