import { Component, OnInit } from '@angular/core';

import { Avis } from './../shared/domain/avis'
import { Collegue } from '../shared/domain/collegue'
import { CollegueService } from '../shared/service/collegue.service'

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {

	private collegues:Collegue[] = []

	private limit:number
	private pseudoToFilter:string

	private message: string
	private opened:boolean
	private canDismiss:boolean = true
	private typeMessage:string

  constructor(private collegueService:CollegueService){}

  ngOnInit() {
		this.collegueService.listerCollegues().subscribe(data => {
			this.collegues = data
		},
		erreur => {
			this.collegues.push(new Collegue('Guy', 'https://avatars0.githubusercontent.com/u/18171845?s=400&v=4', 50))
			this.collegues.push(new Collegue('Alfred', 'https://avatars0.githubusercontent.com/u/18171845?s=400&v=4', 60))
			this.collegues.push(new Collegue('Roseline', 'https://avatars0.githubusercontent.com/u/18171845?s=400&v=4', 80))
			this.collegues.push(new Collegue('jean', 'https://avatars0.githubusercontent.com/u/18171845?s=400&v=4', 65))
			this.collegues.push(new Collegue('pierre', 'https://avatars0.githubusercontent.com/u/18171845?s=400&v=4', 77))

			this.message = `Erreur interne, Le serveur est injoignable`
			this.typeMessage = "warning"
			this.canDismiss = false
			this.opened = true
			console.log(erreur)
		})
  }

	setOpinion(event, collegue:Collegue) {

		if(event === Avis.LIKE){
			this.collegueService.aimerUnCollegue(collegue)
				.subscribe(collegueFromService => {
					console.log(collegueFromService)
					this.collegues.filter(collegueFromArray => collegueFromArray.pseudo === collegueFromService.pseudo)[0].score = collegueFromService.score
				})
		}else{
			this.collegueService.detesterUnCollegue(collegue)
				.subscribe(collegueFromService => {
					console.log(collegueFromService)
					this.collegues.filter(collegueFromArray => collegueFromArray.pseudo === collegueFromService.pseudo)[0].score = collegueFromService.score
				})
		}	
	}

	 changeLimite(newLimite){
		if (newLimite >= 1){
			this.limit = newLimite
		}
	}

}
