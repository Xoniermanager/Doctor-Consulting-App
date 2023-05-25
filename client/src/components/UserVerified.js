import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserVerified = () => {
 
  return (
    <>
      <div class="thankyoucontent">
        <div class="wrappers-1">
          <div class="wrappers-2">
            <img
              src="https://i.ibb.co/Lkn7rkG/thank-you-envelope.png"
              alt="thank-you-envelope"
              border="0"
            />
            <h1 class="h1">Thank you!</h1>
            <p>Your email has been verified successfully.</p>
            <p>Click on login </p>
            <button class="go-home">
              <Link to={'/login'}>Login</Link>
            </button>
          </div>

          <div class="footer-like">
            <p>Copyright © 2022 Design & Developed by Xonier technologies</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserVerified;
