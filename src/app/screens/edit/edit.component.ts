import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseMessage } from '../../core/types/response-message';
import { PostService } from '../../core/services/post/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../core/models/post';

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

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.postService.getPost(this.id).subscribe({
      next: (post: Post) => {
        this.editForm.patchValue({
          title: post.title,
          description: post.description,
          language: post.language,
          code: post.code,
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

    if (this.editForm.invalid || this.editForm.pristine) return;

    if (title.dirty) updatePayload.title = title.value;
    if (description.dirty) updatePayload.description = description.value;
    if (language.dirty) updatePayload.language = language.value;
    if (code.dirty) updatePayload.code = code.value;

    this.postService.updatePost(this.id, updatePayload).subscribe({
      next: () => {
        this.editForm.markAsPristine();
        this.message.text = 'You have successfully updated your post';
        this.message.type = 'success';
        setTimeout(() => {
          this.router.navigate([`post/${this.id}`]);
        }, 500);
      },
      error: (err) => {
        this.message.text = err.error.message;
        this.message.type = 'error';
      },
    });
  }
}
