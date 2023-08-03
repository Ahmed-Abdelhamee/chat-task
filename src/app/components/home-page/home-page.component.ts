import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { célébrités } from 'src/app/interfaces/célébrités.interface';
import { postView } from 'src/app/interfaces/postView.interface';
import { profile } from 'src/app/interfaces/profile.interface';
import { trending } from 'src/app/interfaces/trending.interface';
import { AuthService } from 'src/app/services/auth.service';
import { GetDataService } from 'src/app/services/get-data.service';

// import {AngularFireStorage} from '@angular/fire/compat/storage'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {


  constructor(private formbuilder:FormBuilder , private getDataService:GetDataService ,
              private authService:AuthService , private firestorage:AngularFireStorage) {
       
    $(".formEdit").removeClass('formEdit');

  }

  postPhoto:string='';
  cuurent_user:profile={
    username:"",
    profile_phote:"",
    user_id:""
  }

  posts:postView[]=[]
  trend_arr:trending[]=[]
  celebrites_arr:célébrités[]=[]
  
  newPost=this.formbuilder.group({
    username:[""],
    profile_phote:[""],
    post_phote:["",Validators.required],
    post_text:["",Validators.required],
    likes:[[""]],
    user_id:[""],
    post_id:[""],
  })

  updatePostText=this.formbuilder.group({
    post_text:["",Validators.required],
  })


  // control show
  open_Edit_form:boolean=false;
  uploading:boolean=false;
  
  ngOnInit(): void {
    $(".homelink").addClass("active");
    this.cuurent_user=this.authService.get_user()!; // get user proile image
    this.posts= this.getDataService.get_posts(); // array of posts
    this.trend_arr= this.getDataService.get_trending();// array of trend
    this.celebrites_arr= this.getDataService.get_célébrités();// array of celebrites

  }

  // for sidebar style & show
  set_LinkStyle(link:string){
    $(".homelink").removeClass("active");
    $(`.notification`).removeClass("active");
    $(`.profilelink`).removeClass("active");
    $(`.chatLink`).removeClass("active");
    $(`.friendchatLink`).removeClass("active");
    $(`.our-chat`).removeClass("active");
    $(`.${link}`).addClass("active");
  }


  // funcion to upload img file and get image url
  async uploadImg(event:any){
    this.uploading=true;
    const file=event.target.files[0];
    if(file){
      const path=`postImages/${file.name}_${Math.random()}`;
      const uploadTask = await this.firestorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      console.log(url)
      this.postPhoto=url;
    }
    this.uploading=false;
  }
  
  // form for add post 
  addPost(){
    let date= new Date();
    this.authService.login()
    let user:profile=this.authService.user;
    this.newPost.patchValue({
      username:user.username,
      profile_phote:user.profile_phote,
      post_phote:this.postPhoto,
      user_id:user.user_id,
      post_id:`${user.username}__${date.toLocaleDateString()}__${date.toLocaleTimeString()}`
    })
    if(this.newPost.valid){
      this.getDataService.addPost(this.newPost.value)
      this.posts=[] //empty the array 
      setTimeout(() => {
        this.posts= this.getDataService.get_posts();// refill the array with new items
      }, 1000);
      this.newPost.patchValue({
        username:"",
        profile_phote:"",
        post_phote:"",
        post_text:"",
        user_id:"",
        post_id:""
      })
      this.postPhoto=""
    }
  }


  // code for control view to open edit form
  updatePost(index:number, item:postView){
    $(`#${index}`).hide()
    $(`._${index}`).removeClass('formEdit');
    this.updatePostText.patchValue({
      post_text:item.post_text
    })
  }
  // code for control view to close edit form
  closeThisForm(post:postView,post_id:string,index:number){
    $(`#${index}`).show()
    $(`._${index}`).addClass('formEdit');   
    this.sendUpdatePost(post,post_id)
  }
  // code for make edit form
  sendUpdatePost(post:postView, post_id:string){
    this.getDataService.updatePost(post!,this.updatePostText.get("post_text")?.value!,post_id);
  }


  // code for delete edit
  deletePost(post_id:string){
    this.getDataService.deletePost(post_id);
    this.posts=[]
    setTimeout(() => {
      this.posts= this.getDataService.get_posts();
    }, 1000);
  }




  addLike(post_id:string){
    this.getDataService.addLike(post_id,this.cuurent_user.user_id)
  }


  check(){

  }




}
