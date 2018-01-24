import { Subscription } from 'rxjs';
import { Component, OnInit,OnDestroy, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Credentials } from '../../shared/models/credentials.interface';
import { UserService } from '../../shared/services/user.service';
import { GoogleService } from '../../shared/services/google.service';
import { AuthService } from "angular2-social-login";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private sub;
  brandNew: boolean;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  credentials: Credentials = { email: '', password: '' };
  googleClientId = "";
  constructor(
    public _auth: AuthService,
    private userService: UserService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private googleService: GoogleService) { }

    ngOnInit() {
    // Intialize the clientId
    this.googleClientId = this.googleService.googleClientId;
    // subscribe to router event
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
         this.brandNew = param['brandNew'];   
         this.credentials.email = param['email'];         
      });      
  }

   ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }

  login({ value, valid }: { value: Credentials, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
    if (valid) {
      this.userService.login(value.email, value.password)
        .finally(() => this.isRequesting = false)
        .subscribe(
        result => {         
          if (result) {
             this.router.navigate(['/dashboard/home']);             
          }
        },
        error => this.errors = error);
    }
  }
  signIn(provider){
    this.sub = this._auth.login(provider).subscribe(
      (data) => {
                  console.log(data);
                  //user data 
                  //name, image, uid, provider, uid, email, token (accessToken for Facebook & google, no token for linkedIn), idToken(only for google) 
                }
    )
  }
  logout(){
  //   this._auth.logout().subscribe(
  //     (data)=>{//return a boolean value.} 
  //     return true
  //   )
  // }
  }
}

