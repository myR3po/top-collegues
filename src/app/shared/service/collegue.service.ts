import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import {Observable} from 'rxjs/Rx';

import { Collegue } from '../domain/collegue'

import { environment as env } from '../../../environments/environment'

@Injectable()
export class CollegueService {
	
	private collegues:Collegue[] = []
	
	constructor(private http:HttpClient){}

	listerCollegues() : Observable<Collegue[]> {

		return Observable.create(observer => {
			if(this.collegues.length === 0){
				this.http.get<Collegue[]>(env.backendUrl).subscribe(data => {
					this.collegues = data
					observer.next(this.collegues)
					observer.complete()
				})
			}else{
				observer.next(this.collegues)
				observer.complete()
			}
		})
	}

	sauvegarder(newCollegue:Collegue) : Observable<Collegue[]> {
		return Observable.create(observer => {
			this.http.post<Collegue[]>(env.backendUrl,
					newCollegue.toString(), 
					{headers: new HttpHeaders().set('Content-Type', 'application/json')})
			.subscribe(data => {
					this.collegues = data
					observer.next(this.collegues)
					observer.complete()
			})
		})
	}

	aimerUnCollegue(unCollegue:Collegue) : Observable<Collegue> {
		let body:string = '{"action":"aimer"}'

		return this.http.patch<Collegue>(env.backendUrl+ '/' + unCollegue.pseudo,
							body,
							{headers: new HttpHeaders().set('Content-Type', 'application/json')})
	}

	detesterUnCollegue(unCollegue:Collegue) : Observable<Collegue> {

		let body:string =  '{"action":"detester"}'

		return this.http.patch<Collegue>(env.backendUrl+ '/' + unCollegue.pseudo,
				body,
				{headers: new HttpHeaders().set('Content-Type', 'application/json')})
	}
}