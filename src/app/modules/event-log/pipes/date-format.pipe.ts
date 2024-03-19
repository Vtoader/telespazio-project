import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'formatDate'
})

export class FormatDatePipe implements PipeTransform {
    transform(value: string): Date {
        return new Date(value.substring(0, 19));
    }

}