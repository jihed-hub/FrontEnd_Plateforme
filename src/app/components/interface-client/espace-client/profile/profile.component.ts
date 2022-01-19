import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Client } from 'src/app/entities/client';
import { HttpClient } from '@angular/common/http';
import { ClientService } from 'src/app/_services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isSuccessful = false;
  errorMessage = '';

form: FormGroup;
client: Client ;
clientcopy: Client = null ;
showclientForm = true;
errMess: string;
@ViewChild('fform') formFormDirective ;

formErrors = {
    // tslint:disable-next-line: object-literal-key-quotes
    'firstNameclt': '',
        // tslint:disable-next-line: object-literal-key-quotes
    'emailclt': '',
        // tslint:disable-next-line: object-literal-key-quotes
    'lastNameclt': '',
        // tslint:disable-next-line: object-literal-key-quotes
    'telclt': '',
        // tslint:disable-next-line: object-literal-key-quotes
    'adresseclt': ''
    // tslint:disable-next-line: object-literal-key-quotes

};

validationMessages = {
  // tslint:disable-next-line: object-literal-key-quotes
  'firstNameclt': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'First Name is required.',
    // tslint:disable-next-line: object-literal-key-quotes
    'minlength':     'First Name must be at least 2 characters long.',
    // tslint:disable-next-line: object-literal-key-quotes
    'maxlength':     'FirstName cannot be more than 25 characters long.'
  },
  // tslint:disable-next-line: object-literal-key-quotes
  'lastNameclt': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'Last Name is required.',
    // tslint:disable-next-line: object-literal-key-quotes
    'minlength':     'Last Name must be at least 2 characters long.',
    // tslint:disable-next-line: object-literal-key-quotes
    'maxlength':     'Last Name cannot be more than 25 characters long.'
  },
  // tslint:disable-next-line: object-literal-key-quotes
  'emailclt': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'Email is required.',
    // tslint:disable-next-line: object-literal-key-quotes
    'email':         'Email not in valid format.'
  },
  // tslint:disable-next-line: object-literal-key-quotes
  'telclt': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'Tel. number is required.',
    // tslint:disable-next-line: object-literal-key-quotes
    'pattern':       'Tel. number must contain only numbers.',
     // tslint:disable-next-line: object-literal-key-quotes
     'minlength':         'cin must contain  8 numbers',
     // tslint:disable-next-line: object-literal-key-quotes
     'maxlength':  'cin must contain 8 numbers'
  },
  // tslint:disable-next-line: object-literal-key-quotes
  'adresseclt': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'adresse is required.',
    // tslint:disable-next-line: object-literal-key-quotes
    'minlength':     'adresse must be at least 2 characters long.',
    // tslint:disable-next-line: object-literal-key-quotes
    'maxlength':     'adresse cannot be more than 25 characters long.'
  },
};
  constructor(private http: HttpClient, private clientService: ClientService ,private router: Router ,
    private route: ActivatedRoute , private fb: FormBuilder) {      this.createformprofil() ;
    }
    clientt: Client;


  ngOnInit(): void {
    this.clientt = new Client();
    this.clientService.getclient()
   .subscribe((data) => {this.clientt = data, console.log(data)} , error => console.log(error));
  }
  get f(){
    return this.form.controls;
  }


  onSubmit(): void {
    this.client = this.form.value;
    this.clientService.submiteditprofilwithoutphoto(this.client)
    .subscribe(client => {
      this.clientcopy = client ;
      this.client = null ;
      setTimeout(() => {
        this.clientcopy = null; this.showclientForm = true; }, 5000);
           },
        error => console.log(error.status, error.message));
  }


  createformprofil(): void{
    this.form = this.fb.group({
      firstNameclt:  ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ] ,
      emailclt: ['', [Validators.required, Validators.email] ] ,
      lastNameclt: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ] ,
      telclt: ['', [Validators.required, Validators.pattern , Validators.minLength(8) , Validators.maxLength(8)] ] ,
      adresseclt: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
    });
    this.form.valueChanges
    .subscribe(data => this.onValueChanged(data)); 
    this.onValueChanged();
      }


   onValueChanged(data?: any) {
        if (!this.form) { return; }
        const form = this.form;
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


}
