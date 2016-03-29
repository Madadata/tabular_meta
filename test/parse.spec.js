import { parseTableMeta } from '../lib/parse';
import chai from 'chai';
import fs from 'fs';
import csv from 'csv';
import path from 'path';
chai.should();

describe("parse", () => {

  it('should not work when the file is empty');

  it('should not work when there is no header');

  it('should work when there is a header', done => {
    fs.readFile(path.join(__dirname, 'fixtures/regular.csv'), (err, data) => {
      if (err) {
        done(err);
      } else {
        csv.parse(data, (err, data) => {
          if (err) {
            done(err);
          } else {
            const result = parseTableMeta(data);
            result.should.be.deep.equal({
              columns: [
                {
                  maxLength: 4,
                  minLength: 4,
                  type: "string",
                  values: [
                    "john",
                    "mary"
                  ]
                },
                {
                  maxLength: 7,
                  minLength: 6,
                  type: "string",
                  values: [
                    "student",
                    "doctor"
                  ]
                },
                {
                  maxLength: 2,
                  minLength: 2,
                  maxValue: 30,
                  minValue: 20,
                  type: "number",
                  values: [
                    20,
                    30
                  ]
                }
              ],
              headers: [
                "name",
                "job",
                "age"
              ]
            });
            done();
          }
        });
      }
    });
  });

});