import { Component, OnInit } from '@angular/core';
import { NavController, Events } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.page.html',
  styleUrls: ['./movie-list.page.scss'],
})
export class MovieListPage implements OnInit {

  public movies = []

  public user
  public token = ''


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
      })
  }

  public openMovieDetails(movie) {

      this.navCtrl.navigateRoot(['movie'], { queryParams: { movie: JSON.stringify(movie) } })
  }

  public backHome() {
      this.navCtrl.navigateRoot(['home'])
  }

}
