const Test = require("../models/Test");

exports.listAllTests = (req, res) => {
  Test.find({}, (err, test) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(test);
  });
};

exports.createNewTest = (req, res) => {
  let newTest = new Test(req.body);
  newTest.save((err, test) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(test);
  });
};

exports.readTest = (req, res) => {
  Test.findById(req.params.testid, (err, test) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(test);
  });
};

exports.updateTest = (req, res) => {
  Test.findOneAndUpdate(
    { _id: req.params.testid },
    req.body,
    { new: true },
    (err, test) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(test);
    }
  );
};

exports.deleteTest = (req, res, body) => {
  Test.deleteOne({ _id: req.params.testid }, (err, test) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: "Test successfully deleted" });
  });
}; 
