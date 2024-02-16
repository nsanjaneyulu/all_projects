import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.toLowerCase().includes(searchText);
    });
   }
// transform(value: any, args?: any): any {
//     // Remove the duplicate elements
//     var art = value.map(x=>{
//         return x.ArticleTags.map(y=>{ return y.value;});;
//     }).reduce((acc,ele,i)=>{
//         acc = acc.concat(ele);
//         return acc;
//     });
//     return new Set(art);
// }
}