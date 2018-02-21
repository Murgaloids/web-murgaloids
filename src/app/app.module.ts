// External Modules
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
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { ProfileComponent } from './profile/profile.component';

// Services
import { AccountService } from './shared/services/account.service';
import { DummyDataService } from './shared/services/dummy-data.service';
import { ItemCardComponent } from './item-card/item-card.component';
import { ItemDetailsComponent } from './item-details/item-details.component';

const appRoutes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'item/:id', component: ItemDetailsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    ItemCardComponent,
    ItemDetailsComponent
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
    MatCardModule,
    FlexLayoutModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AccountService,
    DummyDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
