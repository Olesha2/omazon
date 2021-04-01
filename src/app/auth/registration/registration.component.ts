import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegistrationService} from './registration.service';
import {User} from '../../shared/models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  NewEmail = false;
  form: FormGroup;

  constructor(private registrationService: RegistrationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
      'name': new FormControl(null, [Validators.required]),
      'agree': new FormControl(false, [Validators.required, Validators.requiredTrue])
    });
  }

  onSubmit() {
    const {email, password, name} = this.form.value;
    const user = new User(email, password, name);
    // tslint:disable-next-line:no-shadowed-variable
    this.registrationService.createNewUser(user).subscribe((user: number) => {
      // tslint:disable-next-line:triple-equals
      if (user == 0) {
        this.NewEmail = false;
        this.router.navigate(['./login'], {
          queryParams: {
            NowCanLogin: this.form.value.name
          }
        });
      } else {
        this.NewEmail = true;
      }
    });
  }
}
