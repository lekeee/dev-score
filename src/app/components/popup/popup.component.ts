import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent {
  @Output() clickedYes = new EventEmitter();
  @Output() clickedNo = new EventEmitter();

  onYesClick() {
    this.clickedYes.emit();
  }

  onNoClick() {
    this.clickedNo.emit();
  }
}
