import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { GoogleSignInSuccess, GoogleSignInComponent, GoogleSignInFailure } from 'angular-google-signin';

declare var gapi: any;

@Injectable()
export class GoogleService {
    // Google Sign In Setup and Authentication
    public googleClientId: string = '774268296635-tnnv7e7s6n0glrq2fn541o5jbc57ied0.apps.googleusercontent.com';
    private googleUserSource = new Subject<gapi.auth2.BasicProfile>();
    private isSignedInSource = new Subject<boolean>();

    googleUser$ = this.googleUserSource.asObservable();
    isSignedIn$ = this.isSignedInSource.asObservable();

    constructor( 
        private routerService: Router) {
        this.googleUserSource.next(null);
        this.isSignedInSource.next(false);
    }

    setGoogeUser(googleUser: gapi.auth2.BasicProfile) {
        this.googleUserSource.next(googleUser);
    }

    setIsSignedIn(isSignedIn: boolean) {
        this.isSignedInSource.next(isSignedIn);
    }
    
    onGoogleSignInSuccess(event: GoogleSignInSuccess) {
        let googleUser: gapi.auth2.GoogleUser = event.googleUser;
        let id: string = googleUser.getId();
        let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
        console.log('ID: ' +
            profile
                .getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());

    }

    signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
            this.googleUserSource.next(null);
            this.isSignedInSource.next(false);
            location.reload();
        });
    }
}