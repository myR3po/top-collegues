import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import {Observable, BehaviorSubject} from 'rxjs/Rx'

import { Avis } from '../domain/avis'
import { Collegue } from '../domain/collegue'
import { Vote } from '../domain/vote'

import { AvisService } from './avis.service'

import { environment as env } from '../../../environments/environment'

@Injectable()
export class CollegueService {
	
	private collegues:BehaviorSubject<Collegue[]> = new BehaviorSubject([])
	
	constructor(private http:HttpClient, private avisService:AvisService){
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
		
		this.avisService.updateAvisMessage(new Vote(unCollegue, Avis.LIKE))
		let body:string = '{"action":"aimer"}'
		return this.http.patch<Collegue>(env.backendUrl+ '/' + unCollegue.pseudo,
							body,
							{headers: new HttpHeaders().set('Content-Type', 'application/json')})
	}

	detesterUnCollegue(unCollegue:Collegue) : Observable<Collegue> {

		this.avisService.updateAvisMessage(new Vote(unCollegue, Avis.DISLIKE))
		let body:string =  '{"action":"detester"}'
		return this.http.patch<Collegue>(env.backendUrl+ '/' + unCollegue.pseudo,
				body,
				{headers: new HttpHeaders().set('Content-Type', 'application/json')})
	}
}