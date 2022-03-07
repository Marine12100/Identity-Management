import { ActivatedRoute, Router } from '@angular/router';
import { UserLdap } from '../model/user-ldap';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ConfirmValidParentMatcher, passwordValidator } from './passwords-validator.directive';
import { UsersService } from '../service/users.service';

export abstract class LdapDetailComponent {

  user: UserLdap;
  processLoadRunning = false;
  processValidateRunning = false;
  // Le PlaceHolder pour les mots de passe en fonction de l'édition ou non
  passwordPlaceHolder: string;
  // Message d'erreur
  errorMessage = '';
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  userForm = this.fb.group({
    login: [''],
    nom: [''],
    prenom: [''],
    // Groupe de données imbriqué
    passwordGroup: this.fb.group({
      password: [''],
      confirmPassword: ['']
    }, { validators: passwordValidator }),
    mail: {value: '', disabled: true},
  });

  protected constructor(
    public addForm: boolean,
    /*protected route: ActivatedRoute,*/
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.passwordPlaceHolder = 'Mot de passe' + (this.addForm ? '' : ' (vide si inchangé)');
  }

  protected onInit(): void {
    // Permet d'initialiser le formulaire au cas où
    // Nous n'en avons pas besoin ici
  }

  /*ngOnInit(): void {
    this.getUser();
  }*/

  private formGetValue(name: string): any {
    return this.userForm.get(name).value;
  }

  goToLdap() : void {
    this.router.navigate(['/users/list']);
  }

  onSubmitForm(): void {
    this.validateForm();
  }

  updateLogin() : void {
    // On ne fait la mise à jour que lors de l'ajout d'un utilisateur
    if (this.addForm) {
      this.userForm.get('login').setValue((this.formGetValue('prenom') + '.' + this.formGetValue('nom')).toLowerCase());
      this.updateMail();
    }
  }

  updateMail() : void {
    // On ne fait la mise à jour que lors de l'ajout d'un utilisateur
    if (this.addForm) {
      this.userForm.get('mail').setValue(this.formGetValue('login').toLowerCase() + '@domain.com');
    }
  }

  isFormValid() : boolean {
    return this.userForm.valid
      // Exemple de validation d'un champ :
      && (!this.addForm || this.formGetValue('passwordGroup.password') !== '');
  }

  abstract validateForm(): void;

  // Permet d'afficher les propriétés de UserLdap dans le formulaire
  protected copyUserToFormControl(): void {
    this.userForm.get('login').setValue(this.user.login);
    this.userForm.get('nom').setValue(this.user.nom);
    this.userForm.get('prenom').setValue(this.user.prenom);
    this.userForm.get('mail').setValue(this.user.mail);
    /* Il faudra ajouter les champs suivant au formulaire
    this.userForm.get('employeNumero').setValue(this.user.employeNumero);
    this.userForm.get('employeNiveau').setValue(this.user.employeNiveau);
    this.userForm.get('dateEmbauche').setValue(this.user.dateEmbauche);
    this.userForm.get('publisherId').setValue(this.user.publisherId);
    this.userForm.get('active').setValue(this.user.active);
    */
  }

  // Permet de récupérer les valeurs du formulaire et
  // de retourner un objet UserLdap avec ces valeurs
  protected getUserFromFormControl(): UserLdap {
    return {
      login: this.userForm.get('login').value,
      nom: this.userForm.get('nom').value,
      prenom: this.userForm.get('prenom').value,
      nomComplet: this.userForm.get('nom').value + ' ' + this.userForm.get('prenom').value,
      mail: this.userForm.get('mail').value,
      // Les valeurs suivantes devraient être eprise du formulaire
      employeNumero: 1, // this.userForm.get('employeNumero').value,
      employeNiveau: 1, // this.userForm.get('employeNiveau').value,
      dateEmbauche: '2020-04-24', // this.userForm.get('publisherId').value,
      publisherId: 1, // this.userForm.get('publisherId').value,
      active: true,
      motDePasse: '',
      role: 'ROLE_USER'
    };
  }
}
