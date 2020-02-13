import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private api: ApiService
  ) { }
  public user
  ngOnInit() {
    const userEmail = this.route.snapshot.paramMap.get("userEmail")
    console.log(userEmail)
    this.api.getUserData(userEmail).then(user => {
      console.log(user)
    })
  }

}
