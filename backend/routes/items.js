const router = require("express").Router();
let Item = require('../models/items');

router.route('/').get((req, res) => {
  Item.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Item.findById(req.params.id)
  .then(item => res.json(item))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const startTime = req.body.startTime;
  const duration = Number(req.body.duration);

  const newItem = new Item({
    username,
    description,
    startTime,
    duration,
  });

  newItem.save()
    .then(() => res.json({ message: 'Item added!' }))
    .catch(err => res.status(400).json({ Error: err }));
});

router.route('/:id').delete((req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Item deleted.' }))
    .catch(err => res.status(400).json({ Error: err }));
});

router.route('/update/:id').put(async (req, res) => {
  Item.findById(req.params.id)
    .then(item => {
      item.username = req.body.username;
      item.description = req.body.description;
      item.startTime = req.body.startTime;
      item.duration = Number(req.body.duration);

      item.save()
        .then(() => res.json({ message: 'Item updated!' }))
        .catch(err => res.status(400).json({ Error: err }));
    })
    .catch(err => res.status(400).json({ Error: err }));
});


module.exports = router;