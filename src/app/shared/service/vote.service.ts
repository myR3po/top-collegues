import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import {Observable, BehaviorSubject} from 'rxjs/Rx'

import { Avis } from '../domain/avis'
import { Collegue } from '../domain/collegue'
import { Vote } from '../domain/vote'

import { AvisService } from './avis.service'

import { environment as env } from '../../../environments/environment'

@Injectable()
export class VoteService {

	private votes:BehaviorSubject<Vote[]> = new BehaviorSubject([])
	private currentVoteId:number = 0
	
	constructor(private http:HttpClient, private avisService:AvisService){
		this.refreshData()
		this.lastVotes()
	}

	listerVotes() : Observable<Vote[]> {
		return this.votes.asObservable();
	}
	
	refreshData() {
		this.http.get<Vote[]>(env.backendUrlVotes).subscribe(data => {
						this.votes.next(data)
					})
	}
	
	
	aimerUnCollegue(unCollegue:Collegue) : Observable<Collegue> {
		
		this.avisService.updateAvisMessage(new Vote(0, unCollegue, Avis.LIKE))
		let body:string = '{"avis":"aimer", "collegue":'+ JSON.stringify(unCollegue) +'}'
		return this.http.patch<Collegue>(env.backendUrlVotes,
							body,
							{headers: new HttpHeaders().set('Content-Type', 'application/json')})
	}

	detesterUnCollegue(unCollegue:Collegue) : Observable<Collegue> {
		this.avisService.updateAvisMessage(new Vote(0, unCollegue, Avis.DISLIKE))
		let body:string =  '{"avis":"detester", "collegue":'+ JSON.stringify(unCollegue) +'}'
		return this.http.patch<Collegue>(env.backendUrlVotes,
				body,
				{headers: new HttpHeaders().set('Content-Type', 'application/json')})
	}
	
	lastVotes() {
		Observable.interval(4000)
			.subscribe(() => {
	
					if(this.votes.value.length !== 0){ 
						this.votes.value.forEach(v => {
							if(v.id > this.currentVoteId){
								this.currentVoteId = v.id
							}
						})
					}

					this.http.get<Vote[]>(env.backendUrlVotes+ '?since=' + this.currentVoteId )
							.subscribe(data => {			
								this.votes.next(data)
							}, 
							error => {								
								}
					)
					
				}
			)
	}
	
	
	
	// webSocket
	// private stompClient: = null;
	
	// connect() {
		// var socket = new SockJS('/gs-guide-websocket');
		// stompClient = Stomp.over(socket);
		// stompClient.connect({}, frame => {
			// setConnected(true);
			// console.log('Connected: ' + frame);
			// stompClient.subscribe('/topic/greetings', greeting => {
				// showGreeting(JSON.parse(greeting.body).content);
			// });
		// });
	// }

	// disconnect() {
		// if (stompClient !== null) {
			// stompClient.disconnect();
		// }
		// setConnected(false);
		// console.log("Disconnected");
	// }

	// sendName() {
		// stompClient.send("/app/hello", {}, JSON.stringify({'name': $("#name").val()}));
	// }
	
}
