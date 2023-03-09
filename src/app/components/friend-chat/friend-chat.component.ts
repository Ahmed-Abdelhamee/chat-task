import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { chatAarry } from 'src/app/interfaces/chatArray.interface';
import { profile } from 'src/app/interfaces/profile.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-friend-chat',
  templateUrl: './friend-chat.component.html',
  styleUrls: ['./friend-chat.component.scss']
})
export class FriendChatComponent implements OnInit  {


  user:profile={
    username:"",
    profile_phote:"",
    user_id:"",
  }

  constructor(private chatServ:ChatService , private authServ:AuthService, private formbuilder:FormBuilder) { }

  
  chatArray:chatAarry[]=[]
 
  chatId:string="" ;

  friend_id:string=""

  friends:profile[]=[]

  sendMessage=this.formbuilder.group({
    user_id_for_send:["",Validators.required],
    message:["",Validators.required],
  })

  ngOnInit(): void {
    this.user=this.authServ.getFriends()[1]
    this.friends=this.authServ.getFriends()

    console.log(this.user)
  }

  setchat(event:any){
    this.friend_id=event.target.value;
    let chatid=this.user.user_id+this.friend_id;
    this.chatId=chatid;// for control the HTML-view and sure that only this chat be viewed
    this.chatArray=this.chatServ.get_chat(chatid); // change main chat array data 
    console.log(this.chatArray)

  }

  save(){
    this.sendMessage.patchValue({
      user_id_for_send:this.user.user_id
    })
    this.chatServ.post_message(this.sendMessage.value,this.friend_id)
  }

}
