import {Component} from '@angular/core';
import {NgForm} from '@angular/forms'
import {PostService} from '../post.service'
import {Post} from '../post.model'

@Component({
  selector:'app-post-create',
  templateUrl:'./post-create.componenet.html',
  styleUrls:['./post-create.component.css']
})
export class PostCreateComponent {

  constructor(public postService:PostService){}

  onAddPost(formPost:NgForm){
    if(formPost.invalid){
      return;
    }
    this.postService.addPost(formPost.value.title, formPost.value.content);
    formPost.resetForm()
  }
}
