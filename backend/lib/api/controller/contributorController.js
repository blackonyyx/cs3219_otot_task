import Contributor from "../model/contributorModel.js"
// handle index actions

export const showAllContributor = async (req, res) => {
  Contributor.get((err, contributor) => {
    if (err) {
      return res.status(404).json({
        status: "error",
        message: err,
      })
    }
    return res.status(200).json({
      status: "success",
      message: "Contributors retrieved successfully",
      data: contributor,
    })
  })
}

// create contact actions
export const createContributor = async (req, res) => {
  // console.log(req.body)
  try {
    const val = {
      name: req.body.name,
      email: req.body.email,
    }
    if (req.body.gender) {
      val.gender = req.body.gender
    }
    if (req.body.phone) {
      val.phone = req.body.phone
    }
    if (req.body.userDescription) {
      val.userDescription = req.body.userDescription
    }
    const contributor = new Contributor(val)
    await contributor.save()
    return res.status(201).json({
      message: "contributor has been created",
      data: contributor,
    })
  } catch (err) {
    if ((err.name === "MongoServerError") & (err.code === 11000)) {
      return res.status(400).json({
        error: err,
        message: "Duplicate Error Occurred",
      })
    } else {
      return res.status(400).json({
        error: err,
        message: "Validation Error Occurred",
      })
    }
  }
}

// Contributor view
export const viewContributor = async function (req, res) {
  try {
    Contributor.findById(
      req.params.contributor_id,
      function (err, contributor) {
        if (err) {
          return res.status(404).json({
            error: err,
            message: "file not found",
          })
        }
        return res.status(200).json({
          message: "Contributor details are loading",
          data: contributor,
        })
      }
    )
  } catch (err) {
    return res.status(400).json({
      error: err,
    })
  }
}

// Contributor update
export const updateContributor = function (req, res) {
  Contributor.findById(req.params.contributor_id, function (err, contributor) {
    if (err || contributor === null) {
      return res.status(404).json({
        message: "Cannot find contributor",
        error: err,
      })
    }
    if ("name" in req.body) {
      contributor.name = req.body.name
    }
    if ("email" in req.body) {
      contributor.email = req.body.email
    }
    if ("gender" in req.body) {
      contributor.gender = req.body.gender
    }
    if ("phone" in req.body) {
      contributor.phone = req.body.phone
    }
    if ("userDescription" in req.body) {
      contributor.userDescription =
        req.body.userDescription || contributor.userDescription
    }
    // save contact and check for errors
    contributor.save(function (err) {
      if (err) {
        return res.status(500).json({
          error: err,
          message: "Validation Error Occurred",
        })
      }
      return res.status(200).json({
        message: "Contributor Info updated",
        data: contributor,
      })
    })
  })
}

// Contributor delete
export const deleteContributor = async function (req, res) {
  Contributor.deleteOne(
    {
      _id: req.params.contributor_id,
    },
    function (err, contributor) {
      if (err) {
        res.status(500).send({
          error: err,
          message: "Contributor Id not found",
        })
      } else {
        res.status(200).json({
          status: "success",
          message: `Contributor ${req.params.contributor_id} deleted successfully`,
        })
      }
    }
  )
}
