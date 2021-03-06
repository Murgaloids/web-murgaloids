import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    if (this.authenticationService.token)
      this.router.navigate(['/home']);
      this.titleService.setTitle('beachshop | Welcome');
  }
}
