import React from "react";
import Button from "react-bootstrap/Button";

function ListUser({ id, username, user_role, user_balance, user_savings, handlerButtonEdit }) {
  function handlerClickEdit(e) {
    e.preventDefault();
    handlerButtonEdit({ id, username, user_role, user_balance, user_savings });
  }

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{username}</td>
        <td>{user_role}</td>
        <td>{user_balance}</td>
        <td>{user_savings}</td>
        <td>
          <Button variant="warning" onClick={handlerClickEdit}>
            Edit
          </Button>
        </td>
      </tr>
    </>
  );
}
export default ListUser;
