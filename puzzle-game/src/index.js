import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { useTransition, animated } from "react-spring";

import {
  MemoryRouter as Router,
  Route,
  Switch,
  useLocation
} from "react-router-dom";

import { MainMenuScreen } from "./screens/main-menu.screen";
import { DifficultyLevelScreen } from "./screens/difficulty-level.screen";
import { TimeLimitScreen } from "./screens/time-limit.screen";
import { MinSwapsScreen } from "./screens/min-swaps.screen";

import "./styles.css";
import store from "./store";
import { ModeSelectScreen } from "./screens/mode-select.screen";
import { gameModeUrlMap, gameMode } from "./store/constants";

function App() {

  const [walletAddress, setWalletAddress] = useState(null);
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');

        /*
         * The solana object gives us a function that will allow us to connect
         * directly with the user's wallet!
         */
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log(
          'Connected with Public Key:',
          response.publicKey.toString()
        );

         /*
           * Set the user's publicKey in state to be used later!
           */
         setWalletAddress(response.publicKey.toString());

        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  /*
   * We want to render this UI when the user hasn't connected
   * their wallet to our app yet.
   */
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  const location = useLocation();
  const transitions = useTransition(location, location => location.pathname, {
    from: { transform: "translateX(100vw)" },
    enter: { transform: "translateX(0)" },
    leave: { transform: "translateX(-100vw)" },
    delay: 500
  });

  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>{!walletAddress && renderNotConnectedContainer()}</div>
      {transitions.map(({ item, key, props: style }) => (
        <animated.div key={key} style={style}>
          <Switch location={item}>
            <Route path={gameModeUrlMap[gameMode.minSwaps]}>
              <MinSwapsScreen />
            </Route>

            <Route path={gameModeUrlMap[gameMode.timeLimit]}>
              <TimeLimitScreen />
            </Route>

            <Route path="/difficulty-level">
              <DifficultyLevelScreen />
            </Route>

            <Route path="/mode-select">
              <ModeSelectScreen />
            </Route>

            <Route path="/" exact>
              <MainMenuScreen />
            </Route>
          </Switch>
        </animated.div>
      ))}
    </div>
  );
}

const rootElement = document.getElementById("root");

const ReduxedApp = () => {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
};

ReactDOM.render(<ReduxedApp />, rootElement);
