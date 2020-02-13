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

    public getUserData(userEmail):Promise<any> {
        return this.http.put('http://localhost:3000/user', {email:userEmail}, {headers:this.httpOptions}).toPromise()
    }

    public getMovieData(movieID) {

    }

    public createUser(user):Promise<any> {
        return this.http.post( 'http://localhost:3000/user', user, {headers:this.httpOptions}).toPromise()
    }
    
    public login(user):Promise<any> {
        return this.http.put( 'http://localhost:3000/login', user, {headers:this.httpOptions}).toPromise()
    }

    public getMovieList() {
        return this.http.get('http://localhost:3000/movies', {headers:this.httpOptions}).toPromise()
    }


    
}
