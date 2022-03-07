import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LdapDetailComponent } from '../ldap-detail/ldap-detail.component';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-ldap-add',
  templateUrl: '../ldap-detail/ldap-detail.component.html',
  styleUrls: ['../ldap-detail/ldap-detail.component.css']
})
export class LdapAddComponent extends LdapDetailComponent implements OnInit {

  constructor(private usersService: UsersService, fb: FormBuilder, router: Router,) {
    super(true, fb, router);
  }

  ngOnInit(): void {
    super.onInit();
  }

  validateForm(): void {
    console.log('LdapAddComponent - validateForm');
  }
}
