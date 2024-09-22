import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '../../services/post/post.service';
import * as actions from './post.actions';
import { map, switchMap } from 'rxjs';

@Injectable()
export class PostEffects {
  constructor(private action$: Actions, private postService: PostService) {}

  loadPosts = createEffect(() =>
    this.action$.pipe(
      ofType(actions.loadPosts),
      switchMap(() => {
        return this.postService.getPosts().pipe(
          map((posts) => {
            return actions.loadPostsSuccess({ posts });
          })
        );
      })
    )
  );
}
