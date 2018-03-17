import { Injectable } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class TableColumnUtils  {

  getFilterPerdicate(columns: string[]): ((data: Object, filter: string) => boolean) {
    const filterPredicate = (data: Object, filter: string): boolean => {
      var accumulator = '';
      for ( var i = 0; i <= columns.length - 1 ; i++) {
        var value = this.obtenerProperty(columns[i], data);
        if (value != null) {
          accumulator = accumulator + value;
        }
      }
      let dataStr = accumulator.toLowerCase();
      dataStr = dataStr.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return dataStr.indexOf(filter) != -1;
    };
    return filterPredicate;
  }

  getSortingDataAccessor(): ((data: Object, sortHeaderId: string) => string|number) {
    const sortingDataAccessor = (data: Object, sortHeaderId: string): string|number => {
      let value: any = this.obtenerProperty(sortHeaderId, data);
      if (typeof value === 'string' && !value.trim()) {
        return value;
      }
      return isNaN(+value) ? value : +value;
    };
    return sortingDataAccessor;
  }

  obtenerProperty(property: string, data: Object ): Object {
    let result = null;
    if (property.indexOf('.') != -1) {
      data = data[property.substring(0, property.indexOf('.'))];
      result = this.obtenerProperty(property.substring(property.indexOf('.') + 1, property.length), data);
      console.log('resultado recursion:' + result);
    } else {
      result = data[property];
    }
    return result;
  }

  normalizeFilter(filterValue: string): string {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    filterValue = filterValue.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return filterValue;
  }

}
