const Item = require('../../models/Item');

describe('Item', () => {
  beforeEach(() => {
    this.item;

    Item.create({
      name: 'Chocolate'
    })
      .then(res => {
        this.item = res;
      })
      .catch(err => {
        console.log(err);
      });
  });
  describe('#create()', () => {
    it('should create an item', () => {
      Item.create({
        name: 'Chocolate'
      })
        .then(item => {
          expect(item.name).toBe('Chocolate');
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });
  describe('#delete()', () => {
    it('should delete an item', () => {
      Item.remove({
        name: 'Chocolate'
      })
        .then(item => {
          expect(item.name).toNotBe('Chocolate');
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });
  describe('#edit()', () => {
    it('should edit an item', () => {
      Item.update({
        name: 'Chocolate1'
      })
        .then(item => {
          expect(item.name).toBe('Chocolate1');
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });
});
