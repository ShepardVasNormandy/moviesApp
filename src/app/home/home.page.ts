import { User } from './../models/user.model';
import { ApiService } from './../services/api.service';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    public movies = []


    constructor(
        private navCtrl: NavController,
        private api: ApiService,
    ) { }

    ngOnInit() {
        this.api.getMovieList().then(movies => {
            for (let key in movies) {
                this.movies.push(movies[key])
            }
            console.log(this.movies)
        })
    }


}
