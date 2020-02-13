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

	public user: User = {
		name: '',
		birthday: '',
		email: '',
		password: '',
	}

	private token = ''

	ngOnInit() {
	}

	public validateSignUp() {
		this.user.birthday = moment(this.user.birthday).format('X')
		this.api.createUser(this.user).then(userProfile => {
			this.storeToken(userProfile.token, userProfile._id)
			this.navCtrl.navigateRoot(['home'])
		})
	}
	
	public validateSignIn() {
		this.api.login({email:this.user.email, password: this.user.password}).then(response => {
			this.storeToken(response.user)
			this.navCtrl.navigateRoot(['home'])
		})
	}

	public createUser() {
		this.api.createUser(this.user).then(result => {
			console.log(JSON.stringify(result))
		})
	}

	public storeToken(user) {
		// localStorage.setItem(token, token)
		localStorage.setItem("user", JSON.stringify(user))
		this.user = user
		// this.token = token
	}
}
