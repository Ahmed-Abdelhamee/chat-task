import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { célébrités } from 'src/app/interfaces/célébrités.interface';
import { postView } from 'src/app/interfaces/postView.interface';
import { profile } from 'src/app/interfaces/profile.interface';
import { trending } from 'src/app/interfaces/trending.interface';
import { AuthService } from 'src/app/services/auth.service';
import { GetDataService } from 'src/app/services/get-data.service';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {


  constructor(private formbuilder:FormBuilder , private getDataService:GetDataService , private authService:AuthService ) { 
    $(".formEdit").removeClass('formEdit');

  }

  profileImg:string='';

  posts:postView[]=[]
  trend_arr:trending[]=[]
  celebrites_arr:célébrités[]=[]
  
  newPost=this.formbuilder.group({
    username:["",Validators.required],
    profile_phote:["",Validators.required],
    post_phote:["",Validators.required],
    post_text:["",Validators.required],
    user_id:["",Validators.required],
    post_id:[0,Validators.required],
  })


  updatePostText=this.formbuilder.group({
    post_text:["",Validators.required],
  })


  // control show
  open_Edit_form:boolean=false;

  
  ngOnInit(): void {
    $(".homelink").addClass("active");

    this.profileImg="assets/boy_avatar.png";

    this.posts= this.getDataService.get_posts();
    this.trend_arr= this.getDataService.get_trending();
    this.celebrites_arr= this.getDataService.get_célébrités();
  }

  // for sidebar style
  set_LinkStyle(link:string){
    $(".homelink").removeClass("active");
    $(`.notification`).removeClass("active");
    $(`.profilelink`).removeClass("active");
    $(`.chatLink`).removeClass("active");
    $(`.friendchatLink`).removeClass("active");
    $(`.our-chat`).removeClass("active");
    $(`.${link}`).addClass("active");
  }


  
  // form for add post 
  addPost(){
    this.authService.login()
    let user:profile=this.authService.user;
    this.newPost.patchValue({
      username:user.username,
      profile_phote:user.profile_phote,
      user_id:user.user_id,
      post_id:this.posts.length+1
    })

    this.getDataService.addPost(this.newPost.value)
  }



  // code for post edit
  updatePost(index:number){
    $(`#${index}`).hide()
    $(`._${index}`).removeClass('formEdit');   
  }
  closeThisForm(post:postView,post_id:number,index:number){
    $(`#${index}`).show()
    $(`._${index}`).addClass('formEdit');   
    this.sendUpdatePost(post,post_id)
  }
  sendUpdatePost(post:postView, post_id:number){
    this.getDataService.updatePost(post,this.updatePostText.get("post_text")?.value,post_id);
  }


  // code for delete edit
  deletePost(post_id:number){
    this.getDataService.deletePost(post_id)
  }












}
