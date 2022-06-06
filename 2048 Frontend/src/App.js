import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import Game from './components/2048'
// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  return (
    <div className="App">
      <Game />
    </div>
  );
};

export default App;
