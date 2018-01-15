import { Component, OnInit } from '@angular/core';

import { Avis } from './../shared/domain/avis'
import { Collegue } from '../shared/domain/collegue'

import { CollegueService } from '../shared/service/collegue.service'
import { VoteService } from './../shared/service/vote.service'
import { FiltreService } from './../shared/service/filtre.service'

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {

	private collegues:Collegue[] = []

	private limit:string
	private pseudoToFilter:string

  constructor(private collegueService:CollegueService, private voteService:VoteService, private filtreService:FiltreService){}

  ngOnInit() {
		this.collegueService.listerCollegues().subscribe(data => {
			this.collegues = data
			this.limit = '' + this.collegues.length
		},
		erreur => {
			console.log(erreur)
		})
		
		this.filtreService.getPseudoToFilter().subscribe(pseudo => {
			this.pseudoToFilter = pseudo
		})
		
		this.filtreService.getLimit().subscribe(limit => {
			this.limit = limit
		})
  }

	setOpinion(event, collegue:Collegue) {

		if(event === Avis.LIKE){
			this.voteService.aimerUnCollegue(collegue)
				.subscribe(collegueFromService => {
					this.collegues.filter(collegueFromArray => collegueFromArray.pseudo === collegueFromService.pseudo)[0].score = collegueFromService.score
				})
		}else{
			this.voteService.detesterUnCollegue(collegue)
				.subscribe(collegueFromService => {
					this.collegues.filter(collegueFromArray => collegueFromArray.pseudo === collegueFromService.pseudo)[0].score = collegueFromService.score
				})
		}	
	}

}
