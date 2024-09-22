import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss',
})
export class CustomButtonComponent {
  @Input() text: string = '';
  @Input() type: string = '';
  @Input() icon: string = '';
  @Input() class: string = 'gold-hover';

  @Output() buttonClick = new EventEmitter();

  @ViewChild('button', { static: true })
  button!: ElementRef<HTMLButtonElement>;
  isSmall = false;

  constructor(private cdr: ChangeDetectorRef) {}

  onClick() {
    this.buttonClick.emit();
  }

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      this.checkButtonSize();

      fromEvent(window, 'resize').subscribe(() => this.checkButtonSize());

      fromEvent(this.button.nativeElement, 'click').subscribe(() => {
        this.onClick();
      });
    }
  }

  checkButtonSize() {
    const buttonWidth = this.button.nativeElement.offsetWidth;
    const isSmall = buttonWidth < 120;

    if (this.isSmall !== isSmall) {
      this.isSmall = isSmall;
      this.cdr.detectChanges();
    }
  }
}
