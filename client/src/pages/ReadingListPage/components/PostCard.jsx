import React from "react";
import logo from "images/logo.png";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const PostCard = ({ data }) => {
  return (
    <div className="d-flex gap-3">
      <img src={data.profile_image_url} alt="" />
      <div>
        <Card.Title>
          <Link to={
            `/post/:path`.replace(":path", data.slug)
          } className="text-decoration-none">{data.title}</Link>
        </Card.Title>
        <Card.Text>
          <Link to="/user" className="">
            <span className="fw-semibold">{data.author}</span>
          </Link>
          <span>•</span>
          <span className=" ">{
            new Date(data.createdAt).toLocaleDateString(undefined, {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }) 
            }</span>
          <span>•</span>
          <span className="">{data.read_time} min read</span>
          <span>•</span>
          
          <span className="">{data.category_name}</span>
          
        </Card.Text>
      </div>
    </div>
  );
};

export default PostCard;
