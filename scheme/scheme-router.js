const express = require('express');
const model = require('./scheme-model')
const db = require('../data/dbconfig');

const router = express.Router();


// READ ALL SCHEMES

router.get('/',  (req, res) => {
    model.find()
    .then(schemes =>{
      res.json(schemes)
    })
    .catch(error => {
      res.status(500).json({
        Error: "Could not get all schemes. Please check Line 8"
      })
    })
})


// READ SCHEME BY ID

router.get('/:id', (req, res) => {
  const { id } = req.params;

  model.findById(id)
  .then(scheme => {
    if (scheme) {
      res.json(scheme);
    } else {
      res.status(404).json({
        Error: "Could not find scheme with given id. Please check line 23" })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get schemes. Please check line 23' });
  });
});


// READ STEPS BY SCHEME ID
// : needs a value after
router.get('/:id/steps', (req, res) => {
  const  {id}  = req.params;

   model.findSteps(id)
  .then(steps => {
    if (steps.length) {
      res.json(steps);
    } else {
      res.status(404).json({
        Error: "Could not find steps for given scheme id. Please check line 43"
      })
    }
  })
  .catch(err => {
    res.status(500).json({
      Error: "Failed to get steps. Please check line 43"
    });
  });
});


// CREATE SCHEME

router.post('/', (req, res) => {
  const schemeData = req.body;

  model.add(schemeData)
  .then(scheme => {
    return res.status(201).json({
      Success: "Scheme " + scheme + " was created successfully."
    });
  })
  .catch (err => {
    return res.status(500).json({
      Error: "Failed to create new scheme. Please check line 66"
    });
  });
});




// DELETE SCHEME

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  model.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({
        Deleted: deleted + " Scheme has been successfully deleted."
    });
    } else {
      res.status(404).json({
        Error: 'Could not find scheme with given id. Please try another scheme id.'
      });
    }
  })
  .catch(err => {
    res.status(500).json({ Error: 'Failed to delete scheme. Please check your code' });
  });
});

module.exports = router;
