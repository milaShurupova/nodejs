const dateToString = require('../datehelperJS.js').dateToString;

const expect = require('chai').expect;


describe ('Date to string test', () => {

    it('1. check december', () => {
        let birthday = new Date(1995, 11, 17, 3, 24, 0);
        let birthdaytest = dateToString(birthday);
        expect(birthdaytest).equals("19951217 03:24:00");
    });

})

