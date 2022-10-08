import { DateHelper } from "../source/helpers/date.helper";
import { expect } from 'chai';

describe('Test date helper TS', () => {

    it('December date', () => {
        let birthday: Date = new Date(1995, 11, 17, 3, 24, 0);
        let birthdaytest: string = DateHelper.dateToString(birthday);
        expect(birthdaytest).equals("19951217 03:24:00");
    })
    
})