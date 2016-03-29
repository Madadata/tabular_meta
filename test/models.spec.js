import { ColumnType } from '../lib/models';
import chai from 'chai';
chai.should();

describe("models", () => {

  it('should work', () => {
    ColumnType.should.not.be.empty;
  });

});