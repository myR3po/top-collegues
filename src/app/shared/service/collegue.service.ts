import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import {Observable, BehaviorSubject} from 'rxjs/Rx';

import { Collegue } from '../domain/collegue'

import { environment as env } from '../../../environments/environment'

@Injectable()
export class CollegueService {
	
	private collegues:BehaviorSubject<Collegue[]> = new BehaviorSubject([])
	
	constructor(private http:HttpClient){
		this.refreshData()
	}

	listerCollegues() : Observable<Collegue[]> {
		return this.collegues.asObservable();
	}

	refreshData() {
		this.http.get<Collegue[]>(env.backendUrl).subscribe(data => {
						this.collegues.next(data)
					})
	}

	sauvegarder(newCollegue:Collegue) : void {
			this.http.post<Collegue[]>(env.backendUrl,
					newCollegue.toString(), 
					{headers: new HttpHeaders().set('Content-Type', 'application/json')})
			.subscribe(data => {
					this.collegues.next(data)
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