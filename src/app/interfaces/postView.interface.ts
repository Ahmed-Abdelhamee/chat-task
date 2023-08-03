import { comment } from "./comments.interface";

export interface postView{
    username?:string,
    profile_phote?:string,
    post_text?:string,
    post_phote?:string,
    likes?:string[],
    // comments:comment[]
    user_id:string,
    post_id:string,
}

export interface likesArray{
    user_id?:"user_id"
}