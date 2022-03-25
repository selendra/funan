import React from "react";

export default function Index() {
  return (
    <div className="vertical-layout">
      <div className="home-navbar">
        <div className="home-container">
          <img
            src="/images/logo-white.png"
            alt="selendra-logo-white"
            height={60}
            style={{ marginTop: "15px" }}
          />

          <div className="index-data">
            <div className="welcome-message">Welcome to Selendra Wallet</div>
            <h4 className="welcome-sub-message">
              Send, receive and stake your SEL
            </h4>
          </div>

          <div className="pos-relative">
            <div className="index-btn-section">
              <div className="index-btn con-wallet">
                <img src="/icons/bulk/wallet-3.svg" alt="" height="40px" />
                Connect Wallet
              </div>
              <div className="index-btn create-wallet">
                <img
                  src="/icons/bulk/wallet-add-1-index.svg"
                  alt=""
                  height="40px"
                />
                Create Wallet
              </div>
              <div className="index-btn restore-wallet">
                <img src="/icons/bulk/key-square.svg" alt="" height="40px" />
                Restore Wallet
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-container">
        <div className="apps-section">
          <h3>
            The SELENNDRA Bitriel Wallet has been created as a Progressive Web
            App (PWA) which is easy to launch on all platforms:{" "}
          </h3>
          <div className="apps-btn-section">
            <div className="apps-btn">
              <img src="/icons/bulk/android.svg" alt="" height="30px" />
              Andriod
            </div>
            <div className="apps-btn">
              <img src="/icons/bulk/apple.svg" alt="" height="30px" />
              iOS
            </div>
          </div>
        </div>
      </div>
      <div className="index container">
        <div className="index-footer">
          <div>
            <i class="ri-facebook-fill"></i>
            <i class="ri-telegram-fill"></i>
            <i class="ri-twitter-fill"></i>
            <i class="ri-linkedin-fill"></i>
            <i class="ri-medium-fill"></i>
          </div>
          <div>
            <p>2022 © Selendra, Blockchain</p>
          </div>
        </div>
      </div>
    </div>
  );
}
