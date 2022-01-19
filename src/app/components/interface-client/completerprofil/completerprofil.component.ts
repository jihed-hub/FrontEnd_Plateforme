import { Component, OnInit, ViewChild } from '@angular/core';
import { Address } from 'src/app/entities/address';
import { Router, ActivatedRoute } from '@angular/router';
import { UserapiService } from 'src/app/_services/userapi.service';
import { Client } from 'src/app/entities/client';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ClientService } from 'src/app/_services/client.service';

@Component({
  selector: 'app-completerprofil',
  templateUrl: './completerprofil.component.html',
  styleUrls: ['./completerprofil.component.css']
})
export class CompleterprofilComponent implements OnInit {

  isSuccessful = false;
  errorMessage = '';
  clienttt : Client;
  form: FormGroup;
  client: Client ;
  clientcopy: Client = null ;
  showclientForm = true;
  errMess: string;
  public selectedIndex: number;
  public iconColor: string;
  @ViewChild('fform') formFormDirective ;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  profileSubmitted: boolean;
  fileToUpload: File = null;
  currentFile: File;
  selectedFiless: FileList;
  selectedFiles: FileList;
  imageSrc: string;

  formErrors = {
    // tslint:disable-next-line: object-literal-key-quotes
    'firstNameclt': '',
        // tslint:disable-next-line: object-literal-key-quotes
    'emailclt': '',
        // tslint:disable-next-line: object-literal-key-quotes
    'cin': '',
        // tslint:disable-next-line: object-literal-key-quotes
    'date_permis': '',
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
  'cin': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'cin is required.',
    // tslint:disable-next-line: object-literal-key-quotes
    'pattern':       'cin must contain only numbers.',
    // tslint:disable-next-line: object-literal-key-quotes
    'minlength':         'cin must contain  8 numbers',
    // tslint:disable-next-line: object-literal-key-quotes
    'maxlength':  'cin must contain 8 numbers'
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
  private route: ActivatedRoute , private fb: FormBuilder ){ 
    this.createformprofil();
  }


  clientt: Client;
  get f(){
    return this.form.controls;
  }

  ngOnInit(): void {
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });
    this.selectedFiles = null;
    this.clientt = new Client();
    this.selectedIndex=1;
    this.clientService.getclient()
    .subscribe((data) => {this.clienttt = data, console.log(data);
     if (this.clienttt!=null){
       this.clientt = this.clienttt;
     }
   if (this.clienttt.etat===0){
   this.profileSubmitted=true;
   this.selectedIndex=2
 }
 } , error => console.log(error));
  }

  createformprofil(): void{
    this.form = this.fb.group({
      firstNameclt:  ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ] ,
      emailclt: ['', [Validators.required, Validators.email] ] ,
      lastNameclt: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ] ,
      telclt: ['', [Validators.required, Validators.pattern , Validators.minLength(8) , Validators.maxLength(8)] ] ,
      adresseclt: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],      
      photoclt: new FormControl(''),
      photos: new FormControl(''),
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
     
      onsubmitt() {
        if (this.selectedFiles !== null){
          this.currentFile = this.selectedFiles.item(0);
          this.client = this.form.value;
          this.clientService.submiteditprofil_completeprofil(this.client,  this.currentFile)
          .subscribe(client => {
            this.clientcopy = client ;
            this.client = null ;
  
  
            setTimeout(() => {
              this.clientcopy = null; this.showclientForm = true;
            }, 5000);
            //  this.reload();
            this.profileSubmitted =true;
  
            this.ngOnInit();
            },
              error => console.log(error.status, error.message));
        }
        else{
          this.client = this.form.value;
          this.clientService.submiteditprofilwithoutphoto_completeprofil(this.client)
          .subscribe(client => {
            this.clientcopy = client ;
            this.client = null ;
            setTimeout(() => {
              this.clientcopy = null; this.showclientForm = true;
            }, 5000);
             // this.reload();
             this.profileSubmitted =true;

             this.ngOnInit();
            },
              error => console.log(error.status, error.message));


        }
        

      }

      reload(){
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/Plateforme-Educative/client/completerprofil']);

    }
    onFileChange(event) {

      const reader = new FileReader();
      this.selectedFiles = event.target.files;
    
      if (event.target.files && event.target.files.length) {
    
        const [file] = event.target.files;
    
        reader.readAsDataURL(file);
    
        reader.onload = () => {
    
    
          this.imageSrc = reader.result as string;
    
          this.form.patchValue({
    
            fileSource: reader.result
    
          });
    
    
        };
      }
    }

  

}
