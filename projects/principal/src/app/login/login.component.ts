import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) {}

  async login(provider: string) {
    let okError = null;
    this.showHideButtons(false);
    if (provider === 'google') {
      okError = await this.loginService.loginGoogle();
    } else {
      okError = await this.loginService.loginGitHub();
    }

    if (okError) {
      this.showHideButtons();
      if (!okError.ok) {
        this.snackBar.open(okError.error.message, 'ok');
      }
    }
  }

  showHideButtons(show: boolean = false) {
    document
      .querySelectorAll('.flex-container-buttons, small, h1')
      .forEach((e) => {
        if (!show) {
          e.setAttribute(
            'style',
            e.tagName === 'H1' ? 'display: block' : 'display: none'
          );
        } else {
          e.setAttribute(
            'style',
            e.tagName === 'H1' ? 'display: none' : 'display: block'
          );
        }
      });
  }

  ngOnInit(): void { }
}
