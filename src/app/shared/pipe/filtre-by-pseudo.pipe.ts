import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtreByPseudo'
})
export class FiltreByPseudoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
	if(value && value.length){

		if(args == undefined){
			return value
		}
		if(args.trim()){
			return value.filter(c => c.pseudo.startsWith(args.trim()))
		}
	}

    return value;
  }

}
