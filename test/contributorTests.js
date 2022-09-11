/* eslint-disable n/handle-callback-err */
import Contributor from "../api/model/contributorModel.js"

import app from "../server.js"
import chai from "chai"
import chaiHttp from "chai-http"

// Configure chai
chai.use(chaiHttp)
chai.should()

const contributorPass = {
  name: "John",
  email: "john@gmail.com",
  gender: "male",
  phone: "88888888",
  userDescription: "Lorum Ipsum",
}

const createContributorFailAlpha = {
  name: "John!!!",
  email: "john@gmail.com",
  gender: "male",
  phone: "88888888",
  userDescription: "Lorum Ipsum",
}
const createContributorPassMinFields = {
  name: "John",
  email: "john1@gmail.com",
}

const createContributorFailEmail = {
  name: "John!!!",
  email: "john1mail",
}

const createContributorFailPhone = {
  name: "John!!!",
  email: "john1@gmail.com",
  phone: "8888888A",
}

const updateContributorPass = {
  name: "Don",
  gender: "male",
  phone: "88888888",
  userDescription: "Cheap food, steals and deals",
}

const updateContributorFail = {
  name: "Don",
  gender: "male",
  phone: "888888a",
  userDescription: "Cheap food, steals and deals",
}

describe("server/contributor/contributor", () => {
  describe("GET", () => {
    let id = 0
    before(() => {
      const contrib = new Contributor(contributorPass)
      contrib.save((err) => {
        if (err) console.log(err)
      })
      id = contrib._id.toString()
    })

    it("should get all contributor records", (done) => {
      chai
        .request(app)
        .get("/server/contributor/contributor")
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("object")
          done()
        })
    })

    it("should get single contact by specific id", (done) => {
      chai
        .request(app)
        .get(`/server/contributor/contributor/${id}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("object")
          res.body.should.have.property("data")
          done()
        })
    })

    it("should get invalid", (done) => {
      const invalidId = 0
      chai
        .request(app)
        .get(`/server/contributor/contributor/${invalidId}`)
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.be.a("object")
          res.body.should.have.property("message").eql("file not found")
        })
      done()
    })

    after(() => {
      // cleanup
      Contributor.deleteOne(
        {
          _id: id,
        },
        (err) => {
          if (err) {
            console.log(err)
          }
        }
      )
    })
  })

  describe("POST", () => {
    const id = []
    it("should accept new contact with right format", (done) => {
      chai
        .request(app)
        .post("/server/contributor/contributor")
        .send(contributorPass)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a("object")
          res.body.should.have.property("data")
          id.push(res.body.data._id)
          done()
        })
    })

    it("should accept new contact with minimum optionals", (done) => {
      chai
        .request(app)
        .post("/server/contributor/contributor")
        .send(createContributorPassMinFields)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a("object")
          res.body.should.have.property("data")
          id.push(res.body.data._id)
          done()
        })
    })

    it("should reject new contact with duplicate email", (done) => {
      chai
        .request(app)
        .post("/server/contributor/contributor")
        .send(contributorPass)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a("object")
          res.body.should.have
            .property("message")
            .eql("Duplicate Error Occurred")
          done()
        })
    })

    it("should reject new contact with invalid email", (done) => {
      chai
        .request(app)
        .post("/server/contributor/contributor")
        .send(createContributorFailEmail)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a("object")
          res.body.should.have
            .property("message")
            .eql("Validation Error Occurred")
          done()
        })
    })

    it("should reject new contact with non-alphanumeric name", (done) => {
      chai
        .request(app)
        .post("/server/contributor/contributor")
        .send(createContributorFailAlpha)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a("object")
          res.body.should.have
            .property("message")
            .eql("Validation Error Occurred")
          done()
        })
    })

    it("should reject new contact with invalid phone number", (done) => {
      chai
        .request(app)
        .post("/server/contributor/contributor")
        .send(createContributorFailPhone)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a("object")
          res.body.should.have
            .property("message")
            .eql("Validation Error Occurred")
          done()
        })
    })
    after(() => {
      // cleanup
      id.forEach((r) =>
        Contributor.deleteOne(
          {
            _id: r,
          },
          (err) => {
            if (err) {
              console.log(err)
            }
          }
        )
      )
    })
  })

  describe("PUT/PATCH", () => {
    let id = 0
    beforeEach(() => {
      const contrib = new Contributor(createContributorPassMinFields)
      contrib.save((err) => {
        if (err) console.log(err)
      })
      id = contrib._id.toString()
    })

    afterEach(() => {
      // cleanup
      Contributor.deleteOne(
        {
          _id: id,
        },
        (err) => {
          if (err) {
            console.log(err)
          }
        }
      )
      id = 0
    })

    it("should successfully update", (done) => {
      chai
        .request(app)
        .put(`/server/contributor/contributor/${id}`)
        .send(updateContributorPass)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("object")
          res.body.should.have.property("data")
          res.body.should.have
            .property("message")
            .eql("Contributor Info updated")
          done()
        })
    })

    it("should return invalid document found", (done) => {
      const invalidId = 0
      chai
        .request(app)
        .put(`/server/contributor/contributor/${invalidId}`)
        .send(updateContributorPass)
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.be.a("object")
          res.body.should.have
            .property("message")
            .eql("Cannot find contributor")
          done()
        })
    })

    it("should return validation error occured", (done) => {
      chai
        .request(app)
        .put(`/server/contributor/contributor/${id}`)
        .send(updateContributorFail)
        .end((err, res) => {
          res.should.have.status(500)
          res.body.should.be.a("object")
          res.body.should.have
            .property("message")
            .eql("Validation Error Occurred")
          done()
        })
    })
  })

  describe("DELETE", () => {
    describe("Successful Deletion", () => {
      let id = 0
      before(() => {
        const contrib = new Contributor(createContributorPassMinFields)
        contrib.save((err) => {
          if (err) console.log(err)
        })
        id = contrib._id.toString()
      })
      it("should successfully delete the contributor", (done) => {
        chai
          .request(app)
          .delete(`/server/contributor/contributor/${id}`)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a("object")
            res.body.should.have.property("status").eql("success")
            res.body.should.have
              .property("message")
              .eql(`Contributor ${id} deleted successfully`)
            done()
          })
      })

      it("should return a error  delete the contributor", (done) => {
        const invalidId = 0
        chai
          .request(app)
          .delete(`/server/contributor/contributor/${invalidId}`)
          .end((err, res) => {
            res.should.have.status(500)
            res.body.should.be.a("object")
            res.body.should.have.property("error")
            res.body.should.have
              .property("message")
              .eql(`Contributor Id not found`)
            done()
          })
      })
    })
  })
})
