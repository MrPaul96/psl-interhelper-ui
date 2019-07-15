import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Interview } from 'src/app/core/models/interview.model';

@Injectable()
export class StaffService {

    public fakeInterviews: Interview[] = [];

    constructor(private ngbDateParserFormatter: NgbDateParserFormatter) {
    }

    convertStringIntoDateValidForInput(stringDate: string): NgbDateStruct {
        const date = moment(stringDate);
        const ngbDateStruct = {
            day: Number(date.format('D')),
            month: Number(date.format('M')),
            year: Number(date.format('Y'))
        };
        return ngbDateStruct;
    }

    convertDateInputIntoString(date): string {
        return this.ngbDateParserFormatter.format(date);
    }
}
