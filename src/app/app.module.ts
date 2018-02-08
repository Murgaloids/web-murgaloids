import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HeaderLinksComponent } from './shared/header/header-links/header-links.component';
import { ContainerComponent } from './shared/grid/container/container.component';

import { AccountService } from './shared/services/account.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderLinksComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
