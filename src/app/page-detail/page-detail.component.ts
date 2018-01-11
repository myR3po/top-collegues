import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Avis } from './../shared/domain/avis'
import { Collegue } from '../shared/domain/collegue'
import { CollegueService } from '../shared/service/collegue.service'

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.css']
})
export class PageDetailComponent implements OnInit {
	private pseudo:string
	private collegue:Collegue

	constructor(private route: ActivatedRoute, private collegueService:CollegueService) {
		this.route.params.subscribe(params => { this.pseudo = params['pseudo'] })
	}

	ngOnInit() {
		this.collegueService.listerCollegues().then(data => {
			this.collegue = data.filter(c => c.pseudo == this.pseudo)[0]
		})
		
	}
	
	setOpinion(event) {

		if(event === Avis.LIKE){
			this.collegueService.aimerUnCollegue(this.collegue).then(data => {
				this.collegue.score = data.score
			}).catch(erreur => {})
		}else{
			this.collegueService.detesterUnCollegue(this.collegue).then(data => {
				this.collegue.score = data.score
			}).catch(erreur => {})
		}
		
	}

}
