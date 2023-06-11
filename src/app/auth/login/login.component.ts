import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { LoginForm } from 'src/app/interfaces/login-form.interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public LoginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '' ,  [ Validators.required, Validators.email ] ],
    password: ['12345', [ Validators.required, Validators.minLength(3)] ],
    remember: [ localStorage.getItem('remember') ]
  });

    constructor(private router: Router, private fb: FormBuilder, private LoginService: UsuarioService){

    }

    ngOnInit(): void {

    }

    login(){
     this.LoginService.login( this.LoginForm.value as LoginForm ).subscribe({
        next: resp => {

          this.router.navigateByUrl('/');
          console.log(resp);
        },
        error: (err) => Swal.fire(
          'Error', err.error.msg, 'error'
        ),
     })


    }
}
