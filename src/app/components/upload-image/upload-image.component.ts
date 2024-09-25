import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { updateImage } from '../../core/store/user/user.actions';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss',
})
export class UploadImageComponent {
  @Input() url = new FormControl();
  selectedImage: File | null = null;

  constructor(private store: Store) {}

  onChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(input.files[0]);
      reader.onload = (event: any) => this.url.setValue(event.target.result);
      this.onUpload();
    }
  }

  onUpload() {
    if (this.selectedImage) {
      this.store.dispatch(updateImage({ image: this.selectedImage }));
    }
  }
}
