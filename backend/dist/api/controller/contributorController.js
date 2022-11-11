"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewContributor = exports.updateContributor = exports.showAllContributor = exports.deleteContributor = exports.createContributor = void 0;

var _contributorModel = _interopRequireDefault(require("../model/contributorModel.js"));

var _redis = require("../../cache/redis.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// handle index actions
function getOrSetCache(key, callback) {
  return new Promise((resolve, reject) => {
    const client = (0, _redis.createRedisClient)();
    client.get(key, async (err, data) => {
      if (err) return reject(err);
      if (data != null) return resolve(JSON.parse(data));
      const newData = await callback();
      client.setEx(key, _redis.DEFAULT_EXPIRATION, JSON.stringify(newData));
      resolve(newData);
    });
  });
}

const showAllContributor = async (req, res) => {
  const client = (0, _redis.createRedisClient)();
  client.get("contributors", (err, contributor) => {
    if (err) {
      return res.status(404).json({
        status: "error in the cache",
        message: err
      });
    }

    if (contributor != null) {
      return res.status(200).json({
        status: "success",
        message: "Contributors retrieved successfully from cache",
        data: JSON.parse(contributor)
      });
    } else {
      _contributorModel.default.get((err, contributor) => {
        if (err) {
          return res.status(404).json({
            status: "error",
            message: err
          });
        }

        client.setEx("contributors", _redis.DEFAULT_EXPIRATION, contributor);
        return res.status(200).json({
          status: "success",
          message: "Contributors retrieved successfully",
          data: contributor
        });
      });
    }
  });
}; // create contact actions


exports.showAllContributor = showAllContributor;

const createContributor = async (req, res) => {
  // console.log(req.body)
  try {
    const val = {
      name: req.body.name,
      email: req.body.email
    };

    if (req.body.gender) {
      val.gender = req.body.gender;
    }

    if (req.body.phone) {
      val.phone = req.body.phone;
    }

    if (req.body.userDescription) {
      val.userDescription = req.body.userDescription;
    }

    const contributor = new _contributorModel.default(val);
    await contributor.save();
    const client = (0, _redis.createRedisClient)();
    client.del("contributors");
    return res.status(201).json({
      message: "contributor has been created and cache is cleared",
      data: contributor
    });
  } catch (err) {
    if (err.name === "MongoServerError" & err.code === 11000) {
      return res.status(400).json({
        error: err,
        message: "Duplicate Error Occurred"
      });
    } else {
      return res.status(400).json({
        error: err,
        message: "Validation Error Occurred"
      });
    }
  }
}; // Contributor view


exports.createContributor = createContributor;

const viewContributor = async function (req, res) {
  try {
    getOrSetCache(req.params.contributor_id, _contributorModel.default.findById(req.params.contributor_id, function (err, contributor) {
      if (err || contributor === null) {
        return res.status(404).json({
          error: err,
          message: "file not found"
        });
      }

      return res.status(200).json({
        message: "Contributor details are loading",
        data: contributor
      });
    }));
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }
}; // Contributor update


exports.viewContributor = viewContributor;

const updateContributor = function (req, res) {
  _contributorModel.default.findById(req.params.contributor_id, function (err, contributor) {
    if (err || contributor === null) {
      return res.status(404).json({
        message: "Cannot find contributor",
        error: err
      });
    }

    if ("name" in req.body) {
      contributor.name = req.body.name;
    }

    if ("email" in req.body) {
      contributor.email = req.body.email;
    }

    if ("gender" in req.body) {
      contributor.gender = req.body.gender;
    }

    if ("phone" in req.body) {
      contributor.phone = req.body.phone;
    }

    if ("userDescription" in req.body) {
      contributor.userDescription = req.body.userDescription || contributor.userDescription;
    } // save contact and check for errors


    const client = (0, _redis.createRedisClient)();
    contributor.save(function (err) {
      if (err) {
        return res.status(500).json({
          error: err,
          message: "Validation Error Occurred"
        });
      }

      client.del("contributors");
      return res.status(200).json({
        message: "Contributor Info updated",
        data: contributor
      });
    });
  });
}; // Contributor delete


exports.updateContributor = updateContributor;

const deleteContributor = async function (req, res) {
  _contributorModel.default.deleteOne({
    _id: req.params.contributor_id
  }, function (err, contributor) {
    if (err) {
      res.status(500).send({
        error: err,
        message: "Contributor Id not found"
      });
    } else {
      const client = (0, _redis.createRedisClient)();
      client.del("contributors");
      res.status(200).json({
        status: "success",
        message: `Contributor ${req.params.contributor_id} deleted successfully`
      });
    }
  });
};

exports.deleteContributor = deleteContributor;