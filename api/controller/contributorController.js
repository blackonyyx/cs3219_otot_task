import Contributor from "../model/contributorModel.js";

// handle index actions

export const showAllContributor = async (req, res) => {
  Contributor.get((err, contributor) => {
    if (err) {
      return res.status(404).json({
        status: "error",
        message: err,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Contributors retrieved successfully",
      data: contributor,
    });
  });
};

// create contact actions
export const createContributor = async (req, res) => {
  // console.log(req.body)
  const contributor = new Contributor({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    phone: req.body.phone,
    userDescription: req.body.userDescription,
  });

  contributor.save(function (err) {
    if (err) {
      return res.status(500).json({ err });
    }
    res.status(201).json({
      message: "contributor has been created",
      data: contributor,
    });
  });
};

// Contributor view
export const viewContributor = async function (req, res) {
  Contributor.findById(req.params.contributor_id, function (err, contributor) {
    if (err) {
      res.status(404).json({
        error: err,
      });
    }
    res.json(200, {
      message: "Contributor details are loading",
      data: contributor,
    });
  });
};

// Contributor update
export const updateContributor = function (req, res) {
  Contributor.findById(req.params.contributor_id, function (err, contributor) {
    if (err) res.send(err);
    contributor.name = req.body.name ? req.body.name : contributor.name;
    contributor.gender = req.body.gender ? req.body.gender : contributor.gender;
    contributor.email = req.body.email ? req.body.email : contributor.email;
    contributor.phone = req.body.phone ? req.body.phone : contributor.phone;
    contributor.update_date = Date.now(); // last updated date
    contributor.userDescription = req.body.userDescription
      ? req.body.gender
      : contributor.gender;
    // save contact and check for errors
    contributor.save(function (err) {
      if (err) {
        res.status(500).json({
          error: err,
        });
      }
      res.status(200).json({
        message: "Contributor Info updated",
        data: contributor,
      });
    });
  });
};

// Contributor delete
export const deleteContributor = async function (req, res) {
  Contributor.remove(
    {
      _id: req.params.contributor_id,
    },
    function (err, contributor) {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json({
        status: "success",
        message: `Contributor ${contributor.name} deleted successfully`,
      });
    }
  );
};
