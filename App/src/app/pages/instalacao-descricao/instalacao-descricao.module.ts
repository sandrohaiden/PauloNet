import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InstalacaoDescricaoPage } from './instalacao-descricao.page';

const routes: Routes = [
  {
    path: '',
    component: InstalacaoDescricaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InstalacaoDescricaoPage]
})
export class InstalacaoDescricaoPageModule {}
