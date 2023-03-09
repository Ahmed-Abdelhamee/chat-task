import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { chatAarry, chatData } from '../interfaces/chatArray.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  chat_Array:chatAarry[]=[
    {
      chatId:"user1user2",
      chat:[
        {
        user_id_for_send:"user1",
        message:"hello  ",
        time:"  3/7/2023  1:59:16 AM",
        },
        {
          user_id_for_send:"user2",
          message:"welcome",
        time:"  3/7/2023  1:59:16 AM",
        }
      ]
    },
    {
      chatId:"user2user1",
      chat:[
        {
          user_id_for_send:"user1",
          message:"hello  ",
        time:"  3/7/2023  1:59:16 AM",
          },
          {
            user_id_for_send:"user2",
            message:"welcome",
        time:"  3/7/2023  1:59:16 AM",
          }
      ]
    },
    {
      chatId:"user1user3",
      chat:[
        {
        user_id_for_send:"user1",
        message:"android ",
        time:"  3/7/2023  1:59:16 AM",
        },
        {
          user_id_for_send:"user3",
          message:"website",
        time:"  3/7/2023  1:59:16 AM",
        },
        {
          user_id_for_send:"user2",
          message:"move",
        time:"  3/7/2023  1:59:16 AM",
        }
      ]
    },
    {
      chatId:"user3user1",
      chat:[
        {
        user_id_for_send:"user1",
        message:"android ",
        time:"  3/7/2023  1:59:16 AM",
        },
        {
          user_id_for_send:"user3",
          message:"website",
        time:"  3/7/2023  1:59:16 AM",
        }
      ]
    },


    {
      chatId:"user2user3",
      chat:[
        {
        user_id_for_send:"user3",
        message:"msg 3 ",
        time:"  3/7/2023  1:59:16 AM",
        },
        {
          user_id_for_send:"user3",
          message:"msg user 3",
        time:"  3/7/2023  1:59:16 AM",
        }
      ]
    }
  ]





  constructor(private http:HttpClient) { }


  getmychat(chat_Id:string){
    return this.chat_Array.filter(item => item.chatId == chat_Id);
  }
  getfreindchat(chat_Id:string){
    return this.chat_Array.filter(item => item.chatId == chat_Id);
  }


  get_chat(chat_Id:string){
    return this.chat_Array.filter(item => item.chatId == chat_Id);
  }


  // post message for save chating
  post_message(data:chatData,friend_id:string){
  // we make two chat id to be added in the chatArray    to   make each chat content viewed for other components
    let chat_sender=data.user_id_for_send + friend_id;
    let chat_reseiver= friend_id+data.user_id_for_send ;
    // to set chat time in the data before send
    let date = new Date;
    data.time=date.toLocaleDateString()+"    "+date.toLocaleTimeString()

    // console.log(this.chat_Array.indexOf(this.chat_Array.find(item => item.chatId==chat_sender)!))
    if((this.chat_Array.find(item => item.chatId==chat_sender)!) !=undefined){
      this.chat_Array[this.chat_Array.indexOf(this.chat_Array.find(item => item.chatId==chat_sender)!)].chat.push(data)
      this.chat_Array[this.chat_Array.indexOf(this.chat_Array.find(item => item.chatId==chat_reseiver)!)].chat.push(data)
    }else{
      let make_chat_arr:chatData[]=[data]
      this.chat_Array.push({"chatId":chat_sender,chat:make_chat_arr})
      this.chat_Array.push({"chatId":chat_reseiver,chat:make_chat_arr})
      console.log(this.chat_Array)
    }
    
    console.log(this.chat_Array[this.chat_Array.indexOf(this.chat_Array.find(item => item.chatId==chat_sender)!)].chat)

    // console.log(this.chat_Array[this.chat_Array.indexOf(this.chat_Array.find(item => item.chatId==chat_sender)!)].chat.length)
    // console.log(this.chat_Array[this.chat_Array.indexOf(this.chat_Array.find(item => item.chatId==chat_reseiver)!)].chat.length)
  }
}
