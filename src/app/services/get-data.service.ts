import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Database } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { célébrités } from '../interfaces/célébrités.interface';
import { postView } from '../interfaces/postView.interface';
import { trending } from '../interfaces/trending.interface';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http:HttpClient , private database:Database) { }

  database_url:string=this.database.app.options.databaseURL!;

  posts_arr:postView[]=[]

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


   element_key:string=''


  posts():Observable<postView[]>{
    return this.http.get<postView[]>(`${this.database_url}/homepagePosts.json`);
  }

  get_posts(){
    this.posts_arr=[]
    this.posts().subscribe(data =>{
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          this.posts_arr.push(element)
        }
      }
    })
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



  // data:postView
  addPost(data:any){
    this.http.post(`${this.database_url}/homepagePosts.json`,data).subscribe( );
  }
  addLike(post_id:string,user_id:string){
    this.posts().subscribe(data=>{
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          if( post_id == element.post_id){ // we fetch the elements by for loop and get array key to delete the specific item
            this.http.put(`${this.database_url}/homepagePosts/${key}/likes.json`,{"user_id":user_id}).subscribe(()=>{});
          }
        }
      }
    })
  }


  updatePost(data_item:postView,updatePostText:string, post_id:string){
    data_item.post_text=updatePostText;
    this.posts().subscribe(data=>{
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          if( post_id == element.post_id){ // we fetch the elements by for loop and get array key to delete the specific item
            this.http.put(`${this.database_url}/homepagePosts/${key}.json`,data_item).subscribe(()=>{});
          }
        }
      }
    })
  }
  
  deletePost(post_id:string){
    // get firebase element to delete in the database 
    this.posts().subscribe(data=>{
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          if( post_id == element.post_id){ // we fetch the elements by for loop and get array key to delete the specific item
            this.http.delete(`${this.database_url}/homepagePosts/${key}.json`).subscribe(()=>{});
            console.log(key)
          }
        }
      }
    })
    

  }

  // getElementKey_from_posts_array(post_id:string){
  //   this.posts().subscribe(data=>{
  //     for (const key in data) {
  //       if (Object.prototype.hasOwnProperty.call(data, key)) {
  //         const element = data[key];
  //         if( post_id == element.post_id){ // we fetch the elements by for loop and get array key to delete the specific item
  //           this.element_key=key
  //         }
  //       }
  //     }
  //     // return this.element_key
  //   })
  // }


}
