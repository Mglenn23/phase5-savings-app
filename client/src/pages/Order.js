import Table from "react-bootstrap/Table";
import OrderList from "./OrderList";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
function Order({ user, functionBuy }) {
  const [dataOrder, setDataOrder] = useState([]);
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    fetch("/orders_data").then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          console.log(data);
          setDataOrder(data);
          setTrigger(false);
        });
      }
    });
  }, [trigger]);

  const displayAllOrder = dataOrder.map((data) => {
    if (data.user_id === user.id) {
      return <OrderList user={user} id={data.id} item_id={data.item_id} user_id={data.user_id} status={data.order_status} funcHandleDeleteOrder={funcHandleDeleteOrder} />;
    }
  });

  function funcHandleDeleteOrder(id, price) {
    let totalBalance = user.user_balance + price;
    fetch(`/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_status: "Cancel",
      }),
    });
    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_balance: totalBalance,
      }),
    });
    Swal.fire({
      title: "Order Cancelled",
      text: "Successfully Cancel!",
      icon: "success",
    });
    functionBuy(id);
    setTrigger(true);
  }

  return (
    <>
      <div>
        <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
          <div className="col-lg-8 align-self-end">
            <h1 className="font-weight-bold">Your Order</h1>
          </div>
        </div>
      </div>
      <Table striped bordered hover variant="dark" style={{}}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Item Name</th>
            <th>Item Price</th>
            <th>User ID</th>
            <th>Status</th>
            <th>Button</th>
          </tr>
        </thead>
        <tbody>{displayAllOrder}</tbody>
      </Table>
    </>
  );
}

export default Order;
