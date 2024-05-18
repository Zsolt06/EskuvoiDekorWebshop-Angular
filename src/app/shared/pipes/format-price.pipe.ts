import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPrice'
})
export class FormatPricePipe implements PipeTransform {

  transform(value: number): string {
    return `${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Ft`;
  }

}
