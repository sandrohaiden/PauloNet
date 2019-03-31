import { Component, OnInit } from '@angular/core';
import { ChamadoService } from 'src/app/services/chamado.service';
import Chamado from 'src/model/chamado';
import { NavController } from '@ionic/angular';
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

    this.chamadoService.fecharChamado(this.texto + tx, this.chamado.chamado);
    this.navCtrl.navigateRoot('/home');
  }
}
