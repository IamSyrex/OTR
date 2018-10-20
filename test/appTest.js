process.env.NODE_ENV = "test";
const mongoose = require("mongoose");
const app = require("../app");
const chai = require("chai"),
  chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

describe("app", () => {
  describe("/POST records", () => {
    it("it should not POST a record without firstname field", done => {
      let record = {
        random: "The Lord of the Rings"
      };
      chai
        .request("http://127.0.0.1:3000")
        .post("/records")
        .send(record)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/POST records", () => {
    it("it should POST a record", done => {
      let record = {
        first_name: "Ring",
        last_name: "Lord",
        gender: "F",
        favorite_color: "blue",
        date_of_birth: "02/10/1998"
      };
      chai
        .request("http://127.0.0.1:3000")
        .post("/records")
        .send(record)
        .end((err, res) => {
          // console.log("body", res.body, "body");
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.first_name.should.have.string("Ring");
          res.body.last_name.should.have.string("Lord");
          done();
        });
    });
  });

  describe("/GET courses", () => {
    it("it should GET all the records ordered by gender", done => {
      chai
        .request("http://127.0.0.1:3000")
        .get("/records/gender")
        .end((err, res) => {
          //   console.log("body", res.body, "body");
          res.should.have.status(200);
          res.body.should.be.a("array");
          //   res.body.length.should.be.eql(1);
          done();
        });
    });
  });
});

// chai
//   .request("http://127.0.0.1:3000")
//   .get("/")
//   .end(function(err, res) {
//     // console.log(res);
//     expect(res).to.have.status(123);
//     done();
//   });
