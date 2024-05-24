import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { LayoutComponent } from './shared/layouts/layout/layout.component';

export const routes: Routes = [
	{ path: "", redirectTo: "login", pathMatch: "full" },
	{ path: "login", component: LoginComponent },
	{
		path: "layout",
		loadComponent: () => import('./shared/layouts/layout/layout.component').then(m => m.LayoutComponent),
		children: [
			{
				title: "Viajes Management",
				path: "viajes-management",
				loadComponent: () => import('./features/layout/viajes-management/viajes-management.component').then(m => m.ViajesManagementComponent)
			}
	]},
];
