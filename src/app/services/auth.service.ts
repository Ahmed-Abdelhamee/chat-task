import { Injectable } from '@angular/core';
import { profile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:profile={
    username:"",
    profile_phote:"",
    user_id:""
  }


  friends:profile[]=[]

  constructor() { }

  login(){
    //after login we set  user data 
    this.user.username="Ahmed";
    this.user.profile_phote="https://firebasestorage.googleapis.com/v0/b/chat-project-4f74c.appspot.com/o/postImages%2Fme0.jpg_0.03981685160304327?alt=media&token=cd137363-9d0e-4650-b1fa-f923b2c89853";
    this.user.user_id="user1";
  }

  get_user(){
    this.user.username="Ahmed";
    this.user.profile_phote="https://firebasestorage.googleapis.com/v0/b/chat-project-4f74c.appspot.com/o/postImages%2Fme0.jpg_0.03981685160304327?alt=media&token=cd137363-9d0e-4650-b1fa-f923b2c89853";
    this.user.user_id="user1";
    return this.user
  }

  getFriends(){
    return  this.friends=[
      {
        username:"user1",
        profile_phote:"assets/boy_avatar.png",
        user_id:"user1",
      },
      {
        username:"user2",
        profile_phote:"assets/pc2.jpg",
        user_id:"user2",
      },
      {
        username:"user3",
        profile_phote:"assets/man.png",
        user_id:"user3",
      }
    ]
  }

}
