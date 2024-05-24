import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sh-toggle',
  templateUrl: './sh-toggle.component.html',
  styleUrls: ['./sh-toggle.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ShToggleComponent {
  @Input() active: boolean = false;
  @Input() loading: boolean = false;

  @Output() action = new EventEmitter<any>();

  changeToggle() {
    if (!this.loading) {
      this.active = !this.active;

      if (this.action) {
        this.action.emit(this.active);
      }
    }
  }
}
