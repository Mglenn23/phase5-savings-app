import React from "react";

function OrderList({ id, image, item_id, user_id, status }) {
  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{image}</td>
        <td>{item_id}</td>
        <td>{user_id}</td>
        <td>{status}</td>
      </tr>
    </>
  );
}
export default OrderList;
