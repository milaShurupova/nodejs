const isLeapYear = require('../leapyear.js').isLeapYear;

const expect = require('chai').expect;

describe ('Leap year test', () => {

    it('1. check reqular not leap', () => {
        let l1 = isLeapYear(1919);
        expect(l1).to.be.false;
    });

    it('2. check leap not century end', () => {
        let l2 = isLeapYear(2020);
        expect(l2).to.be.true;
    });

    it('3. check century end', () => {
        let l3 = isLeapYear(1900);
        expect(l3).to.be.false;
    });

    it('4. check millenium', () => {
        let l4 = isLeapYear(2000);
        expect(l4).to.be.true;
    });

})