import React from "react";
import PropTypes from "prop-types";
import Recipe from "../parts/Recipe.jsx";

function Recipes({ list }) {
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
        {list.map(Recipe)}
      </div>
    </section>
  );
}

Recipes.propTypes = {
  list: PropTypes.array,
};
