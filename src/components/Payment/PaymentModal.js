import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51L3eU9DqWCmVeWbZOpVugRf04t0qLyI67u94AScuX98yvXjU7e9Am49MYDIbBr45g6kwzS3VUKbCSBm3dg9FZgij00pgCk9ire"
);
const PaymentModal = (props) => {
  console.log(props.requiredOrder);
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            requiredOrder={props?.requiredOrder}
            onHide={props.onHide}
          />
        </Elements>
      </Modal.Body>
      {/* <Modal.Footer>
          <Button
            className="btn btn-danger d-block mx-auto px-5"
            onClick={() => {
              props.onHide();
            }}
          >
            Cancel Restock
          </Button>
          <Button
            className="btn btn-primary d-block mx-auto px-5"
            variant="primary"
          >
            Restock
          </Button>
        </Modal.Footer> */}
    </Modal>
  );
};

export default PaymentModal;
