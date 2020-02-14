import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';

@Component({
	selector: 'app-movie',
	templateUrl: './movie.page.html',
	styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {
	public movie:Movie
	constructor(
		private route: ActivatedRoute,
		private router: Router

	) { }

	public user

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			if (params && params.movie) {
				this.movie = JSON.parse(params.movie)
				console.warn(JSON.stringify(`Movie: ${this.movie}, params: ${params}`))
			}
		})
		this.user = JSON.parse(localStorage.getItem('user'))

	}

	public goBack() {
		// this.router.navigateByUrl('/home', )
	}

}
