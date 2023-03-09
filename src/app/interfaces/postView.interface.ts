import { comment } from "./comments.interface";

export interface postView{
    username?:string,
    profile_phote?:string,
    post_text?:string,
    post_phote?:string,
    // likes?:number,
    // comments:comment[]
    user_id:number,
    post_id:number,
}