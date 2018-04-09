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
import { RatingModule } from 'ngx-rating';
import { HttpClientModule } from '@angular/common/http';

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

// Services
import { AuthenticationService } from './shared/services/authentication.service';
import { DummyDataService } from './shared/services/dummy-data.service';

const appRoutes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'item/:id', component: ItemDetailsComponent},
  { path: 'sell', component: SellItemPageComponent},
  { path: 'success', component: SuccessComponent}
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
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    RatingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    DummyDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
