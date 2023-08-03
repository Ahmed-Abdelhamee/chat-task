import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { chatAarry } from 'src/app/interfaces/chatArray.interface';
import { profile } from 'src/app/interfaces/profile.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {


  me:profile={
    username:"",
    profile_phote:"",
    user_id:"",
  }

  // friend:profile={
  //   username:"",
  //   profile_phote:"",
  //   user_id:"",
  // }

  constructor(private chatServ:ChatService , private authServ:AuthService, private formbuilder:FormBuilder) { }

  
  chatArray:chatAarry[]=[]
 
  chatId:string="" ;

  friends:profile[]=[]

  friend_id:string=""

  sendMessage=this.formbuilder.group({
    user_id_for_send:["",Validators.required],
    message:["",Validators.required],
  })

  ngOnInit(): void {
    this.me=this.authServ.getFriends()[0]
    // this.friend_id=this.authServ.getFriends()[1].user_id
    this.friends=this.authServ.getFriends()

    console.log(this.me)

  }

  setchat(event:any){
    this.friend_id=event.target.value;
    let chatid=this.me.user_id+this.friend_id;
    this.chatId=chatid;// for control the HTML-view and sure that only this chat be viewed
    this.chatArray=this.chatServ.get_chat(chatid); // change main chat array data 
    console.log(this.chatArray)
  }




  save(){
    this.sendMessage.patchValue({
      user_id_for_send:this.me.user_id!
    })
    this.chatServ.post_message(this.sendMessage.value,this.friend_id)
  }


}
