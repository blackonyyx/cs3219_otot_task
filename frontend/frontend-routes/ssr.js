import express from "express";
import App from "../components/app.jsx";
import React from "react";
import { renderToString } from "react-dom/server";
import hbs from "handlebars";

const router = express.Router();

router.get("/", async (req, res) => {
  const theHtml = `
  <!DOCTYPE html>
      <html lang="en">
        <head>
        <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Hi</title>
      <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;500&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="/css/styles.css" />
        </head>
        
        <body>
        <div class="'container-xxl px-md5 bg-white shadow-lg" >
        <nav class="py-2 bg-light border-bottom">
          <div class="container d-flex flex-wrap">
            <ul class="nav me-auto">
              <li class="nav-item"><a href="/" class="nav-link link-dark px-2 active" aria-current="page">Home</a></li>
              <li class="nav-item"><a href="/login" class="nav-link link-dark px-2">Login</a></li>
              <li class="nav-item"><a href="/about-us" class="nav-link link-dark px-2">About</a></li>
              <li class="nav-item"><a href="/submit-recipe" class="nav-link link-dark px-2">Submit</a></li>
              <li class="nav-item"><a href="/contact-us" class="nav-link link-dark px-2">Contact Us</a></li>
            </ul>
            <ul class="nav">
              <li class="nav-item"><a href="#" class="nav-link link-dark px-2">Login</a></li>
              <li class="nav-item"><a href="#" class="nav-link link-dark px-2">Sign up</a></li>
            </ul>
          </div>
        </nav>
        <header class="py-3 mb-4 border-bottom">
          <div class="container d-flex flex-wrap justify-content-center">
            <a href="/" class="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
              <img src="../../assets/img/pb.svg" width="40" height="32" alt="Sad Roger Cooks">
              <span class="fs-4">Sad Roger Cooks</span>
            </a>
            <form method="POST" action="/search"  class="col-12 col-lg-auto mb-3 mb-lg-0">
              <input type="search" class="form-control" placeholder="Search..." aria-label="Search">
            </form>
          </div>
        </header>
        <div id="reactele">{{{reactele}}}</div>

          <footer class="py-5">
          <p>Built with love for CS3219 &#10084;&#65039;</p>
        </footer>
        <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js"
        integrity="sha384-Xe+8cL9oJa6tN/veChSP7q+mnSPaj5Bcu9mPX5F5xIGE0DVittaqT5lorf0EI7Vk"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.min.js"
        integrity="sha384-ODmDIVzN+pFdexxHEHFBQH3/9/vQ9uori45z4JjnFsRydbmQbmL5t1tQ0culUzyK"
        crossorigin="anonymous"
      ></script>
        <script src="/assets/bundle.js"></script>
        </body>
      </html>

  `;
  const hbsTemplate = hbs.compile(theHtml);
  const reactComp = renderToString(<App />);
  const htmlToSend = hbsTemplate({ reactele: reactComp });
  res.send(htmlToSend);
});

export default router;
