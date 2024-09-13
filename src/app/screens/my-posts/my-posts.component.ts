import { Component, OnInit } from '@angular/core';
import { PostService } from '../../core/services/post/post.service';
import { Post } from '../../core/models/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.scss',
})
export class MyPostsComponent implements OnInit {
  myPosts: Post[] = [];
  idToDelete: number = -1;
  isPopupOpened: boolean = false;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.postService.getPostsByUser().subscribe({
      next: (posts: Post[]) => {
        this.myPosts = posts;
      },
      error: (err) => console.log(err),
    });
  }

  showPost(id: number | undefined) {
    this.router.navigate([`post/${id}`]);
  }

  deletePost() {
    this.postService.deletePost(this.idToDelete).subscribe({
      next: () => {
        this.myPosts = this.myPosts.filter(
          (post) => post.id !== this.idToDelete
        );
        this.idToDelete = -1;
        this.isPopupOpened = false;
      },
    });
  }

  openPopup(id: number) {
    this.idToDelete = id;
    this.isPopupOpened = true;
  }

  closePopup() {
    this.isPopupOpened = false;
    this.idToDelete = -1;
  }
}
