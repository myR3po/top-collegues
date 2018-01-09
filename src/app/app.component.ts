import { Component } from '@angular/core';
import { Collegue } from './shared/domain/collegue';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	private collegues:Collegue[] = [];
	
	private successMessage: string
	private opened:boolean
	
	ngOnInit() {
		this.collegues.push(new Collegue('Guy', 'https://avatars0.githubusercontent.com/u/18171845?s=400&v=4', 50))
		this.collegues.push(new Collegue('Alfred', 'https://avatars0.githubusercontent.com/u/18171845?s=400&v=4', 60))
		this.collegues.push(new Collegue('Roseline', 'https://avatars0.githubusercontent.com/u/18171845?s=400&v=4', 80))
		this.collegues.push(new Collegue('jean', 'https://avatars0.githubusercontent.com/u/18171845?s=400&v=4', 65))
		this.collegues.push(new Collegue('pierre', 'https://avatars0.githubusercontent.com/u/18171845?s=400&v=4', 77))
		
	}
	
	
	add(pseudo:HTMLInputElement, imageUrl: HTMLInputElement) {
		this.collegues.push(new Collegue(pseudo.value, imageUrl.value))
		this.opened = true
		this.successMessage = `Le collège ${pseudo.value} a été ajouté avec succès.` ;
		setTimeout(() => this.opened = false, 20000);
		pseudo.value = ''
		imageUrl.value = ''
		return false; // pour éviter le rechargement de la page
	}
	
}