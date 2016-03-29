import { parseTableMeta } from '../lib/parse';
import chai from 'chai';
import fs from 'fs';
import csv from 'csv';
import path from 'path';
chai.should();

describe("parse", () => {

  it('should not work when the file is empty');

  it('should not work when there is no header', done => {
    fs.readFile(path.join(__dirname, 'fixtures/headless.csv'), (err, data) => {
      if (err) {
        done(err);
      } else {
        csv.parse(data, (err, data) => {
          if (err) {
            done();
          } else {
            done(new Error('this should fail'));
          }
        });
      }
    });
  });

  it('should work when there is a header', done => {
    fs.readFile(path.join(__dirname, 'fixtures/regular.csv'), (err, data) => {
      if (err) {
        done(err);
      } else {
        csv.parse(data, (err, data) => {
          if (err) {
            done(err);
          } else {
            console.log(parseTableMeta(data));
            done();
          }
        });
      }
    });
  });

});