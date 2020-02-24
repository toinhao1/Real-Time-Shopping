const mongoose = require('mongoose')

// Item Model
const Item = require('../models/Item');

module.exports = {
  addItem(io, item) {
    const newItem = new Item({
      name: item.name
    });

    newItem.save()
      .then(item => {
        io.emit('ItemAdded', item)
      })
      .catch((err) => {
        console.log(err)
      })
  },

  updateItem(io, newItem) {
    Item.findById(newItem.id, (err, item) => {
      if (!item) {
        console.log(err)
        // res.status(404).send('Data is not found');
      }
      else {
        item.name = newItem.name
        item.completed = newItem.completed;
        item
          .save()
          .then(updateItem => {
            io.emit('ItemUpdated', updateItem)
            // res.json(item);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  },

  deleteItem(io, id) {
    Item.findById(id)
      .then(item => item.remove()
        .then(() => io.emit('ItemDeleted', item)))
      .catch(err => console.log(err));
  },
}
