import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactsComponent } from '../../pages/contacts/contacts.component';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';
import { NewContactComponent } from 'src/app/pages/newContact/newContact.component';
import { ImportContactComponent } from 'src/app/pages/importContact/importContact.component';
import { SendMessageComponent } from 'src/app/pages/sendMessage/sendMessage.component';
import { MessagesComponent } from 'src/app/pages/messages/messages.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    ContactsComponent,
    UserProfileComponent,
    NewContactComponent,
    ImportContactComponent,
    SendMessageComponent,
    MessagesComponent
  ]
})

export class AdminLayoutModule {}
