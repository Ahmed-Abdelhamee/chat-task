import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import {AngularFireModule, FIREBASE_OPTIONS} from '@angular/fire/compat'
import {AngularFireStorageModule} from '@angular/fire/compat/storage'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ZfooterComponent } from './components/zfooter/zfooter.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChatComponent } from './components/chat/chat.component';
import {HttpClientModule} from "@angular/common/http";
import { FriendChatComponent } from './components/friend-chat/friend-chat.component';
import { OurChatComponent } from './components/our-chat/our-chat.component';
import { NotificationComponent } from './components/notification/notification.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';

import { StoreModule } from '@ngrx/store';
import { calc_mystore } from './store/mystore';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ZfooterComponent,
    ProfileComponent,
    ChatComponent,
    FriendChatComponent,
    OurChatComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    

    AngularFireModule,
    AngularFireStorageModule,

    StoreModule.forRoot({counter:calc_mystore})


  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
