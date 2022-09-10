import React from "react";
import PropTypes from "prop-types";

function Recipe({ image, name, link }) {
  return (
    <a
      key={image + "_" + name}
      href={`${link}`}
      className="col text-center category__link"
    >
      <div className="category__img category__img--large shadow">
        <img
          src={`img/${image}`}
          width="200"
          height="330"
          alt={name}
          loading="lazy"
        />
      </div>
      <div className="pt-1">{name}</div>
    </a>
  );
}

Recipe.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Recipe;
