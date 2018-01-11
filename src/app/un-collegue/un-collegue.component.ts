import { Component, OnInit, Input } from '@angular/core';

import { Collegue } from './../shared/domain/collegue';
import { Avis } from './../shared/domain/avis'

import { CollegueService } from './../shared/service/collegue.service';

@Component({
  selector: 'app-un-collegue',
  templateUrl: './un-collegue.component.html',
  styleUrls: ['./un-collegue.component.css']
})
export class UnCollegueComponent implements OnInit {

	@Input() collegue:Collegue;

	constructor(private collegueService:CollegueService){}

	ngOnInit() {
	}
  
	setOpinion(event) {

		if(event === Avis.LIKE){
			this.collegueService.aimerUnCollegue(this.collegue).then(data => {
				this.collegue = data
			}).catch(erreur => {})
		}else{
			this.collegueService.detesterUnCollegue(this.collegue).then(data => {
				this.collegue = data
			}).catch(erreur => {})
		}
		
	}
  
  

}
