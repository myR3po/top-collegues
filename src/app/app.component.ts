import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { Collegue } from './shared/domain/collegue';
import { CollegueService } from './shared/service/collegue.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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

			this.successMessage = `Erreur interne, Le serveur est injoignable`
			this.typeMessage = "warning"
			this.canDismiss = false
			this.opened = true
			console.log(erreur)
		})
	}
	
	
	add(pseudo:HTMLInputElement, imageUrl: HTMLInputElement) {
		let c:Collegue =  new Collegue(pseudo.value, imageUrl.value);
		
		this.collegueService.sauvegarder(c).then(data => {
			this.collegues = data
			this.successMessage = `Le collègue ${pseudo.value} a été ajouté avec succès.`
			this.typeMessage = "success"
			this.opened = true
			
			setTimeout(() => this.opened = false, 20000)
			
			pseudo.value = ''
			imageUrl.value = ''
		}).catch(erreur => {
			this.successMessage = `Le collègue ${pseudo.value} existe déjà.`
			this.typeMessage = "danger"
			this.opened = true
		
			setTimeout(() => this.opened = false, 20000)
			
			pseudo.value = ''
			imageUrl.value = ''

		})
		
		
		
		return false; // pour éviter le rechargement de la page
	}

}