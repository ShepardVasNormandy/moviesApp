import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';

import * as moment from 'moment';

@Component({
	selector: 'app-user',
	templateUrl: './user.page.html',
	styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

	constructor(
		private api: ApiService,
	) { }

	public user: User = {
		name: '',
		birthday: 0,
		email: '',
		password: ''
	}

	public password = ''

	ngOnInit() {
	}

	public validateForm() {
		this.user.birthday = moment(this.user.birthday).format('X')
		this.api.createUser(this.user).then(result => {
			console.log(JSON.stringify(result))
		})
	}

	public openUserPage(userID) {
		this.api.getUserData(userID).toPromise().then(result => {
			console.log(JSON.stringify(result))
		})
	}

	public createUser() {
		this.api.createUser(this.user)/* .toPromise() */.then(result => {
			console.log(JSON.stringify(result))
		})
	}
}
