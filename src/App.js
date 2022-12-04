// import logo from "./logo.svg";
import "./App.css";
import StarRating from "./StarRating";
import logo from "../src/components/assets/logo.png";
import "./styles/home.scss";
import { useState } from "react";
import company from "../src/components/Data";

import "@rainbow-me/rainbowkit/styles.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

function App() {
  const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
    [
      alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID }),
      publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "Marcat",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  const [rating2, setRating2] = useState(0);
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div className="App">
          <div className="navbar">
            <img className="logo" src={logo} alt="logo" />
            <div className="navbar-right">
              <ConnectButton
                accountStatus={{
                  smallScreen: "avatar",
                  largeScreen: "full",
                }}
              />
            </div>
          </div>
          <div className="main-section">
            <h1 className="title">Find the new & upcoming dApps here!</h1>
            <h1 className="title">
              Let all the other users know how you like them
            </h1>

            {company.map((item, key) => {
              return (
                <div className="card" key={key}>
                  <div className="first">
                    <div className="company-img">
                      <img
                        className="company_img"
                        src={item.logo}
                        alt="companylogo"
                      />
                    </div>
                    <div className="company-details">
                      <h2 className="company-name">{item.name}</h2>
                      <a href={item.link}>{item.link}</a>
                      <p>About the dApp:</p>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                  <div className="second">
                    <div className="left-inside-second">
                      <span>{rating2} ★</span>
                      <span>1K+ reviews</span>
                      <span>DeFi</span>
                    </div>
                    <div className="right-inside-second">
                      <span>Rate this dApp</span>{" "}
                      <StarRating setRating2={setRating2} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
