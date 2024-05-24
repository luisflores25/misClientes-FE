import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./shared/layouts/layout/layout.component";
import { LoginComponent } from "./features/login/login.component";
import { ViajesManagementComponent } from "./features/layout/viajes-management/viajes-management.component";

const routes: Routes = [
	{ path: "", redirectTo: "login", pathMatch: "full" },
	{ path: "login", component: LoginComponent },
	{
		path: "layout",
		component: LayoutComponent,
		children: [
			{
				title: "Viajes",
				path: "viajes-management",
				component: ViajesManagementComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
