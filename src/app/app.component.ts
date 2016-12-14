import { Component, NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidationService } from './services/validation.service';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showSendEmail: boolean;
  emailSent: boolean;
  emailForm: any;
  emailError: boolean;
 
  constructor(
    private fb: FormBuilder,
    private dt: DataService
  ) {
    
    this.showSendEmail = true;
    this.emailSent = false;

    this.emailForm = this.fb.group({
        'emailSubject': ['', Validators.required],
        'toEmail': ['', [Validators.required, ValidationService.emailValidator]],
        'ccEmail': [''],
        'bccEmail': [''],
        'emailMessage': ['', [Validators.required, Validators.minLength(10)]]
      });

  }

  sendEmail(event) {
    if (this.emailForm.dirty && this.emailForm.valid) {

      this.dt.submitEmail(this.emailForm.value).then((data) => {
        var status = data['_body'];      
        
        // if not success - go to failOver
        if(data['status'] != 202) {
                    
          this.dt.failOver(this.emailForm.value).then((data) => {
            
            if ( data['status'] = '200') {

              this.showSendEmail = false;
              this.emailError = false;
              this.emailSent = true;

            } else {

              this.showSendEmail = false;
              this.emailError = true;
              this.emailSent = false;

            }

          });

        } else {
          this.emailSent = true;
          this.showSendEmail = false;
        }

      });

    }
  }


}
