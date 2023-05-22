import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiKitLibModule } from 'ui-kit-lib';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContentComponent } from './content/content.component';
import { SampleComponent } from './sample/sample.component';

@NgModule({
  declarations: [AppComponent, ContentComponent, SampleComponent],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule, UiKitLibModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
