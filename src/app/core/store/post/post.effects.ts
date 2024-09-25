import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { LikeService } from '../../services/like/like.service';
import { PostService } from '../../services/post/post.service';
import * as actions from './post.actions';

@Injectable()
export class PostEffects {
  constructor(
    private action$: Actions,
    private postService: PostService,
    private likeService: LikeService
  ) {}

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

  likePost = createEffect(() =>
    this.action$.pipe(
      ofType(actions.likePost),
      switchMap((action) =>
        this.likeService.createLike({ postId: action.id }).pipe(
          map((res) => {
            return actions.likePostSuccess({ id: action.id });
          })
        )
      )
    )
  );

  unlikePost = createEffect(() =>
    this.action$.pipe(
      ofType(actions.unlikePost),
      switchMap((action) =>
        this.likeService.deleteLike(action.id).pipe(
          map((res) => {
            return actions.unlikePostSuccess({ id: action.id });
          })
        )
      )
    )
  );

  loadTrendingPosts = createEffect(() =>
    this.action$.pipe(
      ofType(actions.loadTrendingPosts),
      switchMap((action) =>
        this.postService
          .getTrendingPosts()
          .pipe(map((posts) => actions.loadTrendingPostsSuccess({ posts })))
      )
    )
  );

  loadMyPosts = createEffect(() =>
    this.action$.pipe(
      ofType(actions.loadMyPosts),
      switchMap((action) =>
        this.postService
          .getPostsByUser()
          .pipe(map((posts) => actions.loadMyPostsSuccess({ posts })))
      )
    )
  );
}
