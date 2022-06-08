import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import axiosPrivate from "../../api/axiosPrivate";
import auth from "../firebase.init";
import useAllOrders from "../hooks/useAllOrders";
import useTools from "../hooks/useTools";
import Loading from "../Loading/Loading";
import CancelModal from "./CancelModal";
import "./ManageOrders.css";

const ManageOrders = () => {
  const [authUser] = useAuthState(auth);

  const [reload, setReload] = React.useState(false);
  const [proceed, setProceed] = React.useState(false);
  const [boolean, setBoolean] = React.useState(false);
  const [modalShow, setModalShow] = React.useState(false);

  const [allOrders, setAllOrders, isLoading] = useAllOrders(reload);
  const [tools, setTools] = useTools(reload);

  console.log(setTools, setAllOrders);
  const handleDeliver = async (
    id,
    toolName,
    requiredQuantity,
    quantity,
    isPaid
  ) => {
    if (isPaid) {
      console.log(id);
      setReload(true);
      axiosPrivate
        .put(
          `https://manufacturer-xpart.herokuapp.com/orders/${id}`,
          { isDelivered: true },
          {
            headers: {
              email: authUser.email,
            },
          }
        )
        .then(({ data }) => {
          if (data.modifiedCount) {
            console.log(data);
            // find the tool from trools array by toolName of that orders
            const requiredTool = tools.find(
              (tool) => tool.toolName === toolName
            );
            console.log(requiredTool.toolName);
            // update the tool quantity
            const newTool = {
              availableQuantity: (
                parseInt(requiredTool.availableQuantity) -
                parseInt(requiredQuantity)
              ).toString(),
            };
            fetch(
              `https://manufacturer-xpart.herokuapp.com/product/${requiredTool._id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  email: `${authUser?.email}`,
                  authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                },
                body: JSON.stringify(newTool),
              }
            )
              .then((response) => response.json())
              .then((json) => {
                console.log(json);
                setReload(false);
                toast.success("Order Delivered");
              });
          }
        });
    } else {
      toast.error("Order is not paid yet!");
    }
  };
  const [cancelOrderId, setCancelOrderId] = React.useState("");
  useEffect(() => {
    console.log("data deleted");
    if (proceed) {
      setReload(true);
      axiosPrivate
        .delete(
          `https://manufacturer-xpart.herokuapp.com/orders/${cancelOrderId}`,
          {
            headers: {
              "Content-Type": "application/json",
              email: `${authUser?.email}`,
            },
          }
        )
        .then(({ data }) => {
          console.log(data);
          if (data.deletedCount) {
            toast.success("Order Cancelled Successfully");
          }
        });
      setCancelOrderId("");
      setProceed(false);
    }
  }, [proceed, cancelOrderId, boolean, authUser?.email]);

  const handleCancelOrder = (id) => {
    console.log(id);
    setModalShow(true);
    setCancelOrderId(id);
  };

  const reversedOrders = [...allOrders].reverse();

  const singleOrder = reversedOrders.map(
    (
      {
        _id,
        userName,
        userEmail,
        toolName,
        toolPrice,
        quantity,
        availableQuantity,
        totalPrice,
        isDelivered,
        requiredQuantity,
        isPaid,
        phoneNumber,
        address,
      },
      index
    ) => {
      return (
        <tr key={_id}>
          <td className="text-center">
            <small>{index + 1}</small>
          </td>
          <td className="text-center">
            <small>{toolName}</small>
          </td>
          <td className="text-center">
            <small>{quantity}</small>
          </td>
          <td className="text-center">
            <small>{totalPrice}</small>
          </td>

          <td className="text-center">
            <small>{userName}</small>
          </td>
          <td className="text-center">
            <small>{userEmail}</small>
          </td>
          <td className="text-center">
            <small>{address ? address : "Dhaka, Bangladesh"}</small>
          </td>
          <td className="text-center">
            <small>{phoneNumber ? phoneNumber : "01954059415"}</small>
          </td>

          <td className="text-center ">
            {isPaid ? (
              <small className="text-success">
                <strong>Paid</strong>
              </small>
            ) : (
              <small className="text-danger">
                <strong>Unpaid</strong>
              </small>
            )}
          </td>

          <td>
            {!isPaid ? (
              <div className="">
                <div>
                  <button
                    onClick={() => {
                      handleCancelOrder(_id);
                    }}
                    className="btn btn-danger d-block mx-auto rounded-pill"
                  >
                    <small>Cancel</small>
                  </button>
                </div>
              </div>
            ) : isPaid && !isDelivered ? (
              <button
                onClick={() =>
                  handleDeliver(
                    _id,
                    toolName,
                    requiredQuantity,
                    quantity,
                    isPaid
                  )
                }
                className="btn btn-primary d-block mx-auto rounded-pill"
              >
                <small>Deliver</small>
              </button>
            ) : (
              <p className=" text-center py-1 bg-success text-white rounded-pill">
                <small className="shipped">
                  <strong>Shipped</strong>
                </small>
              </p>
            )}
          </td>
        </tr>
      );
    }
  );
  return (
    <div>
      <h3 className="text-center text-success mb-4">Manage The Orders</h3>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="container table-height">
          <Table
            responsive
            striped
            bordered
            hover
            size="sm"
            className="table-order"
          >
            <thead>
              <tr>
                <th className="text-center">No.</th>
                <th className="text-center">Product Name</th>
                <th className="text-center">Ordered Quantity</th>
                <th className="text-center">Total Price</th>
                <th className="text-center">User Name</th>
                <th className="text-center ">User Email</th>
                <th className="text-center">Address</th>
                <th className="text-center">Contact Number</th>
                <th className="text-center">Payment</th>
                <th className="text-center"></th>
              </tr>
            </thead>
            <tbody>{singleOrder}</tbody>
          </Table>
        </div>
      )}
      <CancelModal
        show={modalShow}
        setProceed={setProceed}
        setBoolean={setBoolean}
        boolean={boolean}
        onHide={() => {
          setModalShow(false);
        }}
      ></CancelModal>
    </div>
  );
};

export default ManageOrders;