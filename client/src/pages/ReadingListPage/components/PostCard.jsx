import React from "react";
import logo from "images/logo.png";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const PostCard = ({ data }) => {
  return (
    <div className="d-flex gap-3">
      <img src={data.user_image} alt="" />
      <div>
        <Card.Title>{data.title}</Card.Title>
        <Card.Text>
          <Link to="/user" className="">
            <span className="fw-semibold">{data.full_name}</span>
          </Link>
          <span>•</span>
          <span className=" ">{data.date}</span>
          <span>•</span>
          <span className="">{data.read_time} min read</span>
          <span>•</span>
          {
            data.tag.map((tag, index) => (
              <span className="">{tag}</span>
            ))
          }
        </Card.Text>
      </div>
    </div>
  );
};

export default PostCard;
