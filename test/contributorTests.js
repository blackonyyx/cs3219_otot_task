import contributorController from "../api/controller/contributorController.js";
import app from "../server.js";
import chai from "chai";
import chaiHttp from "chai-http";

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("server/contributor/contributor", () => {
  describe("GET", () => {
    it("should get all contributor record", (done) => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
