import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function LikeList({ user, id, item_name, item_price, item_type, item_url, funcHandleDeleteLike }) {
  //   console.log(id);
  function handleDeleteLike(e) {
    e.preventDefault();
    funcHandleDeleteLike(id);
  }
  return (
    <Col>
      <Card>
        <Card.Img style={{ height: "10%", padding: "10%" }} variant="top" src={item_url} />
        <Card.Body>
          <Card.Title>{item_name}</Card.Title>
          <Card.Text>
            ${item_price} - {item_type}
          </Card.Text>
          <Button variant="danger" onClick={handleDeleteLike}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default LikeList;
