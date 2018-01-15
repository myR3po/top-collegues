import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Avis } from './../shared/domain/avis'
import { Collegue } from '../shared/domain/collegue'
import { CollegueService } from '../shared/service/collegue.service'
import { VoteService } from './../shared/service/vote.service';

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.css']
})
export class PageDetailComponent implements OnInit {
	private pseudo:string
	private collegue:Collegue

	constructor(private route: ActivatedRoute, private collegueService:CollegueService, private voteService:VoteService) {
		this.route.params.subscribe(params => { this.pseudo = params['pseudo'] })
	}

	ngOnInit() {
		this.collegueService.listerCollegues().subscribe(data => {
			this.collegue = data.filter(c => c.pseudo == this.pseudo)[0]
		})
		
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
