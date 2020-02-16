import { User } from './../models/user.model';
import { ApiService } from './../services/api.service';
import { Component } from '@angular/core';
import { NavController, Events } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    public movies = []

    public user
    public token = ''

    public bestMovie

    public showGif = false


    constructor(
        private navCtrl: NavController,
        private api: ApiService,
        private router: Router,
        public events: Events
    ) { }

    ngOnInit() {
        this.api.getMovieList().then(movies => {
            for (let key in movies) {
                this.movies.push(movies[key])
            }
            this.user = JSON.parse(localStorage.getItem('user'))
            this.token
            this.getBestMovie()
            this.api.logEgg().then(result => console.log(result))
        })
    }

    public goToMovieList() {
        this.navCtrl.navigateRoot(['movie-list'])
    }

    public getBestMovie() {
        this.api.getBestMovie().then(bestMovie => {
            console.log(bestMovie)
            this.bestMovie = bestMovie[0]
        })
    }

    public backHome() {
        this.navCtrl.navigateRoot(['home'])
    }

    public displayGif() {
        this.showGif = true
        setTimeout(() => {
            this.showGif = false
        }, 1500);
    }

}
