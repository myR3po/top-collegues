import { Component, OnInit } from '@angular/core'

import { Collegue } from '../shared/domain/collegue'
import { CollegueService } from '../shared/service/collegue.service'
import { FiltreService } from '../shared/service/filtre.service'


@Component({
  selector: 'app-classique',
  templateUrl: './classique.component.html',
  styleUrls: ['./classique.component.css']
})
export class ClassiqueComponent implements OnInit {
	private collegues:Collegue[] = [];

	private limit:string
	private pseudoToFilter:string

  constructor(private collegueService:CollegueService, private filtreService:FiltreService){}

  ngOnInit() {
	  
		this.collegueService.listerCollegues().subscribe(data => {
			this.collegues = data
			this.filtreService.updateLimite(this.collegues.length)
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

}
