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
<<<<<<< HEAD
import { ContainerComponent } from './shared/grid/container/container.component';
=======
import { ContainerComponent } from './grid/container/container.component';
>>>>>>> 49042dbacd9815c95b0ada1011c00c87ca73c1ed

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
