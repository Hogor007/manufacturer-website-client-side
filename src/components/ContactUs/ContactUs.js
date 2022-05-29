import React from "react";
import "./ContactUs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const ContactUs = () => {
  return (
    <div>
      <div className="container my-5">
        <div className="d-flex justify-content-center align-items-center about-me-title">
          <h1>Contact Address</h1>
        </div>
        <div className="d-flex flex-lg-row flex-column justify-content-around align-items-center mt-4">
          <div className="leaflet-texts">
            <h5>
              <FontAwesomeIcon className="me-2" icon={faLocationDot} /> F10,
              Mirpur, Dhaka
            </h5>
            <h5 className="my-4">
              <FontAwesomeIcon className="me-3" icon={faEnvelope} />
              Official:
              <a className="ps-3" href="https://fibix-123.web.app/">
                https://fibix-123.web.app/
              </a>
            </h5>
            <h5 className="mb-lg-0 mb-5">
              <FontAwesomeIcon className="me-2" icon={faPhone} /> Helpline :
              01777777777
            </h5>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ContactUs;
