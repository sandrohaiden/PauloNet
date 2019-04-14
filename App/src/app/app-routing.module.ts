import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'chamado/descricao', loadChildren: './pages/chamado-descricao/chamado-descricao.module#DescricaoChamadoPageModule' },
  { path: 'fechamento', loadChildren: './pages/fechamento/fechamento.module#FechamentoPageModule' },
  { path: 'instalacao', loadChildren: './pages/instalacao-descricao/instalacao-descricao.module#InstalacaoDescricaoPageModule' },
  { path: 'finalizacao', loadChildren: './pages/instalacao-finalizacao/instalacao-finalizacao.module#InstalacaoFinalizacaoPageModule' },
  { path: 'cancelamento', loadChildren: './pages/cancelamento-finalizacao/cancelamento-finalizacao.module#CancelamentoFinalizacaoPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
