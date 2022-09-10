import React from "react";
import PropTypes from "prop-types";

function Category({ image, name, link }) {
  return (
    <a
      key={image + "_" + name}
      href={`${link}`}
      className="col text-center category__link"
    >
      <div className="category__img shadow">
        <img src={`img/${image}`} alt={name} loading="lazy" />
      </div>
      <div className="pt-1">{name}</div>
    </a>
  );
}
Category.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Category;
