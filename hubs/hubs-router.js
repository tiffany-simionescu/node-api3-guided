const express = require('express');

const { 
  validateHubId, 
  validateHubData 
} = require('../middleware/validate');

const Hubs = require('./hubs-model.js');
const Messages = require('../messages/messages-model.js');

const router = express.Router();

// this only runs if the url has /api/hubs in it
router.get('/', (req, res) => {
  Hubs.find(req.query)
  .then(hubs => {
    res.status(200).json(hubs);
  })
  .catch(error => {
    console.log(error);
    // res.status(500).json({
    //   message: 'Error retrieving the hubs',
    // });
    next(error);
  });
});

// /api/hubs/:id

router.get('/:id', validateHubId(), (req, res) => {
  res.json(req.hub)
});

router.post('/', validateHubData(), (req, res) => {
  Hubs.add(req.body)
  .then(hub => {
    res.status(201).json(hub);
  })
  .catch(error => {
    // log error to server
    console.log(error);
    // res.status(500).json({
    //   message: 'Error adding the hub',
    // });
    next(error);
  });
});

router.delete('/:id', validateHubId(), (req, res) => {
  Hubs.remove(req.hub.id)
  .then(() => {
      res.status(200).json({ message: 'The hub has been nuked' });
  })
  .catch(error => {
    // log error to server
    console.log(error);
    // res.status(500).json({
    //   message: 'Error removing the hub',
    // });
    next(error);
  });
});

router.put('/:id', validateHubData(), validateHubId(), (req, res) => {
  Hubs.update(req.hub.id, req.body)
  .then(hub => {
      res.status(200).json(hub);
  })
  .catch(error => {
    // log error to server
    console.log(error);
    // res.status(500).json({
    //   message: 'Error updating the hub',
    // });
    next(error)
  });
});

// add an endpoint that returns all the messages for a hub
// this is a sub-route or sub-resource
router.get('/:id/messages', (req, res) => {
  Hubs.findHubMessages(req.params.id)
  .then(messages => {
    res.status(200).json(messages);
  })
  .catch (error => {
    // log error to server
    console.log(error);
    // res.status(500).json({
    //   message: 'Error getting the messages for the hub',
    // });
    next(error);
  });
});

// add an endpoint for adding new message to a hub
router.post('/:id/messages', (req, res) => {
  const messageInfo = { ...req.body, hub_id: req.params.id };

  Messages.add(messageInfo)
  .then(message => {
    res.status(210).json(message);
  })
  .catch(error => {
    // log error to server
    console.log(error);
    // res.status(500).json({
    //   message: 'Error getting the messages for the hub',
    // });
    next(error);
  });
});

module.exports = router;
