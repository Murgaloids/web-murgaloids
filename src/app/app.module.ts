// External Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { RatingModule } from 'ngx-rating';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MatDialogModule } from '@angular/material';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { MessageDialog } from './profile/profile.component';
import { ItemCardComponent } from './shared/item-card/item-card.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { SellItemPageComponent } from './sell-item-page/sell-item-page.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { AreYouSureDialog } from './shared/are-you-sure-dialog/are-you-sure-dialog.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { MessageComponent } from './message/message.component';

// Services
import { AuthenticationService } from './shared/services/authentication.service';
import { AuthRouteGuardService as AuthRouteGuard } from './shared/services/auth-route-guard.service';
import { StudentsService } from './shared/services/students.service';
import { MessagingService } from './shared/services/messaging.service';
import { FirebaseService } from './shared/services/firebase.service';
import { WindowService } from './shared/services/window.service';
import { ItemsService } from './shared/services/items.service';

// Environment
import { environment } from '../environments/environment';
import { MessageListComponent } from './message/message-list/message-list.component';
import { MessageDetailComponent } from './message/message-detail/message-detail.component';
import { MessageItemComponent } from './message/message-item/message-item.component';
import { ChatItemComponent } from './message/chat-item/chat-item.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomeComponent, data: {title: 'beachshop | Welcome'} },
  { path: 'home', component: HomepageComponent, canActivate: [AuthRouteGuard], data: {title: 'beachshop | Home'} },
  { path: 'search-results', component: SearchResultComponent, canActivate: [AuthRouteGuard], data: {title: 'beachshop | Search Result'} },
  { path: 'login', component: LoginComponent, data: {title: 'beachshop | Login'} },
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthRouteGuard], data: {title: 'beachshop | Edit Profile'} },
  { path: 'register', component: RegisterComponent, data: {title: 'beachshop | Register'} },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthRouteGuard], data: {title: 'beachshop | Profile'} },
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthRouteGuard], data: {title: 'beachshop | Profile'} },
  { path: 'item/:id', component: ItemDetailsComponent, canActivate: [AuthRouteGuard], data: {title: 'beachshop | Item'} },
  { path: 'sell', component: SellItemPageComponent, canActivate: [AuthRouteGuard], data: {title: 'beachshop | Sell'} },
  { path: 'edit-item/:id', component: EditItemComponent, canActivate: [AuthRouteGuard], data: {title: 'beachshop | Edit Item'} },
  { path: 'message', component: MessageComponent, canActivate: [AuthRouteGuard], data: {title: 'beachshop | Message'} },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    ProfileComponent,
    ItemCardComponent,
    ItemDetailsComponent,
    SellItemPageComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    SpinnerComponent,
    EditProfileComponent,
    EditItemComponent,
    AreYouSureDialog,
    SearchResultComponent,
    MessageDialog,
    MessageComponent,
    MessageListComponent,
    MessageDetailComponent,
    MessageItemComponent,
    ChatItemComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,

    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatTabsModule,
    MatSnackBarModule,
    MatTooltipModule,

    RatingModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFontAwesomeModule,
    MatDialogModule
  ],
  providers: [
    AuthenticationService,
    AuthRouteGuard,
    StudentsService,
    MessagingService,
    FirebaseService,
    WindowService,
    ItemsService
  ],
  entryComponents: [
    AreYouSureDialog,
    MessageDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
