import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Post } from '../../core/models/post';
import { findMyPost, updatePost } from '../../core/store/post/post.actions';
import { selectPost } from '../../core/store/post/post.selectors';
import { ResponseMessage } from '../../core/types/response-message';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent implements OnInit {
  editForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    language: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
  });

  message: ResponseMessage = { type: '', text: '' };
  id: number = -1;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.store.dispatch(findMyPost({ id: this.id }));

    this.store.select(selectPost).subscribe({
      next: (post) => {
        this.editForm.patchValue({
          title: post?.title,
          description: post?.description,
          language: post?.language,
          code: post?.code,
        });
      },
    });
  }

  onSubmit() {
    const updatePayload: Partial<Post> = {};
    const title = this.editForm.get('title') as FormControl;
    const description = this.editForm.get('description') as FormControl;
    const language = this.editForm.get('language') as FormControl;
    const code = this.editForm.get('code') as FormControl;

    updatePayload.id = this.id;
    if (this.editForm.invalid || this.editForm.pristine) return;
    if (title.dirty) updatePayload.title = title.value;
    if (description.dirty) updatePayload.description = description.value;
    if (language.dirty) updatePayload.language = language.value;
    if (code.dirty) updatePayload.code = code.value;

    this.store.dispatch(updatePost({ post: updatePayload }));
    this.editForm.markAsPristine();
  }
}
