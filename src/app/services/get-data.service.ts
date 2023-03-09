import { Injectable } from '@angular/core';
import { célébrités } from '../interfaces/célébrités.interface';
import { postView } from '../interfaces/postView.interface';
import { trending } from '../interfaces/trending.interface';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  database_url:string="";

  posts_arr:postView[]=[
    {
      username:"hello username",
      profile_phote:"assets/boy.png",
      post_text:"hello post_text",
      post_phote:"assets/pc1.jpg",
      post_id:1,
      user_id:424
    },
    {
      username:"hello username 2",
      profile_phote:"assets/who.png",
      post_text:"hello post_text 2",
      post_phote:"assets/pc2.jpg",
      post_id:2,
      user_id:54
    },
    {
      username:"hello username 3",
      profile_phote:"assets/man.png",
      post_text:"hello post_text 33",
      post_phote:"assets/library.png",
      post_id:3,
      user_id:14
    },
    {
      username:"hello username 4",
      profile_phote:"assets/userr.png",
      post_text:"hello post_text 44",
      post_phote:"assets/login5.jpg",
      post_id:4,
      user_id:704
    }
  ]


  trend_arr:trending[]=[
   {
    terndImg:"assets/userr.png",
    textTernd:"hello from our chat data",
    id:1
   },
   {
    terndImg:"assets/library.png",
    textTernd:"this is a new trend now",
    id:2
   },
   {
    terndImg:"assets/who.png",
    textTernd:"welcome to our trend time",
    id:3
   },
  ]


  célébrités_arr:célébrités[]=[
    {
     photo:"assets/userr.png",
     name:"username 1",
     id:1
    },
    {
      photo:"assets/library.png",
     name:"username 2",
     id:2
    },
    {
      photo:"assets/who.png",
     name:"username 3",
     id:3
    },
   ]



  constructor() { }

  get_posts(){
    // this.http.get<postView[]>(`${this.database_url}/.json`)
    return this.posts_arr;
  }

  get_trending(){
    // this.http.get<postView[]>(`${this.database_url}/.json`)
    return this.trend_arr;
  }

  get_célébrités(){
    // this.http.get<postView[]>(`${this.database_url}/.json`)
    return this.célébrités_arr;
  }



  
  addPost(data:postView){
    // this.http.post(`${this.url}/.json`,data).subscribe( );
    console.log(data);
    this.posts_arr.push(data)
  }

  updatePost(data:postView,updatePostText:string, post_id:number){
    // this.http.post(`${this.url}/.json`,data).subscribe( );

    let index = this.posts_arr.indexOf(this.posts_arr.find(item => item.post_id==post_id)!);
    data.post_text=updatePostText;
    this.posts_arr[index]=data;
    // console.log(this.posts_arr[index])
  }
  
  deletePost(post_id:number){
    // this.http.post(`${this.url}/.json`).subscribe( );

    let index = this.posts_arr.indexOf(this.posts_arr.find(item => item.post_id==post_id)!);
    this.posts_arr.splice(index,1)
  }
}
