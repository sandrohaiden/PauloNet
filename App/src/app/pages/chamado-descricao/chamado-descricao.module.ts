import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChamadoDescricaoPage } from './chamado-descricao.page';

const routes: Routes = [
  {
    path: '',
    component: ChamadoDescricaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChamadoDescricaoPage]
})
export class DescricaoChamadoPageModule {}
