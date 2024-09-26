import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Post } from '../../core/models/post';
import { createPost } from '../../core/store/post/post.actions';
import { ResponseMessage } from '../../core/types/response-message';

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

  constructor(private store: Store) {}

  onSubmit() {
    if (this.createForm.invalid) return;

    this.store.dispatch(createPost({ post: this.createForm.value as Post }));
  }
}
