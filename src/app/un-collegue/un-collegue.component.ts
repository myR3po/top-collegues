import { Component, OnInit, Input } from '@angular/core'

import { Collegue } from './../shared/domain/collegue'
import { Avis } from './../shared/domain/avis'

import { VoteService } from './../shared/service/vote.service'

@Component({
  selector: 'app-un-collegue',
  templateUrl: './un-collegue.component.html',
  styleUrls: ['./un-collegue.component.css']
})
export class UnCollegueComponent implements OnInit {

	@Input() collegue:Collegue;

	constructor(private voteService:VoteService){}

	ngOnInit() {
	}
  
	setOpinion(event, collegue:Collegue) {

		if(event === Avis.LIKE){
			this.voteService.aimerUnCollegue(this.collegue)
				.subscribe(collegueFromService => {
					this.collegue.score = collegueFromService.score
				})
		}else{
			this.voteService.detesterUnCollegue(this.collegue)
				.subscribe(collegueFromService => {
					this.collegue.score = collegueFromService.score
				})
		}	
	}
  
  

}
