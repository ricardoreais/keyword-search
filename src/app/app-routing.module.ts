import { Routes } from '@angular/router';
import { Test1Component } from './test1/test1.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'test-1'
  },
  {
    path: 'test-1',
    component: Test1Component
  }
];
