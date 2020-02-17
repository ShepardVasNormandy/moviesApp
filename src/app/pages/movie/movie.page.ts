import { ApiService } from 'src/app/services/api.service';
import { NavController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';


@Component({
	selector: 'app-movie',
	templateUrl: './movie.page.html',
	styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {
	public movie: Movie
	constructor(
		private route: ActivatedRoute,
		private navCtrl: NavController,
		private api: ApiService,
		private alertController: AlertController

	) { }

	public showLikes = false

	public user

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			if (params && params.movie) {
				this.movie = JSON.parse(params.movie)
			}
		})
		this.user = JSON.parse(localStorage.getItem('user'))
	}

	public backHome() {
		this.navCtrl.navigateRoot(['home'])
	}
	
	public backToList() {
		this.navCtrl.navigateRoot(['movie-list'])
	}

	public hasUserVoted(): { value: boolean, color: string } {
		if (this.user && this.user.movies.find(movie => movie._id === this.movie._id)) return { value: true, color: 'goldenrod' }
		else return { value: false, color: 'grey' }
	}

	public vote() {
		let score = 0
		if (!this.user || !this.user.userId) this.presentAlert()
		!this.hasUserVoted().value ? score = 1 : score = 0
		this.api.vote(this.user.userId, this.movie._id, score).then(response => {
			console.log(response)
			this.updateInfos(response.user, response.movie)
		})
	}

	async presentAlert() {
		const alert = await this.alertController.create({
		  message: 'Vous devez être connecté pour voter',
		  buttons: ['OK']
		});
	
		await alert.present();
	}

	private updateInfos(user, movie) {
		localStorage.setItem("user", JSON.stringify(user))
		this.user = user
		this.movie = movie
	}

	public displayLikes() {
		this.showLikes = !this.showLikes
	}
}
