import React from "react";

import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

function OrderList({ user, id, item_id, user_id, status, funcHandleDeleteOrder, funcHandleCompleteOrder }) {
  const [userName, setUserName] = useState([]);
  const [itemName, setItemName] = useState([]);
  const [itemPrice, setItemPrice] = useState([]);
  useEffect(() => {
    fetch("/item_data").then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          data.map((dat) => {
            if (dat.id === item_id) {
              setItemName(dat.item_name);
              setItemPrice(dat.item_price);
            }
          });
        });
      }
    });
  }, []);
  useEffect(() => {
    fetch("/users_data").then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          data.map((dat) => {
            if (dat.id === user_id) {
              setUserName(dat.username);
            }
          });
        });
      }
    });
  }, []);
  return (
    <>
      {user.user_role == "admin" ? (
        <>
          <tr>
            <td>{id}</td>
            <td>{itemName}</td>
            <td>${itemPrice}</td>
            <td>{userName}</td>
            <td>{status}</td>
            {status === "Order" ? (
              <td>
                <Button
                  variant="success"
                  onClick={(e) => {
                    funcHandleCompleteOrder(id);
                  }}
                >
                  Done
                </Button>
                <Button
                  variant="danger"
                  onClick={(e) => {
                    fetch("/users_data").then((r) => {
                      if (r.ok) {
                        r.json().then((data) => {
                          // setUserData(data);
                          data.map((dat) => {
                            if (dat.id === user_id) {
                              funcHandleDeleteOrder(id, itemPrice, user_id, dat.user_balance);
                            }
                          });
                        });
                      }
                    });
                  }}
                >
                  Cancel
                </Button>
              </td>
            ) : (
              <td></td>
            )}
          </tr>
        </>
      ) : (
        <tr>
          <td>{id}</td>
          <td>{itemName}</td>
          <td>${itemPrice}</td>
          <td>{user_id}</td>
          <td>{status}</td>
          {status === "Order" ? (
            <td>
              <Button
                variant="danger"
                onClick={(e) => {
                  funcHandleDeleteOrder(id, itemPrice);
                }}
              >
                Cancel
              </Button>
            </td>
          ) : (
            <td></td>
          )}
        </tr>
      )}
    </>
  );
}
export default OrderList;
