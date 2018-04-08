// External Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { RatingModule } from 'ngx-rating';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';


// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './profile/profile.component';
import { ItemCardComponent } from './shared/item-card/item-card.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { SellItemPageComponent } from './sell-item-page/sell-item-page.component';
import { SuccessComponent } from './success/success.component';

// Services
import { AccountService } from './shared/services/account.service';
import { DummyDataService } from './shared/services/dummy-data.service';

// Environment
import { environment } from '../environments/environment';

const appRoutes: Routes = [
  { path: '', component: HomepageComponent },
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
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    RatingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [
    AccountService,
    DummyDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
