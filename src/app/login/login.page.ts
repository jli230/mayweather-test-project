import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { Storage } from '@ionic/storage-angular';
// import { EventsService } from 'src/app/providers/events-service/events.service';
// import { UserService } from 'src/app/providers/user-service/user.service';
// import { UtilsService } from 'src/app/providers/utils/utils.service';
// import { isValidEmail, isValidPhoneNumber } from 'src/app/utils/validators';
import { AuthResponse, IdentityType, VerificationFrom, VerificationParams, PostData } from 'src/types/user';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

import { HTTP } from '@awesome-cordova-plugins/http/ngx';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  loading = false;
  authToken = '';
  user! : PostData;
  // string authToken = '';
  // public testarray : AuthResponse;
  constructor(
    // private zone: NgZone,
    // public userService: UserService,
    // public utils: UtilsService,
    public formBuilder: FormBuilder,
    // public events: EventsService,
    // public storage: Storage,
    // private router: Router
    private http: HttpClient
  ) {
    this.loginForm = this.formBuilder.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required],
    });
    // this.http.get('http://ionic.io', {}, {})
    //   .then(data => {

    //     console.log(data.status);
    //     console.log(data.data); // data received by server
    //     console.log(data.headers);

    //   })
    //   .catch(error => {

    //     console.log(error.status);
    //     console.log(error.error); // error message as string
    //     console.log(error.headers);

    //   });
    console.log("test");
  }

  ngOnInit(){
    // this.http
    //   .post('https://api.accuropt.com/apt/users/actions/login', {
    //     email: 'bitcoment+mayweather@gmail.com',
    //     password: '123456789',
    //   }).subscribe((response) => {

    //     this.authToken = JSON.parse(JSON.stringify(response)).data.token;
    //     // this.theTodo = response;

    //     console.log(this.authToken);

    //     // this.testarray = response.data.json();
    //     // this.authToken = response.data;

    //   });
      // JSON.stringify(dataresponse);
      // console.log(dataresponse);
    // const response = this.api.post<AuthResponse>({
    //       email: 'bitcoment+mayweather@gmail.com',
    //       password: '123456789',
    //     }, data);
    // if (this.authToken != '') {
    //   this.http.post('https://api.accuropt.com/apt/users/actions/login', {
    //     token: this.authToken
    //   });
    // }
  }

  ionViewDidLoad() {
  //   this.utils.log('ionViewDidLoad UserLoginPage');

  //   //Fix issue with getting password from FaceID
  //   // setTimeout( () => {
  //   //   this.zone.runOutsideAngular(() => {
  //   //     const psw = document.getElementById('password');
  //   //     if(psw)
  //   //       {psw.addEventListener('change', (event) => {
  //   //         this.loginForm.patchValue({
  //   //           password: event.target.value
  //   //         });
  //   //       });}
  //   //   });
  //   // }, 1000);
  }

  // goForgotPassword() {
  //   const params = { identifier: this.loginForm.value.identifier };
  //   this.router.navigate(['/user/forgot-password'], { queryParams: params });
  // }

  onLogin() {
    // this.http
    //   .post('https://api.accuropt.com/apt/users/actions/login', {
    //     email: this.loginForm.value.identifier,
    //     password: this.loginForm.value.password,
    //   }).subscribe((response) => {
    //     // this.user = response;
    //     // this.authToken = response.data.token;
    //     // JSON.parse(response.data)
    //     console.log(response["data"]);
    //     // this.testarray = response.data.json();
    //     // this.authToken = response.data;
    //   });
    fetch("https://api.accuropt.com/apt/users/actions/login", {
      method: "POST",
      body: JSON.stringify({
        email: this.loginForm.value.identifier,
        password: this.loginForm.value.password,
      }),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then( data => {
      this.authToken = data.data.token;
      // console.log(data);
    });
    console.log(this.authToken);
  }
    // if (!this.loginForm.value.identifier) {
    //   this.utils.presentToastWithTranslate('WARNING_EMPTY_IDENTIFIER', {
    //     color: 'warning',
    //   });
    //   return;
    // } else if (!this.loginForm.value.password) {
    //   this.utils.presentToastWithTranslate('WARNING_EMPTY_PASSWORD', {
    //     color: 'warning',
    //   });
    //   return;
    // }

    // const isEmail = isValidEmail(this.loginForm.value.identifier);
    // const isPhoneNumber = isValidPhoneNumber(this.loginForm.value.identifier);

    // if (!isEmail && !isPhoneNumber) {
    //   this.utils.presentToastWithTranslate('WARNING_INVALID_IDENTIFIER', {
    //     color: 'warning',
    //   });
    //   return;
    // }

  //   this.loading = true;

  //   // const identityType = isEmail ? IdentityType.Email : IdentityType.Phone;
  //   this.userService
  //     .login({
  //       identifier: this.loginForm.value.identifier.toLowerCase(),
  //       // identityType,
  //       password: this.loginForm.value.password,
  //       clientId: this.userService.CLIENT_ID,
  //     })
  //     .then((credential) => {
  //       if (credential.token && !credential.isVerified) {
  //         this.loading = false;
  //         const params: VerificationParams = { ...credential, identityType, from: VerificationFrom.Login };
  //         this.router.navigate(['/user/verification'], { queryParams: params });
  //         return;
  //       }
  //     }).catch(e => {
  //       this.loading = false;
  //       this.utils.presentErrorToast(e.message);
  //     });
  // }
}
