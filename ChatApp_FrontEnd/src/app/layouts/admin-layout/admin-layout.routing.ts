import { Routes } from '@angular/router';
import { NewContactComponent } from '../../pages/newContact/newContact.component';
import { ContactsComponent } from '../../pages/contacts/contacts.component';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ImportContactComponent } from '../../pages/importContact/importContact.component';
import { SendMessageComponent } from '../../pages/sendMessage/sendMessage.component';
import { MessagesComponent } from '../../pages/messages/messages.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'contacts',      component: ContactsComponent },
    { path: 'newContact',      component: NewContactComponent },
    { path: 'importContact',      component: ImportContactComponent },
    { path: 'sendMessage',      component: SendMessageComponent },
    { path: 'messages',      component: MessagesComponent },
];
