import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Subject, Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPost, PostResponse } from './../post.model';
const POSTS_URL = 'posts';

@Injectable({
  providedIn: 'root',
})
export class WordpressService {
  posts!: IPost[];
  post$: Subject<IPost> = new Subject();

  constructor(private http: HttpClient) {}

  getPosts(): Observable<IPost[]> {
    if (this.posts) {
      return of(this.posts);
    }

    return this.http
      .get<PostResponse>(`${environment.WORDPRESS_REST_URL}${POSTS_URL}`)
      .pipe(
        tap((postsResponse) => (this.posts = postsResponse.posts)),
        mergeMap((postsResponse) => {
          const posts = postsResponse.posts;
          return of(posts);
        })
      );
  }

  getPost(id: number) {
    if (this.posts) {
      const post = this.posts.find((p) => p.id === id);
      if (post) {
        this.post$.next(post);
      }
    }

    this.http
      .get<IPost>(`${environment.WORDPRESS_REST_URL}${POSTS_URL}/${id}`)
      .subscribe((post) => this.post$.next(post));
  }
}
