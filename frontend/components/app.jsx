import React from "react";
import Recipes from "./sections/Recipes.jsx";
import Categories from "./sections/Categories.jsx";

export default function App() {
  const [times, setTimes] = React.useState(0);
  const contentTest = {
    category: [
      {
        name: "saltine1",
        image: "../../assets/img/saltinecracker.jpeg",
        link: "/categories",
      },
      {
        name: "saltine2",
        image: "../../assets/img/saltinecracker.jpeg",
        link: "/categories",
      },
      {
        name: "saltine3",
        image: "../../assets/img/saltinecracker.jpeg",
        link: "/categories",
      },
      {
        name: "saltine4",
        image: "../../assets/img/saltinecracker.jpeg",
        link: "/categories",
      },
    ],
    recipe: [
      {
        name: "saltine5",
        image: "../../assets/img/saltinecracker.jpeg",
        link: "/recipes",
      },
      {
        name: "saltine6",
        image: "../../assets/img/saltinecracker.jpeg",
        link: "/recipes",
      },
      {
        name: "saltine7",
        image: "../../assets/img/saltinecracker.jpeg",
        link: "/recipes",
      },
      {
        name: "saltine8",
        image: "../../assets/img/saltinecracker.jpeg",
        link: "/recipes",
      },
    ],
  };

  return (
    // do something here where there is a button that will replace the text
    <div>
      <Categories list={contentTest.category} />
      <Recipes list={contentTest.recipe} />
      <h1>Hello {times}</h1>
      <button onClick={() => setTimes((times) => times + 1)}>ADD</button>
    </div>
  );
}
