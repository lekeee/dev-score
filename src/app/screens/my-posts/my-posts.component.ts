import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Post } from '../../core/models/post';
import { deletePost } from '../../core/store/post/post.actions';
import { selectMyPosts } from '../../core/store/post/post.selectors';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.scss',
})
export class MyPostsComponent implements OnInit {
  myPost$: Observable<Post[]> = of([]);
  idToDelete: number = -1;

  isPopupOpened = new BehaviorSubject<boolean>(false);

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.myPost$ = this.store.select(selectMyPosts);
    //this.myPost$.subscribe((res) => console.log(res));
  }

  showPost(id: number | undefined) {
    this.router.navigate([`post/${id}`]);
  }

  deletePost() {
    this.isPopupOpened.next(false);
    this.store.dispatch(deletePost({ id: this.idToDelete }));
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
