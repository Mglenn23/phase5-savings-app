import styled from "styled-components";
import Table from "react-bootstrap/Table";
import OrderList from "./OrderList";
import { useState, useEffect } from "react";

function Order() {
  const [dataOrder, setDataOrder] = useState("");

  useEffect(() => {
    fetch("/orders_data").then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          console.log(data);
          setDataOrder(data);
        });
      }
    });
  }, []);

  function displayAllOrder() {
    dataOrder.map((data) => {
      return <OrderList id={data.id} item_id={data.item_id} user_id={data.user_id} status={data.status} />;
    });
  }
  return (
    <Wrapper>
      <Table striped bordered hover variant="dark" style={{}}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Image</th>
            <th>Item ID</th>
            <th>User ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{displayAllOrder}</tbody>
      </Table>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  max-width: 800px;
  margin: 100px auto;
`;
export default Order;
