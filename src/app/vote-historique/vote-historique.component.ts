import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Rx'

import { VoteService } from './../shared/service/vote.service';
import { Vote } from '../shared/domain/vote'

@Component({
  selector: 'app-vote-historique',
  templateUrl: './vote-historique.component.html',
  styleUrls: ['./vote-historique.component.css']
})
export class VoteHistoriqueComponent implements OnInit {

	private votes:Observable<Vote[]>
	
	constructor(private voteService:VoteService){}

	ngOnInit() {
		this.votes = this.voteService.listerVotes()
	}

}
