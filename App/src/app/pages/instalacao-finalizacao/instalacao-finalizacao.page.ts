import { Component, OnInit } from '@angular/core';
import Chamado from 'src/model/chamado';
import { FormGroup, FormControl } from '@angular/forms';
import { ChamadoService } from 'src/app/services/chamado.service';
import { NavController } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';

@Component({
  selector: 'app-instalacao-finalizacao',
  templateUrl: './instalacao-finalizacao.page.html',
  styleUrls: ['./instalacao-finalizacao.page.scss'],
})
export class InstalacaoFinalizacaoPage implements OnInit {

  public chamado: Chamado;
  public chamados: Chamado[];
  private formulario : FormGroup;

  constructor(public chamadoService: ChamadoService, public navCtrl: NavController,
    public brmasker: BrMaskerModule) { 
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

  concluir(){
    let vl = this.formulario.value;
    let tx = '\nDownload: '+vl.download+'  |  Upload:'+vl.upload
    +'  |  Ping: '+vl.ping+'  |  Cabo Início: '+vl.inicial+'  |  Cabo fim: '+vl.final;

    this.chamadoService.finalizarInstalacao(tx);
    this.navCtrl.navigateRoot('/home');
  }

}
