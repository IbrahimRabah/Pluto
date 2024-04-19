import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/authentication/services/authentication.service';
import { HrService } from '../../services/hr.service';

@Component({
  selector: 'app-interviewee',
  templateUrl: './interviewee.component.html',
  styleUrls: ['./interviewee.component.scss']
})
export class IntervieweeComponent {
  addInterviewee!: FormGroup;
  constructor(private hr: HrService) { }
  ngOnInit(): void {
    this.initialization();
  }

  initialization() {
    this.addInterviewee = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      addedDate: new FormControl(new Date(), [Validators.required]),
      nationalId: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    });
  }
  onSubmit() {
    this.addInterviewee.get('addedDate')?.setValue(new Date().toISOString());
    console.log(this.addInterviewee.value);
    if (this.addInterviewee.valid) {
      const dateOfBirthValue = this.addInterviewee.get('dateOfBirth')?.value;
      const formattedDateOfBirth = new Date(dateOfBirthValue).toISOString();
      this.addInterviewee.get('dateOfBirth')?.setValue(formattedDateOfBirth);
      console.log(this.addInterviewee.value);
      this.hr.addNewInterviewee(this.addInterviewee.value).subscribe(
        {
          next: (response) => {
            console.log(response);
          },
          error: (err) => {
            console.log(err.message);
          }
        }
      )
    }
    else {
      alert("notvalid")
      console.log("formsValue", this.addInterviewee)

    }

  }

}
