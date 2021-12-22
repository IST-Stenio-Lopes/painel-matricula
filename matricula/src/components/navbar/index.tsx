import React, { Children, useState } from "react";
import './style.css';
import { NavbarTop, BellNotification } from "./style";
import { Avatar } from "@material-ui/core";
import Badge from '@material-ui/core/Badge';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Pay from "./pay";
import User from "./user";
import Modal from '../../components/modal/index';



export default function Navbar() {

  const [showPaymant, setShowPaymant] = useState(false);
  const [showUser, setShowUser] = useState(false);

  return (
    <div className="navbar">

      <NavbarTop className="row" status={false}>
        <div className="col-sm-8">

        </div>
        <div className="col-sm-1">


          <button type="button" className="btn position-relative" onClick={() => (setShowPaymant(!showPaymant))}>

            <BellNotification status={true}>
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle" />
            </BellNotification>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-bell text-light" viewBox="0 0 16 16">
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />

            </svg>
          </button>
          {
            (showPaymant ? <Pay /> : <></>)
          }
          {
            (showUser ? <User /> : <></>)
          }

        </div>

        <div className="col-sm-3">

          <div className="row">
            <div className="col-sm-3">
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" style={{ width: 40, height: 40 }} />
            </div>
            <div className="col-sm-6">
              <p className="text-justify">Mysael Ribeiro</p>

            </div>
            <div className="col-sm-3">

              <button type="button" className="btn position-relative" onClick={() => (setShowUser(!showUser))}>
                <ExpandMoreIcon />

              </button>

            </div>
          </div>
        </div>
      </NavbarTop>
    </div>

  );
}