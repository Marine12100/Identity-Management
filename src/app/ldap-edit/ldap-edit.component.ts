import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LdapDetailComponent } from '../ldap-detail/ldap-detail.component';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-ldap-edit',
  templateUrl: '../ldap-detail/ldap-detail.component.html',
  styleUrls: ['../ldap-detail/ldap-detail.component.css']
})
export class LdapEditComponent extends LdapDetailComponent implements OnInit {

  constructor(private usersService: UsersService, private route: ActivatedRoute, fb: FormBuilder, router: Router) {
    super(false, fb, router);
  }

  ngOnInit(): void {
    super.onInit();
  }

  validateForm(): void {
    console.log('LdapEditComponent - validateForm');
  }

  private getUser(): void {
    const login = this.route.snapshot.paramMap.get('id');

    this.usersService.getUser(login).subscribe(
      user => { this.user = user; console.log("LdapDetail getUser ="); console.log(user);}
    );
  }
}
