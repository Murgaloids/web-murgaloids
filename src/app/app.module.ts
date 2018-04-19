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
import { MatGridListModule } from '@angular/material/grid-list';
import { RatingModule } from 'ngx-rating';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ItemCardComponent } from './shared/item-card/item-card.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { SellItemPageComponent } from './sell-item-page/sell-item-page.component';
import { SuccessComponent } from './success/success.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

// Services
import { AuthenticationService } from './shared/services/authentication.service';
import { AuthRouteGuardService as AuthRouteGuard } from './shared/services/auth-route-guard.service';
import { StudentsService } from './shared/services/students.service';

// Environment
import { environment } from '../environments/environment';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'home', component: HomepageComponent, canActivate: [AuthRouteGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthRouteGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthRouteGuard] },
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthRouteGuard] },
  { path: 'item/:id', component: ItemDetailsComponent, canActivate: [AuthRouteGuard]},
  { path: 'sell', component: SellItemPageComponent, canActivate: [AuthRouteGuard]},
  { path: 'success', component: SuccessComponent, canActivate: [AuthRouteGuard]},
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
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
    SuccessComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    SpinnerComponent,
    EditProfileComponent
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
    MatGridListModule,
    RatingModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFontAwesomeModule
  ],
  providers: [
    AuthenticationService,
    AuthRouteGuard,
    StudentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
