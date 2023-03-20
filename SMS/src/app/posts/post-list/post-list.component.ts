import {Component, OnDestroy, OnInit} from '@angular/core'
import {Subscription} from 'rxjs'

import {Post} from '../post.model'
import {PostService} from '../post.service'

@Component({
  selector:'app-post-list',
  templateUrl:'./post-list.component.html',
  styleUrls:['./post-list.component.css']
})

export class PostListCompomemt implements OnInit, OnDestroy{

  posts : Post[] = [];
  private postsSub : Subscription = new Subscription();

  constructor(public postService:PostService){}

  ngOnInit(): void {
    this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdateListener()
    .subscribe((post:Post[])=>{
      this.posts = post;
    })
  }

  ngOnDestroy():void{
    this.postsSub.unsubscribe()
  }

  onDelete(postId:string){
    this.postService.deletePost(postId)
  }
}
