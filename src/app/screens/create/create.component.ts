import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseMessage } from '../../core/types/response-message';
import { PostService } from '../../core/services/post/post.service';
import { Post } from '../../core/models/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  createForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    language: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
  });

  message: ResponseMessage = { type: '', text: '' };

  constructor(private postService: PostService, private router: Router) {}

  onSubmit() {
    if (this.createForm.invalid) return;

    this.postService.createPost(this.createForm.value as Post).subscribe({
      next: (res) => {
        this.message.text = 'Your post has been successfully created.';
        this.message.type = 'success';
        setTimeout(() => {
          this.router.navigate([`post/${res.id}`]);
        }, 1000);
      },
      error: (err) => console.log(err),
    });
  }
}
