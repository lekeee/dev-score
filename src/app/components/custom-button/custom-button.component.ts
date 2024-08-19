import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';

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

  @ViewChild('button', { static: true })
  button!: ElementRef<HTMLButtonElement>;
  isSmall = false;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      this.checkButtonSize();

      window.addEventListener('resize', () => {
        this.checkButtonSize();
      });
    }
  }

  checkButtonSize() {
    const buttonWidth = this.button.nativeElement.offsetWidth;
    this.isSmall = buttonWidth < 120;
  }
}
