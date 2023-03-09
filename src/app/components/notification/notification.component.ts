import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  show(){
    let date = new Date;

    console.log("     \n  "+date.toLocaleDateString()+"    "+date.toLocaleTimeString())
    console.log()
  }
}
