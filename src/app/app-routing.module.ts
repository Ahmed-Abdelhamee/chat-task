import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { FriendChatComponent } from './components/friend-chat/friend-chat.component';
import { NotificationComponent } from './components/notification/notification.component';
import { OurChatComponent } from './components/our-chat/our-chat.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path:"", loadChildren:()=> import("./components/home-page/home-page.module").then( m=> m.HomePageModule)},

  {path:"profile", component:ProfileComponent},
  {path:"chat", component:ChatComponent},
  {path:"friend-chat", component:FriendChatComponent},

  {path:"our-chat", component:OurChatComponent},
  {path:"notification", component:NotificationComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
