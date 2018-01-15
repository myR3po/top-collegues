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
	
	private status:BehaviorSubject<Boolean> = new BehaviorSubject(true)
	
	constructor(private http:HttpClient, private avisService:AvisService){
		this.refreshData()
		this.checkConnection()
	}

	listerCollegues() : Observable<Collegue[]> {
		return this.collegues.asObservable();
	}

	refreshData() {
		this.http.get<Collegue[]>(env.backendUrlCollegues).subscribe(data => {
						this.collegues.next(data)
					})
	}

	sauvegarder(newCollegue:Collegue) : void {
			this.http.post<Collegue[]>(env.backendUrlCollegues,
					newCollegue.toString(), 
					{headers: new HttpHeaders().set('Content-Type', 'application/json')})
			.subscribe(data => {
					this.collegues.next(data)
			})
	}
	
	// -----
	
	getStatus(): Observable<Boolean>{
		
		return this.status.asObservable()
	}
	
	checkConnection(){
		
		if(window.navigator.onLine){
			
			Observable.interval(2000)
			.subscribe(() => this.http.get<Collegue[]>(env.backendUrlCheck)
						.subscribe(data => {						
							this.status.next(true)
						}, 
						error => {
								if(error.status === 200){
									this.status.next(true)
								}else{
									this.status.next(false) 	
								}						
								
							})
					)
		}else{
			this.status.next(false)
		}
	}
	
}