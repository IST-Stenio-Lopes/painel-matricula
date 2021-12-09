import React from "react";
import './style.css';
import { NavbarTop } from "./style";
import { Avatar } from "@material-ui/core";
import Badge from '@material-ui/core/Badge';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



export default function Navbar() {



  return (
    <div className="navbar">
      <NavbarTop className="row">
        <div className="col-sm-8">

        </div>
        <div className="col-sm-1">
          <Badge badgeContent={4} color="primary">
            <NotificationsNoneIcon color="error" style={{ fontSize: 30 }} />
          </Badge>
        </div>
        <div className="col-sm-3">

          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" style={{ width: 40, height: 40 }} />
          <p className="text-justify">Mysael Ribeiro</p>
          <ExpandMoreIcon />

        </div>
      </NavbarTop>
    </div>

  );
}