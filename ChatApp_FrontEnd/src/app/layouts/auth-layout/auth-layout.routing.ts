import { Routes } from '@angular/router';
import { NewPasswordComponent } from 'src/app/pages/newPassword/newPassword.component';
import { CodeVerifyComponent } from '../../pages/codeVerify/codeVerify.component';
import { ForgotPasswordComponent } from '../../pages/forgotPassword/forgotPassword.component';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'forgotPassword',       component: ForgotPasswordComponent },
    { path: 'verifyCode',       component: CodeVerifyComponent },
    { path: 'newPassword',       component: NewPasswordComponent },
];
