import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import StoreList from "./StoreList";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Swal from "sweetalert2";
function Store({ user, functionBuy }) {
  const [dataItem, setDataItem] = useState([]);
  const [triggerRenderSave, setTriggerRenderSave] = useState("");
  const [orderItemID, setOrderItemID] = useState("");
  const [orderItemName, setOrderItemName] = useState("");
  const [orderItemType, setOrderItemType] = useState("");
  const [orderItemPrice, setOrderItemPrice] = useState("");
  const [orderItemUrl, setOrderItemUrl] = useState("");
  const [orderTotalCount, setOrderTotalCount] = useState("");
  const [showBuy, setShowBuy] = useState(false);
  const [showOrderButton, setShowOrderButton] = useState(true);

  useEffect(() => {
    fetch("/item_data").then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setDataItem(data);
        });
      }
    });
  }, [triggerRenderSave]);

  const displayAllItem = dataItem.map((data) => {
    return (
      <StoreList
        user={user}
        key={data.id}
        id={data.id}
        item_name={data.item_name}
        item_price={data.item_price}
        item_type={data.item_type}
        item_url={data.item_url}
        setHandlerClickSave={setHandlerClickSave}
        setHandlerClickBuy={setHandlerClickBuy}
      />
    );
  });
  function setHandlerClickSave(user_id, item_id) {
    console.log(user_id, item_id);
    setTriggerRenderSave(item_id);
    fetch("/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        item_id: item_id,
      }),
    }).then((r) => {
      Swal.fire({
        title: "Item Saved",
        text: "Successfully Like!",
        icon: "success",
      });
    });
  }
  function setHandlerClickBuy(id, item_name, item_price, item_type, item_url) {
    console.log(id, item_name, item_price, item_type, item_url);
    setOrderItemID(id);
    setOrderItemName(item_name);
    setOrderItemPrice(item_price);
    setOrderItemType(item_type);
    setOrderItemUrl(item_url);
    setShowBuy(true);
  }

  useEffect(() => {
    let totalCount = user.user_balance - orderItemPrice;
    if (totalCount < 0) {
      setOrderTotalCount("Not Enought money");
      setShowOrderButton(false);
    } else {
      setShowOrderButton(true);
      setOrderTotalCount(totalCount);
    }
    console.log(totalCount);
  }, [showBuy]);

  const handleOrder = (e) => {
    fetch("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_status: "Order",
        user_id: user.id,
        item_id: orderItemID,
      }),
    });
    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_balance: orderTotalCount,
      }),
    });
    Swal.fire({
      title: "Item Ordered",
      text: "Successfully Order!",
      icon: "success",
    });
    functionBuy(orderTotalCount);
    setShowBuy(false);
  };
  return (
    <>
      <div>
        <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
          <div className="col-lg-8 align-self-end">
            <h1 className="font-weight-bold">Store</h1>
          </div>
        </div>
      </div>
      {showBuy ? (
        <>
          <form onSubmit={handleOrder}>
            <Card.Img style={{ height: "250px", width: "250px", padding: "5%" }} variant="top" src={orderItemUrl} />
            <Form.Group className="mb-3">
              <Form.Label>Item Name</Form.Label>
              <Form.Control placeholder={orderItemName} disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Item Type</Form.Label>
              <Form.Control placeholder={orderItemType} disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Item Price</Form.Label>
              <Form.Control placeholder={orderItemPrice} disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Your Money Balance : ${user.user_balance}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Item Price : ${orderItemPrice}</Form.Label>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Total Balance : ${orderTotalCount}</Form.Label>
            </Form.Group>

            {showOrderButton ? (
              <Button type="submit" variant="primary">
                Order
              </Button>
            ) : (
              <></>
            )}

            <Button
              variant="outline-danger"
              onClick={(e) => {
                e.preventDefault();
                setShowBuy(false);
              }}
            >
              Cancel
            </Button>
          </form>
        </>
      ) : (
        <Row xs={1} md={3} className="g-2">
          {displayAllItem}
        </Row>
      )}
    </>
  );
}

export default Store;
