import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uniqueFilter',
  pure: false
})
export class UniqueFilterPipe implements PipeTransform {

  transform(collection: any, keyname: string): any {
    var output = [];
    var keys = [];

    if (collection) {
      collection.forEach(item => {
        var key = item[keyname];

        if (keys.indexOf(key) === -1) {
          
          keys.push(key);
          output.push(item);
        }
      });
    }
    return output;
  }

}
