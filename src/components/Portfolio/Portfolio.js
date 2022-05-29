import React from "react";
import { Card } from "react-bootstrap";
import "./Portfolio.css";
import project1 from "../../img/project1.jpg";
import project2 from "../../img/project2.jpg";
import project3 from "../../img/project3.jpg";

const Portfolio = () => {
  return (
    <div className="hero ">
      <div className="content d-md-flex">
        <div className="d-lg-flex ">
          <div>
            <h1 className="my-name">
              Hello, I’m <span>Saidur</span>
              <br />
              <span className="title">Passionate Web Developer</span>
            </h1>
            <p className="my-intro">
              HI. I am Saidur, 14 y/o. I'm from Bangladesh. I am a Jr. full
              stack web developer. Currently working at Sofwid as a Jr. Front
              end web developer intern (remotely). And also I am a moderator at
              Programming Hero from 2 Years. I love learning new technologies
              every day. Currently I am learning the skill of web development.
            </p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://drive.google.com/file/d/1_ewsl6Tt2SNPwSpG6ilNOAf4yH9uRudj/view?usp=sharing"
              className="download-btn"
            >
              Download Resume
            </a>
          </div>
        </div>

        <div className="my-5">
          <h3 className="text-muted mb-3 my-project text-lg-start text-center">
            My Projects
          </h3>

          <div className="d-flex flex-lg-row flex-column  ">
            <Card className="project-card shadow me-0 me-lg-3 ">
              <Card.Body>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://product-analysis-website-saminravi99.netlify.app/"
                  class="project-link"
                >
                  <span className="d-flex justify-content-center">
                    <Card.Img
                      className="project-img p-2"
                      variant="top"
                      src={project1}
                    />
                  </span>
                  <Card.Title className="text-center text-muted  my-0">
                    FoodDX
                  </Card.Title>
                </a>
              </Card.Body>
            </Card>
            <Card className="project-card shadow me-0 me-lg-3">
              <Card.Body>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://independent-service-provider-saminravi99-derma-care.netlify.app/"
                  class="project-link"
                >
                  <span className="d-flex justify-content-center">
                    <Card.Img
                      className="project-img p-2"
                      variant="top"
                      src={project2}
                    />
                  </span>
                  <Card.Title className="text-center text-muted my-0">
                    Derma Care
                  </Card.Title>
                </a>
              </Card.Body>
            </Card>
            <Card className="project-card shadow">
              <Card.Body>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://warehouse-management-saminravi.web.app/"
                  class="project-link"
                >
                  <span className="d-flex justify-content-center">
                    <Card.Img
                      className="project-img p-2"
                      variant="top"
                      src={project3}
                    />
                  </span>
                  <Card.Title className="text-center text-muted my-0">
                    Book Fly
                  </Card.Title>
                </a>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
