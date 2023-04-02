import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    provideFirebaseApp(
      () => initializeApp(environment.firebase)
    ),
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()),
  ]
})
export class CoreModule { }
