import { Component } from '@angular/core'
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks'

import { Collegue } from './shared/domain/collegue'
import { CollegueService } from './shared/service/collegue.service'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	private collegues:Collegue[] = []

	private message: string
	private opened:boolean
	private canDismiss:boolean = true
	private typeMessage:string
	
	constructor(private collegueService:CollegueService){}
	
	ngOnInit() {

		
	}
	
	
	add(pseudo:HTMLInputElement, imageUrl: HTMLInputElement) {
		let c:Collegue =  new Collegue(pseudo.value, imageUrl.value);
		
		this.collegueService.sauvegarder(c).then(data => {
			this.collegues = data
			this.message = `Le collègue ${pseudo.value} a été ajouté avec succès.`
			this.typeMessage = "success"
			this.opened = true
			
			setTimeout(() => this.opened = false, 20000)
			
			pseudo.value = ''
			imageUrl.value = ''
		}).catch(erreur => {
			this.message = `Le collègue ${pseudo.value} existe déjà.`
			this.typeMessage = "danger"
			this.opened = true
		
			setTimeout(() => this.opened = false, 20000)
			
			pseudo.value = ''
			imageUrl.value = ''

		})
		
		
		
		return false; // pour éviter le rechargement de la page
	}

}