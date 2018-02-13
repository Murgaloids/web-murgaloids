import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { HeaderComponent } from './shared/header/header.component';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';

import { AccountService } from './shared/services/account.service';
import { WindowService } from './shared/services/window.service';

const appRoutes: Routes = [
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AccountService,
    WindowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
