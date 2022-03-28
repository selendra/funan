import { Tooltip } from "antd";
import React from "react";
import logo from "../assets/logo.png";
export default function Footer() {
  const data = [
    {
      icon: "ri-telegram-fill",
      link: "",
    },
    {
      icon: "ri-facebook-fill",
      link: "",
    },
    {
      icon: "ri-twitter-fill",
      link: "",
    },
    {
      icon: "ri-linkedin-fill",
      link: "",
    },
    {
      icon: "ri-medium-fill",
      link: "",
    },
    {
      icon: "ri-github-fill",
      link: "",
    },
  ];

  return (
    <>
      <div className="footer-background">
        <div className="container">
          <div className="footer-layout">
            <div>
              <img src={logo} alt="selendra" height={60} />
            </div>
            <div className="social-media-footer">
              <div></div>
              <div className="">
                <span>Find us on</span>
                {data.map((res) => {
                  return <i class={res.icon}></i>;
                })}

                {/* <i class="ri-facebook-fill"></i>
                <i class="ri-twitter-fill"></i>
                <i class="ri-linkedin-fill"></i>
                <i class="ri-medium-fill"></i>
                <i class="ri-github-fill"></i> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
