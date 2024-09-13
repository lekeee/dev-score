import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { PostService } from '../services/post/post.service';
import { map } from 'rxjs';
import { Post } from '../models/post';

export const postOwnerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const postService = inject(PostService);
  const router = inject(Router);

  const userId = authService.getAuthId();
  const postId = route.params['id'];

  return postService.getPost(postId).pipe(
    map((post: Post) => {
      if (post.user?.id === userId) {
        return true;
      } else {
        router.navigate(['']);
        return false;
      }
    })
  );
};
