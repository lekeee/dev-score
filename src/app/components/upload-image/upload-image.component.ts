import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss',
})
export class UploadImageComponent {
  @Input() userId: number = -1;
  @Input() url = new FormControl();
  selectedImage: File | null = null;

  constructor(private userService: UserService) {}

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
      const extension = this.selectedImage.name.split('.').pop();
      const formData = new FormData();
      formData.append('image', this.selectedImage);
      this.userService.uploadImage(formData).subscribe();
    }
  }
}
