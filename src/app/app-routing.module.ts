import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadChildren: () => import('././pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'transactions',
        loadChildren: () => import('././pages/transaction/transaction.module').then(m => m.TransactionModule)
      },
      {
        path: 'category',
        loadChildren: () => import('././pages/category/category.module').then(m => m.CategoryModule)
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
