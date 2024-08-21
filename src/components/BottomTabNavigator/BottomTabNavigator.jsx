import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import { AiOutlineHome, AiOutlineHeart } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import "./BottomTabNavigator.scss";

function BottomTabNavigator() {
  return (
    <div className="bottom-navigator-wrapper">
      <Navbar fixed="bottom" className="justify-content-around">
        <Nav>
          <Nav.Item>
            <Nav.Link as={Link} to="/">
              <AiOutlineHome className="tab-icon" />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/order-tracking">
              <TbTruckDelivery className="tab-icon" />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="badge_icon_wrape">
            <Nav.Link as={Link} to="/wishlist">
              <AiOutlineHeart className="tab-icon" />
              <Badge className="badge_wrape">0</Badge>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="badge_icon_wrape">
            <Nav.Link as={Link} to="/cart">
              <BsCart2 className="tab-icon" />
              <Badge className="badge_wrape">0</Badge>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </div>
  );
}

export default BottomTabNavigator;
