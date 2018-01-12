import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Avis } from './../shared/domain/avis';
import { CollegueService } from '../shared/service/collegue.service'
@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.css']
})
export class OpinionComponent implements OnInit {

	@Output() opinion:EventEmitter<Avis> = new EventEmitter<Avis>()
	private canDisableButton:boolean = false
	
	constructor(private collegueService:CollegueService) { }

	ngOnInit() {
		this.collegueService.getStatus().subscribe(online => {
			this.canDisableButton = !online
		})
	}
  
	jaime() {
		this.opinion.emit(Avis.LIKE)
	}
	
	jedeteste() {
		this.opinion.emit(Avis.DISLIKE)		
	}


}
