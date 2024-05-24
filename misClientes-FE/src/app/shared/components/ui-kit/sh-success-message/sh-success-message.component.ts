import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  signal,
  Signal,
  effect,
} from '@angular/core';

@Component({
  selector: 'sh-success-message',
  templateUrl: './sh-success-message.component.html',
  styleUrls: ['./sh-success-message.component.scss'],
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  animations: [
    trigger('succcess_msg', [
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate(
          '550ms linear',
          style({
            opacity: 1,
          })
        ),
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          // transform: "translateY(0px)"
        }),
        animate(
          '550ms linear',
          style({
            // transform: "translateY(-10px)",
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class ShSuccessMessageComponent implements OnInit {
  @Input() message: string = '';
  @Input() success_msg: boolean = false;
  @Input() error_msg: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  close_success_msg(): void {
    this.success_msg = false;
  }
}
