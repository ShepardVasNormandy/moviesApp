import { NavController, Events } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
	selector: 'app-user',
	templateUrl: './user.page.html',
	styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

	constructor(
		private api: ApiService,
		private router: Router,
		private navCtrl: NavController,
		public events: Events
	) { }

		public showSignUp = true

	public user: User = {
		username: '',
		birthday: '',
		email: '',
		password: '',
	}

	public connectedUser

	private token = ''

	ngOnInit() {
		this.connectedUser = JSON.parse(localStorage.getItem('user'))

		console.log(this.connectedUser)
	}

	public validateSignUp() {
		this.user.birthday = moment(this.user.birthday).format('X')
		this.api.createUser(this.user).then(response => {
			this.storeToken(response.user, response.token)
			this.navCtrl.navigateRoot(['home'])
		})
	}
	
	public validateSignIn() {
		this.api.login({email:this.user.email, password: this.user.password}).then(response => {
			this.storeToken(response.user, response.token)
			this.navCtrl.navigateRoot(['home'])
		})
	}

	public storeToken(user, token) {
		localStorage.setItem("token", token)
		localStorage.setItem("user", JSON.stringify(user))
		this.user = user
		this.token = token
	}
	
    public backHome() {
        this.navCtrl.navigateRoot(['home'])
	}
	
	public disconectUser() {
		localStorage.removeItem('user');
		this.connectedUser = null
		location.reload()
	}
}
