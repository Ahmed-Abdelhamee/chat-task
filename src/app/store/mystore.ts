import { Action } from "@ngrx/store";

let mycounter:storeInterface ={
    n:0
}

export function calc_mystore(state=mycounter,action:Action){
    switch (action.type){
        case 'increase' : {
            // return object form type storeinterface
            return {n:state.n+1!}
        };
        case 'decrease' : {
            // return object form type storeinterface
            return {n:state.n-1!};
        };
        
        default: return state ;  // return object form type storeinterface
    }
}

export interface customAction{
    type:string,
    payload:any
}
export interface mystoreInterface{
    counter:storeInterface
}

interface storeInterface{
    n:number
}