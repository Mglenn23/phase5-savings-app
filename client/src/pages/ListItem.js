import React from "react";
import Button from "react-bootstrap/Button";

function ListItem({ id, item_name, item_price, item_type, item_url, handlerButtonEdit }) {
  function handlerClickEdit(e) {
    e.preventDefault();
    handlerButtonEdit({ id, item_name, item_price, item_type, item_url });
  }

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{item_name}</td>
        <td>{item_price}</td>
        <td>{item_type}</td>
        <td>{item_url}</td>
        <td>
          <Button variant="warning" onClick={handlerClickEdit}>
            Edit
          </Button>
        </td>
      </tr>
    </>
  );
}
export default ListItem;
