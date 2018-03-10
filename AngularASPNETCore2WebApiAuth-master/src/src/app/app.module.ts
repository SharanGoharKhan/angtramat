import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpModule, XHRBackend } from '@angular/http';
import { AuthenticateXHRBackend } from './authenticate-xhr.backend';

import { routing } from './app.routing';

/* App Root */
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { basePath, basePathPrefix } from './base-url';
import {API_BASE_URL, WEBSOCKET_PATH} from './injection-tokens';
/* Account Imports */
import { AccountModule }  from './account/account.module';
/* Dashboard Imports */
import { DashboardModule }  from './dashboard/dashboard.module';

import { ConfigService } from './shared/utils/config.service';

/* Angular Material Imports */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';

import { Angular2SocialLoginModule } from "angular2-social-login";
import { PricingComponent } from './pricing/pricing.component';
import { FeaturesComponent } from './features/features.component';
import { AccountService } from '../clientportal/api/account.service';
import { ApiModule } from '../clientportal/api.module';
import { SidebarItemService } from '../clientportal/api/sidebarItem.service';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { Configuration } from '../clientportal/configuration';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { PortalScreenService } from '../clientportal/api/portalScreen.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PricingComponent,
    FeaturesComponent    
  ],
  imports: [
    AccountModule,
    DashboardModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    routing,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    Angular2SocialLoginModule,
  ],
  providers: [ConfigService, { 
    provide: XHRBackend, 
    useClass: AuthenticateXHRBackend
  },
  { provide: APP_BASE_HREF, useValue: '/' },       
  { provide: Configuration, useFactory: getConfig },
  { provide: WEBSOCKET_PATH, useFactory: getWebsocketUrl},
  { provide: API_BASE_URL, useFactory: getBaseApiUrl},
  {provide: LocationStrategy, useClass: HashLocationStrategy},

  //API
  //New Api Service
  SidebarItemService,
  PortalScreenService],
  bootstrap: [AppComponent]
})
export class AppModule { }

let providers = {
  "google": {
    "clientId": "774268296635-tnnv7e7s6n0glrq2fn541o5jbc57ied0.apps.googleusercontent.com"
  },
  "linkedin": {
    "clientId": "LINKEDIN_CLIENT_ID"
  },
  "facebook": {
    "clientId": "FACEBOOK_CLIENT_ID",
    "apiVersion": "<version>" //like v2.4 
  }
};
Angular2SocialLoginModule.loadProvidersScripts(providers);
//Configuration Swagger
export function getBaseUrl(){
  return   `${basePathPrefix}${basePath}/`;
}
export function getWebsocketUrl(){
  return  `wss://${basePath}/ws/`;
}

export function getBaseApiUrl(){
  return   `${basePathPrefix}${basePath}/api/`;
}
export function getConfig(): Configuration {
  console.log("getting config")
  var config = new Configuration();
  
  config.apiKeys = { "Authorisation":  ""};
  config.basePath = getBaseUrl();

  return config;
}
