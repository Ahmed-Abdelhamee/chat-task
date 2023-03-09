export interface chatAarry{
    chatId:string,
    chat:chatData[]
}


export interface chatData{
    user_id_for_send:string,
    message:string,
    time:string,
}