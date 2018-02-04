import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HeaderLinksComponent } from './shared/header/header-links/header-links.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ProductBoxComponent } from './shared/product-box/product-box.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ContainerComponent } from './grid/container/container.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderLinksComponent,
    FooterComponent,
    ProductBoxComponent,
    HomepageComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
