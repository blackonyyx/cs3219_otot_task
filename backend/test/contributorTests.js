/* eslint-disable n/handle-callback-err */
import Contributor from "../lib/api/model/contributorModel.js"

import app from "../lib/server.js"
import chai from "chai"
import chaiHttp from "chai-http"
import { step } from "mocha-steps"

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

const contributorPass2 = {
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

const createContributorPassMinFields2 = {
  name: "John",
  email: "john12@gmail.com",
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

    step("should get all contributor records", (done) => {
      chai
        .request(app)
        .get("/server/contributor/contributor")
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("object")
          done()
        })
    })

    step("should get single contact by specific id", (done) => {
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

    step("should get invalid", (done) => {
      const invalidId = 0
      chai
        .request(app)
        .get(`/server/contributor/contributor/${invalidId}`)
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.be.a("object")
          res.body.should.have.property("message").eql("file not found")
          done()
        })
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
    step("should accept new contact with right format", (done) => {
      chai
        .request(app)
        .post("/server/contributor/contributor")
        .send(contributorPass2)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a("object")
          res.body.should.have.property("data")
          done()
          id.push(res.body.data._id)
        })
    })

    step("should accept new contact with minimum optionals", (done) => {
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

    step("should reject new contact with duplicate email", (done) => {
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

    step("should reject new contact with invalid email", (done) => {
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

    step("should reject new contact with non-alphanumeric name", (done) => {
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

    step("should reject new contact with invalid phone number", (done) => {
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
    let id = []
    before(() => {
      const contrib = new Contributor(createContributorPassMinFields2)
      contrib.save((err) => {
        if (err) console.log(err)
      })
      id.push(contrib._id.toString())
    })

    step("should successfully update", (done) => {
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

    step(" updated Contributor fields has changed to expected value", (done) => {
      chai.request(app)
          .get(`/server/contributor/contributor/${id}`)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a("object")
            res.body.should.have.property("data")
            res.body.data.should.have.property("name").eql(updateContributorPass.name)
            res.body.data.should.have.property("gender").eql(updateContributorPass.gender)
            res.body.data.should.have.property("phone").eql(updateContributorPass.phone)
            res.body.data.should.have.property("userDescription").eql(updateContributorPass.userDescription)
            done()
    })
  })

    step("should return invalid document found", (done) => {
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

    after(() => {
      // cleanup
      id.forEach((i) => {
        Contributor.deleteOne(
          {
            _id: i,
          },
          (err) => {
            if (err) {
              console.log(err)
            }
          }
        )
      })
      id = []
    })
  })

  describe("DELETE", () => {
    let id = 0
    describe("Successful Deletion", () => {
      before(() => {
        const contrib = new Contributor(createContributorPassMinFields)
        contrib.save((err) => {
          if (err) console.log(err)
        })
        id = contrib._id.toString()
      })

      step("should return a error when deleting a non existent contributor", (done) => {
        const invalidId = 0
        chai
          .request(app)
          .del(`/server/contributor/contributor/${invalidId}`)
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
      
      step("should successfully delete the contributor", (done) => {
        chai
          .request(app)
          .del(`/server/contributor/contributor/${id}`)
          .end((err, res) => {
              console.log("in before delete",id)
              res.should.have.status(200)
            res.body.should.be.a("object")
            res.body.should.have.property("status").eql("success")
            res.body.should.have
              .property("message")
              .eql(`Contributor ${id} deleted successfully`)

            
            done()
          })
      })

      
      })
    describe("Deletion pt 2", () => {
      step("should be unable to get the deleted contributor", (done) => {
        chai.request(app)
            .get(`/server/contributor/contributor/${id}`)
            .end((err, res) => {
              console.log("in after delete",id)
              res.should.have.status(404)
              res.body.should.be.a("object")
              res.body.should.have.property("message").eql("file not found")
              done()
            })
    })

      // after(() => {
      //   Contributor.findByIdAndDelete(id, (err) => {
      //       if (err) {
      //           console.log(err)
      //       }
      //   })
      // })
    })
  })
})
