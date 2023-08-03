import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { mystoreInterface } from 'src/app/store/mystore';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  count:any;

  constructor(private store:Store<mystoreInterface>) { 
    store.subscribe(data=>{
      this.count=data.counter.n
    })
  }


  ngOnInit(): void {
  }


  show(){
    let date = new Date;

    console.log("     \n  "+date.toLocaleDateString()+"    "+date.toLocaleTimeString())
    console.log()
  }

  increase(){
    this.store.dispatch({type:'increase'})
  }
  decrease(){
    this.store.dispatch({type:'decrease'})
  }
}
