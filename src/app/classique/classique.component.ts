import { Component, OnInit } from '@angular/core'

import { Collegue } from '../shared/domain/collegue'
import { CollegueService } from '../shared/service/collegue.service'

@Component({
  selector: 'app-classique',
  templateUrl: './classique.component.html',
  styleUrls: ['./classique.component.css']
})
export class ClassiqueComponent implements OnInit {
	private collegues:Collegue[] = [];

	private message: string
	private opened:boolean
	private canDismiss:boolean = true
	private typeMessage:string

  constructor(private collegueService:CollegueService){}

  ngOnInit() {
		this.collegueService.listerCollegues().then(data => {
			this.collegues = data
		})
		.catch(erreur => {
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

}
