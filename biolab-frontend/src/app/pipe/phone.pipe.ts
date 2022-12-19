import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/(\d{2})?(\d{1})?(\d{4})?(\d{4})/, '($1) $2 $3-$4');
  }

}
