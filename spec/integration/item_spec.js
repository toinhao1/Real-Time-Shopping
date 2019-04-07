const request = require('request');
const server = require('../../server');
const base = 'http://localhost:5000/items';
const Item = require('../../models/Item');

describe('routes : items', () => {
  beforeEach(done => {
    this.item;

    Item.create({
      name: 'bananas'
    })
      .then(item => {
        this.item = item;
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });

  describe('GET /items', () => {
    it('should return a status code 200 and all items', done => {
      request.get(base, (err, res, name) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(name).toContain('bananas');
        done();
      });
    });
  });
  describe('POST /items', () => {
    it('should create a new item', done => {
      request.post(base, (item = { name: 'bananas' }), (err, res, body) => {
        Item.findOne({ where: { name: 'bananas' } })
          .then(item => {
            expect(res.statusCode).toBe(200);
            expect(item.name).toBe('bananas');
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });
});
