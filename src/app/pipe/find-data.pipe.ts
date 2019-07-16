import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findData'
})
export class FindDataPipe implements PipeTransform {

  transform(value: any[], id: number, name: string,  price: number): any {
    if(!id && name  && price){
      return value;
    }else {
      if(id){
        value = value.filter( x => {
          return x.id.toString().indexOf(id) != -1;
        });
      }
      if(name){
        value = value.filter( x=> {
          console.log(x);
          return x.name.toLowerCase().indexOf(name.toLowerCase()) != -1;
        });
      }
      if(price){
        value = value.filter( x=> {
          return x.phone.toString().indexOf(price) != -1;
        });
      }
      return value;
    }
  }


}
