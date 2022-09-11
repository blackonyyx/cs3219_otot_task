export default (err, req, res, next) => {
  try {
    console.log("congrats you hit the error middleware")
    if (err.name === "ValidationError") {
      return handleValidationError(err, res)
    }
    if (err.code && err.code === 11000) {
      return handleDuplicateKeyError(err, res)
    }
  } catch (err) {
    res.status(500).send("An unknown error occurred.")
  }
}

// handle email or username duplicates
const handleDuplicateKeyError = async (err, res) => {
  const field = Object.keys(err.keyValue)
  const code = 409
  res.status(code).send(`An contributor with that ${field} already exists.`)
}

const handleValidationError = async (err, res) => {
  const errors = Object.values(err.errors).map((el) => el.message)
  const fields = Object.values(err.errors).map((el) => el.path)
  const code = 400
  if (errors.length > 1) {
    const formattedErrors = errors.join(" ")
    res.status(code).send({ messages: formattedErrors, fields })
  } else {
    res.status(code).send({ messages: errors, fields })
  }
}
