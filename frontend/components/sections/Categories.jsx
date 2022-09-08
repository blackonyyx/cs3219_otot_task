import React from "react";
import PropTypes from "prop-types";
import Category from "../parts/Category.jsx";

function Categories({ list }) {
  return (
    <section className="pb-4 pt-4">
      <div className="d-flex mb-2 align-items-center">
        <h2>Latest Recipes</h2>
        <a href="/explore-latest" className="ms-auto">
          {" "}
          View More
        </a>
      </div>

      <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
        {list.map(Category)}
        <a href="/categories" className="col text-center category__link">
          <div className="category__img shadow">
            <img
              src="/img/pb.svg"
              width="200"
              height="160"
              alt="View All Categories"
              loading="lazy"
            />
          </div>
          <div className="pt-1">View All Categories</div>
        </a>
      </div>
    </section>
  );
}

Categories.propTypes = {
  list: PropTypes.array,
};
