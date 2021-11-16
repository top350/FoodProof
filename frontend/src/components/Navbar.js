import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";

//navigation bar
export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card className="nav-card">
        <nav>
          <ul className="link-header">
            <li className="link-list">
              <Link to="/producer">Producer</Link>
            </li>
          </ul>
        </nav>
      </Card>
    );
  }
}
