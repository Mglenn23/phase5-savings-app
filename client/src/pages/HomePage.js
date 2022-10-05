import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import OrderList from "./OrderList";
import Swal from "sweetalert2";
import { PieChart } from "react-minimal-pie-chart";
function HomePage({ user, functionBuy }) {
  const [dataOrder, setDataOrder] = useState([]);
  const [trigger, setTrigger] = useState(true);
  const [userSaving, setUserSaving] = useState(true);
  const [userBalance, setUserBlance] = useState(true);

  useEffect(() => {
    fetch("/orders_data").then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setDataOrder(data);
          setTrigger(false);
        });
      }
      setUserSaving(user.user_savings);
      setUserBlance(user.user_balance);
    });
  }, [trigger]);
  const displayAllOrder = dataOrder.map((data) => {
    return <OrderList key={data.id} user={user} id={data.id} item_id={data.item_id} user_id={data.user_id} status={data.order_status} funcHandleDeleteOrder={funcHandleDeleteOrder} funcHandleCompleteOrder={funcHandleCompleteOrder} />;
  });
  function funcHandleCompleteOrder(id) {
    fetch(`/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_status: "Done",
      }),
    });
    Swal.fire({
      title: "Order Completed",
      text: "Successfully Complete!",
      icon: "success",
    });
    functionBuy(id);
    setTrigger(true);
  }
  function funcHandleDeleteOrder(id, price, user_id, user_balance) {
    let totalBalance = user_balance + price;
    fetch(`/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_status: "Cancel",
      }),
    });
    fetch(`/users/${user_id}`, {
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
  const defaultLabelStyle = {
    fontSize: "15px",
    color: "white",
    fontFamily: "sans-serif",
  };

  return (
    <>
      {user.user_role == "admin" ? (
        <>
          <div>
            <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
              <div className="col-lg-8 align-self-end">
                <h1 className="font-weight-bold">Order List</h1>
              </div>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Item Name</th>
                    <th>Item Price</th>
                    <th>Username</th>
                    <th>Status</th>
                    <th>Button</th>
                  </tr>
                </thead>
                <tbody>{displayAllOrder}</tbody>
              </Table>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
            <div className="col-lg-8 align-self-end">
              <h1 className="font-weight-bold">Account Detail</h1>
            </div>
          </div>
          <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
            <div style={{ width: "40%" }}>
              <PieChart
                label={({ dataEntry }) => dataEntry.value}
                labelStyle={{
                  ...defaultLabelStyle,
                }}
                data={[
                  { title: "Savings", value: userSaving, color: "#123f68" },
                  { title: "Balance", value: userBalance, color: "#85bed0" },
                ]}
              />
            </div>
            <h4>Total Savings: ${user.user_savings}</h4>
            <h4>Current Balance: ${user.user_balance}</h4>
          </div>
        </>
      )}
    </>
  );
}

export default HomePage;
