import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CancelamentoFinalizacaoPage } from './cancelamento-finalizacao.page';

const routes: Routes = [
  {
    path: '',
    component: CancelamentoFinalizacaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CancelamentoFinalizacaoPage]
})
export class CancelamentoFinalizacaoPageModule {}
