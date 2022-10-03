import styled from "styled-components";
import { useState, useEffect } from "react";

import Row from "react-bootstrap/Row";
import LikeList from "./LikeList";
function LikePage({ user }) {
  const [dataItem, setDataItem] = useState([]);
  const [dataLike, setDataLike] = useState([]);
  const [deleteLike, setDeleteLike] = useState("");
  let newArr = [];

  useEffect(() => {
    fetch("/item_data").then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setDataItem(data);
        });
      }
    });
  }, [dataLike, deleteLike]);

  useEffect(() => {
    fetch("/likes_data").then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setDataLike(data);
        });
      }
    });
  }, [deleteLike]);

  dataLike.map((dat) => {
    if (dat.user_id == user.id) {
      dataItem.map((data) => {
        if (data.id == dat.item_id) {
          // console.log({ id: dat.id, item_name: data.item_name, item_price: data.item_price, item_type: data.item_type, item_url: data.item_url });
          newArr.push({ id: dat.id, item_name: data.item_name, item_price: data.item_price, item_type: data.item_type, item_url: data.item_url });
        }
      });
    }
  });
  const displayAllItem = newArr.map((dat) => {
    // console.log(dat);
    return <LikeList user={user} key={dat.id} id={dat.id} item_name={dat.item_name} item_price={dat.item_price} item_type={dat.item_type} item_url={dat.item_url} funcHandleDeleteLike={funcHandleDeleteLike} />;
  });
  function funcHandleDeleteLike(id) {
    // console.log(`/likes/${id}`);
    setDeleteLike(id);
    fetch(`/likes/${id}`, {
      method: "DELETE",
    });
  }

  return (
    <Wrapper>
      <Row xs={1} md={3} className="g-2">
        {displayAllItem}
      </Row>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

export default LikePage;
