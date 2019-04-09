import { Component } from '@angular/core';
import Chamado from 'src/model/chamado';
import { NavController, Platform } from '@ionic/angular';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public chamado: Chamado;
  public chamados: Chamado[]=[];

  constructor(public navCtrl: NavController, public chamadoService: ChamadoService,
    private plat: Platform){}

  ngOnInit(){
    this.chamadoService.currentMessage.subscribe(cham => this.chamado = cham);
    this.chamadoService.chamadosAtual.subscribe(chams => this.chamados = chams);
    this.list();
    //this.plat.backButton()
  }

  changeObj(cham){
    this.chamado = cham
    this.chamadoService.changeMessage(this.chamado);
  }

  goToDescricao(cham){
    this.changeObj(cham);
    this.navCtrl.navigateForward('chamado/descricao');
  }

  goToInstalacao(cham){
    this.changeObj(cham);
    this.navCtrl.navigateForward('/instalacao');
  }

  list(){
    return this.chamadoService.getChamados()
    .subscribe(resposta => {
      console.log('dados da tabela:', resposta);
      return this.chamados = resposta.json();
    })
  }

  fechar(){
    navigator[`app`].exitApp();
  }
}