import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { chatAarry } from 'src/app/interfaces/chatArray.interface';
import { profile } from 'src/app/interfaces/profile.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-our-chat',
  templateUrl: './our-chat.component.html',
  styleUrls: ['./our-chat.component.scss']
})
export class OurChatComponent implements OnInit  {
@ViewChild("chatDIv1") scroll_Chat1:any;
@ViewChild("chatDIv2") scroll_Chat2:any;

  user:profile={
    username:"",
    profile_phote:"",
    user_id:"",
  }

  constructor(private chatServ:ChatService , private authServ:AuthService, private formbuilder:FormBuilder) { }

  
  mychatArray:chatAarry[]=[]
  friendchatArray:chatAarry[]=[]
 
  chatId:string="" ;
  chatId2:string="" ;


  my_id:string="user1";
  friend_id:string="user2";

  friends:profile[]=[]

  my_sendMessage=this.formbuilder.group({
    user_id_for_send:["",],
    message:["",Validators.required],
  })


  friend_sendMessage=this.formbuilder.group({
    user_id_for_send:["",],
    message:["",Validators.required],
  })

  ngOnInit(): void {
    // this.user=this.authServ.getFriends()[0]
    this.friends=this.authServ.getFriends()

    // console.log(this.user)
  }

  setmychat(event:any){
    let chatid=this.my_id+this.friend_id;

    this.chatId=chatid;// for control the HTML-view and sure that only this chat be viewed
    this.mychatArray=this.chatServ.getmychat(chatid); // change main chat array data 
    
    console.log(chatid)
  }

  setFriendchat(event:any){
    let chatid=this.my_id+this.friend_id;

    this.chatId2=chatid;// for control the HTML-view and sure that only this chat be viewed
    this.friendchatArray=this.chatServ.getfreindchat(chatid); // change main chat array data 

    console.log(chatid)

  }





  save(){
    this.my_sendMessage.patchValue({
      user_id_for_send:this.my_id
    })
    if(this.my_sendMessage.valid)
    this.chatServ.post_message(this.my_sendMessage.value,this.friend_id)
  }
  save2(){
    this.friend_sendMessage.patchValue({
      user_id_for_send:this.friend_id
    })
    if(this.friend_sendMessage.valid)
    this.chatServ.post_message(this.friend_sendMessage.value,this.my_id)
  }


  scroll(){
    this.scroll_Chat1.nativeElement.scrollTop = this.scroll_Chat1.nativeElement.scrollHeight 
    this.scroll_Chat2.nativeElement.scrollTop = this.scroll_Chat2.nativeElement.scrollHeight 
  }
}
