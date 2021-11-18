import { AngularFireAuth } from '@angular/fire/auth';
import { SuscripcionService } from './../../services/suscripcion/suscripcion.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userId: any = "";

  constructor(private _firebaseAuth: AngularFireAuth, private activatedRoute: ActivatedRoute, private router: Router, private _oauthService: OauthService, private _premium: SuscripcionService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(async params => {

      await params['code'] ?? this.router.navigate(['/']);

      await this._oauthService.getToken(params['code']).toPromise().then(async data => {
        localStorage.setItem('token', data.access_token);
      });

      await this._oauthService.logIn().then(async data => {
        await this._firebaseAuth.signInWithCustomToken(data.toString());
      });
      
      window.location.href = '/principal'
    })
  }

}
