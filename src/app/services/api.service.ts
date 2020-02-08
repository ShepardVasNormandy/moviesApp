import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private API_URL = environment.apiUrl

    public httpOptions = new HttpHeaders({
        'Content-Type': 'application/json'
    })
    
    constructor(private http: HttpClient) { }

    public getUserData(userID) {
        return this.http.get(this.API_URL+'/todos')
    }

    public getMovieData(movieID) {

    }

    public createUser(user) {
        return this.http.post( 'http://localhost:3000/user', user, {headers:this.httpOptions}).toPromise()
    }


    public getMovieList() {
        return this.http.get('http://localhost:3000/movies', {headers:this.httpOptions}).toPromise()
    }
    
}
