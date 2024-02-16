import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'menuFilter'
})
export class MenuFilterPipe implements PipeTransform {

  transform(value: any, filterText: string): any {
    return value ? value.filter(item => item.name.search(new RegExp(filterText, 'i')) > -1) : [];
  }

}
