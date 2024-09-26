import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs';
import { LikeService } from '../../services/like/like.service';
import { PostService } from '../../services/post/post.service';
import * as actions from './post.actions';

@Injectable()
export class PostEffects {
  constructor(
    private action$: Actions,
    private postService: PostService,
    private likeService: LikeService,
    private router: Router
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

  deletePost = createEffect(() =>
    this.action$.pipe(
      ofType(actions.deletePost),
      switchMap((action) =>
        this.postService
          .deletePost(action.id)
          .pipe(map(() => actions.deletePostSuccess({ id: action.id })))
      )
    )
  );

  createPost = createEffect(() =>
    this.action$.pipe(
      ofType(actions.createPost),
      switchMap((action) =>
        this.postService.createPost(action.post).pipe(
          map((post) => actions.createPostSuccess({ post })),
          tap((action) => this.router.navigate([`post/${action.post.id}`]))
        )
      )
    )
  );

  updatePost = createEffect(() =>
    this.action$.pipe(
      ofType(actions.updatePost),
      switchMap((action) =>
        this.postService.updatePost(action.post.id!, action.post).pipe(
          map(() =>
            actions.updatePostSuccess({
              post: { id: action.post.id!, changes: action.post },
            })
          ),
          tap((action) => this.router.navigate([`post/${action.post.id}`]))
        )
      )
    )
  );
}
