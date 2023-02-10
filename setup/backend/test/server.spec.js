var chai = require("chai");
var chaiHttp = require("chai-http");
chai.use(chaiHttp);
var expect = require("chai").expect;
var app = require("../server");


// Sign in testing
describe("Testing the POST call in sign in", function () {
  it("Successfully signed in", function (done) {
    chai
      .request(app)
      .post("/signin-submit")
      .send({
        email: "d@gmail.com",
        password: "123",
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200)
        done();
      });
  });
  it("User doesn't exist", function (done) {
    chai
      .request(app)
      .post("/signin-submit")
      .send({
        email: "nouser@gmail.com",
        password: "123",
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400)
        //  console.log(JSON.stringify(res,"",2));
        done();
      });
  });
  it("Property not provided", function (done) {
    chai
      .request(app)
      .post("/signin-submit")
      .send({
        email: "ishmal@gmail.com",
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400)
        //  console.log(JSON.stringify(res,"",2));
        done();
      });
  });
  it("Password not correct", function (done) {
    chai
      .request(app)
      .post("/signin-submit")
      .send({
        email: "ishmal@gmail.com",
        password: 'notcorrect'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400)
        //  console.log(JSON.stringify(res,"",2));
        done();
      });
  });
});

// User menu testing
describe("Testing user menu", () => {
  let token;
  before((done) => {
    chai
      .request(app)
      .post("/signin-submit")
      .send({
        email: "d@gmail.com",
        password: "123",
      })
      .end((err, res) => {
        if (err) done(err);
        if (res.body.success){
          token = res.body.token
        }
        done();
      });
  })
  it("API status code returns 200", (done) => {
    chai
      .request(app)
      .get("/usermenu")
      .set({ Authorization: `JWT ${token}` })
      .then((res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it("API status code returns 401", (done) => {
    chai
      .request(app)
      .get("/usermenu")
      .then((res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

describe("Testing orderhistorypage", () => {
  let token;
  before((done) => {
    chai
      .request(app)
      .post("/signin-submit")
      .send({
        email: "d@gmail.com",
        password: "123",
      })
      .end((err, res) => {
        if (err) done(err);
        if (res.body.success){
          token = res.body.token
        }
        done();
      });
  })
  it("API status code returns 200", (done) => {
    chai
      .request(app)
      .get("/orderhistorypage")
      .set({ Authorization: `JWT ${token}` })
      .then((res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it("API status code returns 401", (done) => {
    chai
      .request(app)
      .get("/orderhistorypage")
      .then((res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

// Saved distributors testing
describe("Testing saveddistributors", () => {
  let token;
  before((done) => {
    chai
      .request(app)
      .post("/signin-submit")
      .send({
        email: "d@gmail.com",
        password: "123",
      })
      .end((err, res) => {
        if (err) done(err);
        if (res.body.success){
          token = res.body.token
        }
        done();
      });
  })
  it("API status code returns 200", (done) => {
    chai
      .request(app)
      .get("/saveddistributors")
      .set({ Authorization: `JWT ${token}` })
      .then((res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it("API status code returns 401", (done) => {
    chai
      .request(app)
      .get("/saveddistributors")
      .then((res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
  
// // menu page testing
describe("Testing menu page", () => {
  it("API status code returns 404 for missing/incorrect data address", (done) => {
    chai
      .request(app)
      .get("/menu")
      .query({ user: "none" })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
