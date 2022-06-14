import chai from 'chai';
import {limit} from "./helpers";

const {expect} = chai;

test('Limits: #1', () => {
    expect(limit(-1, 0, 20)).equal(0);
    expect(limit(0, 0, 20)).equal(0);
    expect(limit(1, 0, 20)).equal(1);
    expect(limit(20, 0, 20)).equal(20);
    expect(limit(21, 0, 20)).equal(20);

    expect(limit(-1, 20, 0)).equal(0);
    expect(limit(0, 20, 0)).equal(0);
    expect(limit(1, 20, 0)).equal(1);
    expect(limit(20, 20, 0)).equal(20);
    expect(limit(21, 20, 0)).equal(20);
});