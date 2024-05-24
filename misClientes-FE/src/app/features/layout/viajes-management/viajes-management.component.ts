import { Component, WritableSignal, inject, signal } from '@angular/core';
import { TableLayoutComponent } from '../../../shared/layouts/table-layout/table-layout.component';
import { NoAccessComponent } from '../../../shared/components/essential/no-access/no-access.component';
import { ShTableComponent } from '../../../shared/components/ui-kit/sh-table/sh-table.component';
import { ShModalComponent } from '../../../shared/components/ui-kit/sh-modal/sh-modal.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShButtonComponent } from '../../../shared/components/ui-kit/sh-button/sh-button.component';
import { ViajesManagementService } from '../../../shared/services/viajes-management/viajes-management.service';
import { HttpService } from '../../../core/http/http-service';
import { ShSuccessMessageComponent } from '../../../shared/components/ui-kit/sh-success-message/sh-success-message.component';
import { ɵBrowserAnimationBuilder } from '@angular/animations';
import { DateTime } from 'luxon';
import { ViajesManagementColumns } from './ViajesManagementColumns';
import numberFormat from '../../../shared/helpers/numberFormat';
import { SubHeaderComponent } from '../../../shared/components/essential/sh-sub-header/sub-header.component';

type dropdownType = {
  id: number;
  nombre: string;
};

@Component({
  selector: 'app-viajes-management',
  standalone: true,
  imports: [
    TableLayoutComponent,
    NoAccessComponent,
    ShTableComponent,
    ShModalComponent,
    CommonModule,
    FormsModule,
    ShButtonComponent,
    ShSuccessMessageComponent,
    SubHeaderComponent
  ],
  templateUrl: './viajes-management.component.html',
  styleUrl: './viajes-management.component.scss',
})
export class ViajesManagementComponent {
  public access = signal<boolean>(true);
  public unidades = signal<any[]>([{ id: 1, nombre: 'unidad test' }]);
  public rutas = signal<any[]>([{ id: 1, nombre: 'ruta test' }]);

  public show_msg = signal<boolean>(false);
	public error_msg = signal<boolean>(false);
	public msg = signal<string>("");

  public viajesManagementService: ViajesManagementService = inject(
    ViajesManagementService
  );
  public ViajesManagementColumns: ViajesManagementColumns = inject(
		ViajesManagementColumns,
	);
  public HttpService: HttpService = inject(HttpService);

  // Table
	public table_p: WritableSignal<number> = signal<number>(1);
	public table_pp: WritableSignal<number> = signal<number>(50);
	public table_title: WritableSignal<string> = signal<string>("Viajes");
	public table_loading: WritableSignal<boolean> = signal<boolean>(false);
	public table_data: WritableSignal<any[]> = signal<any[]>([]);
	public table_total_count: WritableSignal<string> = signal<string>("");
	public table_total_count_number: WritableSignal<number> = signal<number>(0);
	public table_params: WritableSignal<any> = signal<any>(null);
	public table_change_role_data: WritableSignal<
		{
			id: number;
			name: string;
		}[]
	> = signal<{ id: number; name: string }[]>([]);
	public toggle_loading: WritableSignal<boolean> = signal<boolean>(false);
	public title = "Viajes";

  // Modal
  public modal_opened: WritableSignal<boolean> = signal<boolean>(false);
  public all_requirements: WritableSignal<boolean> = signal<boolean>(false);
  public Loading: WritableSignal<boolean> = signal<boolean>(false);

  // ACTIONS
  private async ngOnInit(): Promise<void> {
    this.getDataModal();
    this.getTableData();
  }

  public async nextPage(): Promise<void> {
		this.table_p.set(this.table_p() + 1);

		let params_to_send: any = {};

		if (this.table_params()) {
			params_to_send = this.table_params();
			params_to_send.params.p = this.table_p();
		} else {
			params_to_send = {
				params: {
					p: this.table_p(),
					pp: this.table_pp(),
				},
			};
		}
		await this.getTableData(params_to_send);
	}

  // Table
	public async getTableData(params?: any) {
		this.table_loading.set(true);
		let params_call = params || {
			p: this.table_p(),
			pp: this.table_pp(),
		};
		try {
			let res = await this.viajesManagementService.getTableData(params_call);
			if (res) {
				this.table_total_count.set(
					numberFormat(res.data.resultRowsCount) + " records",
				);
				this.table_total_count_number.set(res.data.resultRowsCount);
				this.table_data.set(
					res.data.dataset.map((value: any) => {
						return { ...value, change_password: true };
					}),
				);
			}
			this.table_loading.set(false);
		} catch (e: any) {
			if (e.response.status === 403) {
				this.access.set(false);
			}
			await this.HttpService.handleError(e);
		}
	}

	public async backPage(): Promise<void> {
		this.table_p.set(this.table_p() - 1);
		let params_to_send: any = {};

		if (this.table_params()) {
			params_to_send = this.table_params();
			params_to_send.params.p = this.table_p();
		} else {
			params_to_send = {
				params: {
					p: this.table_p(),
					pp: this.table_pp(),
				},
			};
		}
		await this.getTableData(params_to_send);
	}

  async crearPresupuesto(form: any) {
    this.Loading.set(true);
    console.log(form.value)
    if (!form.valid) {
      this.Loading.set(false);
      return;
    } else {
      try {
        let body = { 
          id_ruta_ida: parseInt(form.value.id_ruta_ida),
          id_ruta_regreso: parseInt(form.value.id_ruta_regreso),
          id_unidad: parseInt(form.value.id_unidad),
          fecha_ida: DateTime.fromJSDate(form.value.fecha_ida),
          fecha_regreso: DateTime.fromJSDate(form.value.fecha_regreso),
          ...form.value
        };
        console.log(body)
        const res: any = await this.viajesManagementService.createViaje(body);
        if (res) {
          this.error_msg.set(false);
          this.msg.set('Viaje creado correctamente!');
          this.show_success_msg();
          this.Loading.set(false);
          this.closeModal()
        }
      } catch (err: any) {
        this.Loading.set(false);
        this.msg.set(err?.response?.data.msg || 'Error al crear viaje');
        this.error_msg.set(true);
        this.show_success_msg();
        console.log(err, '⛔️⛔️⛔️⛔️⛔️');
      }
    }
  }

  async getDataModal() {
    try {
      let res: any = await this.viajesManagementService.getRutasDD();
      if (res) {
        const data = res.data;
        this.rutas.set(data);
      }

      res = await this.viajesManagementService.getUnidadesDD();
      if (res) {
        const data = res.data;
        this.unidades.set(data);
      }
    } catch (e: any) {
      await this.HttpService.handleError(e);
    }
  }

  private show_success_msg(): void {
		this.show_msg.set(true);
		setTimeout(() => {
			this.show_msg.set(false);
		}, 5000);
	}

  rutaResumen(event: any) {}

  closeModal() {
    this.modal_opened.set(!this.modal_opened());
  }
}
