import React from "react";

function Submission() {
  return (
    <section className="px-4 py-5 my-5 text-center">
      <img
        src="img/potatos.jpeg"
        className="d-block mx-auto mb-4 img-fluid"
        alt="Publish your Recipe for FREE today"
        width="566"
        height="208"
        loading="lazy"
      />
      <h1 className="display-5 fw-bold">
        Publish your Recipe for FREE and help struggling folk TODAY!
      </h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">Every 60 seconds a minute passes</p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <a href="/submit-recipe" className="btn btn-primary btn-dark btn-lg">
            Submit Recipe Now!
          </a>
        </div>
      </div>
    </section>
  );
}
