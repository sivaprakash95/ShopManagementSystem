import {Injectable} from '@angular/core'
import {Post}from './post.model';
import {Subject} from 'rxjs'
import {map} from "rxjs/operators"
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn:'root'
})
export class PostService{
  private posts:Post[] = [];
  private postsUpdated = new Subject<Post[]>()

  constructor(private http:HttpClient){}

  getPosts(){
    this.http.get<{message:string, posts:any}>("http://localhost:3000/api/posts")
    .pipe(map((postData)=>{
      return postData.posts.map((post:any)=>{
        return {
          id: post._id,
          title: post.title,
          content: post.content
        }
      })
    }))
    .subscribe((postData)=>{
      this.posts = postData;
      this.postsUpdated.next([...this.posts]);
    })
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title:String, content:String){
    const post:Post = {id:"", title:title,content:content}

    this.http.post<{message: string, postId: string}>("http://localhost:3000/api/posts", post)
    .subscribe((responsedData)=>{
      const postId = responsedData.postId;
      console.log(responsedData.message)
      post.id = postId;
      this.posts.push(post)
      this.postsUpdated.next([...this.posts]);
    })

  }

  deletePost(postId:string){
    this.http.delete("http://localhost:3000/api/posts/" + postId)
    .subscribe((deletedPost)=>{
      console.log(deletedPost);
      this.posts = this.posts.filter(post => post.id != postId)
      this.postsUpdated.next([...this.posts]);
    })
  }
}
