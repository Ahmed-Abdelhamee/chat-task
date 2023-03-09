import { Component, OnInit } from '@angular/core';
import { profile } from 'src/app/interfaces/profile.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user:profile={
    username:"",
    profile_phote:"",
    user_id:""
  }
  constructor(private auth:AuthService) {
    this.user=auth.get_user()
    console.log(this.user)
   }

  ngOnInit(): void {
  }

}
