import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BrMaskerModule } from 'br-mask';

import { InstalacaoFinalizacaoPage } from './instalacao-finalizacao.page';

const routes: Routes = [
  {
    path: '',
    component: InstalacaoFinalizacaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    BrMaskerModule,
    ReactiveFormsModule
  ],
  declarations: [InstalacaoFinalizacaoPage]
})
export class InstalacaoFinalizacaoPageModule {}
