import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablePageComponent } from './table-page/table-page.component';


const routes: Routes = [
  {path: '', component: TablePageComponent},
  {path: 'info/:id', loadChildren: () => import('./info-page/info-page.module').then(m => m.InfoPageModule)},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

