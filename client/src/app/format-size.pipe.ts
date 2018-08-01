import { Pipe, PipeTransform } from '@angular/core';
import * as prettyBytes from 'pretty-bytes';

@Pipe({
  name: 'formatSize',
})
export class FormatSizePipe implements PipeTransform {
  transform(value: number): string {
    return prettyBytes(value);
  }
}
