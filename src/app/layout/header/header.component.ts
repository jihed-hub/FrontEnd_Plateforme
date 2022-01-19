import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { AuthService } from 'src/app/_services/auth.service';
import { RegistredialogComponent } from 'src/app/components/registredialog/registredialog.component';
import { Address } from 'src/app/entities/address';
import { UserapiService } from 'src/app/_services/userapi.service';
import { isNull } from 'util';
import { ClientService } from 'src/app/_services/client.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  model: Address = {
    address: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    phonenumber: ''
  };
  addresslist: Address[];
  hide = true;
  buttonType: any;

  isSuccessful = false;
  isSignUpFailed = false;
  isloginSuccessful = false;
  isloginFailed = false;

  registerform: FormGroup;
  loginform: FormGroup;

  userregister: User ;
  userlogin: User ;
  usercopy: User = null ;
  showregisterForm = true;

  errMess: string;
  @ViewChild('fform') formFormDirective ;

  formErrors = {
    'username':'',
        // tslint:disable-next-line: object-literal-key-quotes
    'email': '',
        // tslint:disable-next-line: object-literal-key-quotes
    'password': '',
        // tslint:disable-next-line: object-literal-key-quotes
    'termes': ''
        // tslint:disable-next-line: object-literal-key-quotes
  };
  validationMessages = {
    // tslint:disable-next-line: object-literal-key-quotes
    'username': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required':      'Nom utilisateur est nécessaire.',
      // tslint:disable-next-line: object-literal-key-quotes
      'minlength':     'Nom utilisateur doit comporter au moins 2 caractères.',
      // tslint:disable-next-line: object-literal-key-quotes
      'maxlength':     'Nom utilisateur ne peut pas contenir plus de 25 caractères'
    },
    // tslint:disable-next-line: object-literal-key-quotes
  'email': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'Email est requis',
    // tslint:disable-next-line: object-literal-key-quotes
    'email':         'mail n est pas au format valide.'
  },
  // tslint:disable-next-line: object-literal-key-quotes
    'password': {
     // tslint:disable-next-line: object-literal-key-quotes
    'required':      'Mot de passe est requis',
    // tslint:disable-next-line: object-literal-key-quotes
    'minlength':     'Mot de passe doit comporter au moins 6 caractères',
    // tslint:disable-next-line: object-literal-key-quotes
    'maxlength':     'mot de passe ne peut pas contenir plus de 20 caractères'
  },
    // tslint:disable-next-line: object-literal-key-quotes
    'termes': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required': ' vérifications est requis',
    // tslint:disable-next-line: object-literal-key-quotes
  }
};


private roles: string[];
registerpDialog : boolean;
loginpDialog : boolean;
isLoggedIn = false;
showAdminBoard = false;
showModeratorBoard = false;
username: string = null;
role: string = null;
////////////////////
form: any = {};
errorMessage = '';
isLoginFailed = false;
position : number = null;
message : number;
user: User;
u : User;
id : number;
etat:Boolean;
  constructor(public dialog: MatDialog,private router: Router,private fb: FormBuilder,
    private tokenStorageService: TokenStorageService,private authService: AuthService , private api:UserapiService,private clientservice: ClientService) { }

  ngOnInit(): void {
    this.createloginform();
    this.createregisterform() ;
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.isLoggedIn = true;
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_USER');
      this.role=this.roles[0];
      this.username = user.username;
    }
  }


  getAddress(){
    this.api.getAddress().subscribe(
      res=>{
        if(res.map != null){
          this.model = res.map;
        }
        console.log(res.map);
      });
  }
 
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.href = '/Plateforme-Educative/home';  }

    onSubmit(): void {
      this.userlogin = this.loginform.value;
      this.authService.login(this.userlogin).subscribe(
        data => { 
          this.tokenStorageService.saveToken(data.accessToken);
        this.tokenStorageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorageService.getUser().roles;
        this.id = this.tokenStorageService.getUser().id;
        console.log(this.id);
        
        this.clientservice.getUserr(this.id).subscribe((data) =>{
          this.u = data, console.log(data);
          console.log(this.u);
          this.etat = this.u.etat;
          console.log(this.etat);
          if (this.roles.includes('ROLE_USER') && this.etat===true){
            window.location.href = '/Plateforme-Educative/client/home';
           }
           else
           if (this.roles.includes('ROLE_USER') && this.etat === false){
            window.location.href = '/Plateforme-Educative/client/completerprofil';
           }
           else
          if (this.roles.includes('ROLE_ADMIN')){
          window.location.href = '/dash/dashboard';
         }
        }, error => console.log(error),);

        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        });
    }

    reloadPage(): void {
      window.location.reload();
    }
  

  createregisterform(): void{
    this.registerform = this.fb.group({
      username:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)] ] ,
      email: ['', [Validators.required, Validators.email] ] ,
      password: ['', [Validators.required , Validators.minLength(6) , Validators.maxLength(20)] ]  ,
    });
    this.registerform.valueChanges
    .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
      }

      createloginform(): void{
        this.loginform = this.fb.group({
          username:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)] ] ,
          password: ['', [Validators.required , Validators.minLength(6) , Validators.maxLength(20)] ]  ,
        });
        this.loginform.valueChanges
        .subscribe(data => this.onloginValueChanged(data));

        this.onloginValueChanged();
       }

       onloginValueChanged(data?: any) {
        if (!this.loginform) { return; }
        const form = this.loginform;
        for (const field in this.formErrors) {
          if (this.formErrors.hasOwnProperty(field)) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
              const messages = this.validationMessages[field];
              for (const key in control.errors) {
                if (control.errors.hasOwnProperty(key)) {
                  this.formErrors[field] += messages[key] + ' ';
                }
              }
            }
          }
        }
      }
      onValueChanged(data?: any) {
        if (!this.registerform) { return; }
        const form = this.registerform;
        for (const field in this.formErrors) {
          if (this.formErrors.hasOwnProperty(field)) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
              const messages = this.validationMessages[field];
              for (const key in control.errors) {
                if (control.errors.hasOwnProperty(key)) {
                  this.formErrors[field] += messages[key] + ' ';
                }
              }
            }
          }
        }
      }
      openDialog() {
        this.dialog.open(RegistredialogComponent, {
        });
      }

      dialogpegister(){
        this.registerpDialog = true;
    
      }
      dialoglogin(){
        this.loginpDialog = true;
    
      }
      termesetconditions(){
        this.registerpDialog = false;
    
      }
      dialogplogin(){
        this.registerpDialog = false;
        this.loginpDialog = true;
    
    
      }
      returnregister(){
        this.loginpDialog = false;
        this.registerpDialog = true;
    
    
      }
 
      gotoprofil(){

         window.location.href ='/Plateforme-Educative/client/espace-client/profil';
     
     
       }

       gotodashboardc(){

        // this.transfereService.changeMessage(1);
     
        window.location.href ='/Plateforme-Educative/client/espace-client/dashboard';
       }


       onSubmit1() {
        this.authService.login(this.form).subscribe(
          data => {
            this.tokenStorageService.saveToken(data.accessToken);
            this.tokenStorageService.saveUser(data);
    
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.roles = this.tokenStorageService.getUser().roles;
            if (this.roles.includes('ROLE_USER')){
              window.location.href = 'user'; 
             }
             else
             if (this.roles.includes('ROLE_ADMIN')){
              window.location.href = 'admin';
             }
          },
          err => {
            this.errorMessage = err.error.message;
            this.isLoginFailed = true;
          }
        );
      }

      onSubmit2() {
        this.authService.register(this.form).subscribe(
          data => {
            console.log(data);
            this.isSuccessful = true;
            this.isSignUpFailed = false;
          },
          err => {
            this.errorMessage = err.error.message;
            this.isSignUpFailed = true;
          }
        );
      }

}
