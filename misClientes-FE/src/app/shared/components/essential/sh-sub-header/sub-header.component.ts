import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { ShButtonComponent } from "../../ui-kit/sh-button/sh-button.component";
import { ShTitleComponent } from "../sh-title/sh-title.component";

@Component({
	selector: "sh-sub-header",
	templateUrl: "./sub-header.component.html",
	styleUrls: ["./sub-header.component.scss"],
	standalone: true,
	imports: [CommonModule, ShButtonComponent, ShTitleComponent]
})
export class SubHeaderComponent implements OnInit {
	@Input() Back_Btn: boolean = false;
	@Input() New_Component_Button: boolean = false;
	@Input() Next_Button: boolean = false;
	@Input() Next_Button_Disabled: boolean = false;
	@Input() Next_Button_Loading: boolean = false;
	@Input() Refresh_Button: boolean = false;

	@Input() CustomizeButtonsList: {
		title: string;
		icon: string;
		disabled: boolean;
		index: number;
		type: string; //'outlined' | 'filled'
	}[] = [];

	@Output() Customize = new EventEmitter<any>();
	@Output() Next = new EventEmitter<void>();
	@Output() CSVAssign = new EventEmitter<any>();
	@Output() CSVDownload = new EventEmitter<any>();
	@Output() Create = new EventEmitter<any>();
	@Output() ChooseLayout = new EventEmitter<any>();
	@Output() Success = new EventEmitter<any>();
	@Output() Refresh = new EventEmitter<any>();
	@Output() BackButton = new EventEmitter<any>();
	@Output() customizeButtonsListFunctions = new EventEmitter<any>();

	constructor() {}

	ngOnInit(): void {}

	assignCsv() {
		this.CSVAssign.emit();
	}

	successfull(): void {
		this.Success.emit({
			active: true,
		});
	}

	back() {
		this.BackButton.emit({
			active: true,
		});
	}

	next() {
		if (!this.Next_Button_Disabled) this.Next.emit();
	}

	refresh(): void {
		this.Refresh.emit({});
	}

	create(): void {
		this.Create.emit({
			active: true,
		});
	}

	customizeButtonsList(index: number) {
		this.customizeButtonsListFunctions.emit({
			index: index,
		});
	}
}
