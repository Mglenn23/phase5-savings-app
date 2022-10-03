import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";

function StoreList({ user, id, item_name, item_price, item_type, item_url, setHandlerClickSave, setHandlerClickBuy }) {
  const [showSave, setShowSave] = useState(true);
  useEffect(() => {
    fetch("/likes_data").then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          if (data.user_id == user.id) {
            // console.log("hu");
          } else {
            data.map((d) => {
              if (d.user_id == user.id && d.item_id == id) {
                setShowSave(false);
              }
            });
          }
        });
      }
    });
  }, [setHandlerClickSave]);

  const handleSave = (e) => {
    e.preventDefault();
    setHandlerClickSave(user.id, id);
  };
  const handleBuy = (e) => {
    e.preventDefault();
    setHandlerClickBuy(id, item_name, item_price, item_type, item_url);
  };
  return (
    <Col>
      <Card>
        <Card.Img style={{ height: "10%", padding: "10%" }} variant="top" src={item_url} />
        <Card.Body>
          <Card.Title>{item_name}</Card.Title>
          <Card.Text>
            ${item_price} - {item_type}
          </Card.Text>
          <Button variant="primary" onClick={handleBuy}>
            Buy
          </Button>
          {showSave ? (
            <>
              <Button variant="secondary" onClick={handleSave}>
                Save
              </Button>
            </>
          ) : (
            <></>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default StoreList;
