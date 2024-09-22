import { Component, OnInit } from '@angular/core';
import { PostService } from '../../core/services/post/post.service';
import { Post } from '../../core/models/post';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.scss',
})
export class MyPostsComponent implements OnInit {
  myPost$: Observable<Post[]> = of([]);
  idToDelete: number = -1;

  isPopupOpened = new BehaviorSubject<boolean>(false);

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.myPost$ = this.postService.getPostsByUser();
    //this.myPost$.subscribe((res) => console.log(res));
  }

  showPost(id: number | undefined) {
    this.router.navigate([`post/${id}`]);
  }

  deletePost() {
    this.postService
      .deletePost(this.idToDelete)
      .pipe(
        switchMap(() => this.postService.getPostsByUser()),
        tap(() => {
          this.idToDelete = -1;
          this.isPopupOpened.next(false);
        })
      )
      .subscribe((posts) => {
        this.myPost$ = of(posts);
      });
  }

  openPopup(id: number) {
    this.idToDelete = id;
    this.isPopupOpened.next(true);
  }

  closePopup() {
    this.idToDelete = -1;
    this.isPopupOpened.next(false);
  }

  openEditView(id: number) {
    this.router.navigate([`edit/${id}`]);
  }
}
