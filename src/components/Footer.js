import { useTheme } from "next-themes";
import React from "react";
import logo from "../assets/logo.png";
import logoWhite from "../assets/logo-white.png";

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

  const { theme } = useTheme();

  return (
    <>
      <div className="footer-background">
        <div className="container">
          <div className="footer-layout">
            <div>
              <img
                src={theme === "light" ? logo : logoWhite}
                alt="selendra"
                height={60}
              />
            </div>
            <div className="social-media-footer">
              <div></div>
              <div className="">
                <span>Find us on</span>
                {data.map((res) => {
                  return <i className={res.icon}></i>;
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
