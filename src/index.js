import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function coinToSrcURL(coin) {
  return "assets/" + coin.toLowerCase().replace(/ /g, "_") + ".svg";
}

class Title extends React.Component {
  constructor(props) {
    super(props);
    this.trigger = props.trigger;
  }

  render() {
    return (
      <div className="theme" id="title">
        {/* <span>Crypto·gotchi</span> */}
        <span>Crypto•gotchi</span>
        <br />
        <button onClick={this.trigger}>Begin</button>
      </div>
    );
  }
}

class CoinSelection extends React.Component {
  constructor(props) {
    super(props);
    this.coin = props.coin;
    this.src = coinToSrcURL(this.coin);
    this.trigger = props.trigger;
  }

  render() {
    return (
      <div
        className="coinSelection"
        onClick={this.trigger.bind(this, this.coin)}
      >
        <img src={this.src} alt="coinSelection" />
        <br />
        <span>{this.coin}</span>
      </div>
    );
  }
}

class Selection extends React.Component {
  constructor(props) {
    super(props);
    this.trigger = props.trigger;
    this.coins = [
      ["Bitcoin", "Ethereum"],
      ["Binance Coin", "Cardano"],
      ["Dogecoin", "Tether"],
      ["XRP", "Polkadot"],
      ["Bitcoin Cash", "Uniswap"],
      ["Litecoin", "Chainlink"],
      ["Stellar", "USD Coin"],
      ["Solana", "Ethereum Classic"],
      ["VeChain", "Polygon"],
      ["EOS", "THETA"],
      ["TRON", "Wrapped Bitcoin"],
      ["Filecoin", "Monero"],
      ["Aave", "Neo"],
      ["Huobi Token", "Cosmos"],
      ["Tezos", "Dai"],
      ["Maker", "Kusama"],
      ["Algorand", "BitTorrent"],
      ["Compound", "UNUS SED LEO"],
      ["Dash", "Waves"],
      ["Zcash", "NEM"],
      ["yearn.finance", "Decred"],
      ["Synthetix", "Zilliqa"],
      ["SushiSwap", "Qtum"],
      ["Decentraland", "Nexo"],
      ["Holo", "Telcoin"],
      ["Stacks", "Basic Attention Token"],
      ["Bitcoin Gold", "The Graph"],
      ["Ontology", "Enjin Coin"],
      ["DigiByte", "UMA"],
      ["Nano", "Horizen"],
      ["Siacoin", "Bancor"],
      ["OMG Network", "0x"],
      ["ICON", "Paxos Standard"],
      ["Ravencoin", "Curve DAO Token"],
      ["Ankr", "KuCoin Token"],
      ["Lisk", "Bitcoin Diamond"],
      ["IOST", "Verge"],
      ["Ren", "Loopring"],
      ["Livepeer", "Status"],
      ["Dent", "Kyber Network Crystal Legacy"],
      ["Storj", "VeThor Token"],
      ["Balancer", "Augur"],
      ["Gnosis", "NKN"],
      ["FUNToken", "Steem"],
      ["Ardor", "Aragon"],
      ["Civic", "Komodo"],
      ["Band Protocol", "MCO"],
      ["Wanchain", "MaidSafeCoin"],
      ["Numeraire", "MediBloc"],
      ["Bytom", "BitShares"],
      ["Utrust", "Syscoin"],
      ["Ark", "Metal"],
      ["Polymath", "Orchid"],
      ["Ontology Gas"],
    ];
  }

  render() {
    return (
      <div className="theme" id="selectionList">
        <span id="adopt">Adopt a cryptocurrency</span>
        <br />
        {this.coins.map((coins, index) => {
          return (
            <div key={index}>
              {coins.map((coin) => {
                return (
                  <CoinSelection
                    coin={coin}
                    trigger={this.trigger}
                    key={coin}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

class GameOver extends React.Component {
  constructor(props) {
    super(props);
    this.trigger = props.trigger;
  }

  render() {
    return (
      <div className="restart">
        <span>Your coin crashed!</span>
        <br />
        <button onClick={this.trigger}>Restart</button>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.coin = props.coin;
    this.src = coinToSrcURL(this.coin);
    this.state = {
      value: 750,
      valueDirection: -30,
      lifeCycles: 0,
      hasCrashed: false,
      imgBig: true,
    };
    this.trigger = props.trigger;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.hasCrashed) {
        clearInterval(this.interval);
      }
      var newImgSize = this.state.imgBig;
      if (this.state.lifeCycles % 50 === 0) {
        newImgSize = !newImgSize;
      }
      const newValue = this.getNewValue();
      this.setState((state) => ({
        value: newValue[0],
        valueDirection: newValue[1],
        lifeCycles: state.lifeCycles + 1,
        hasCrashed: state.value < 1,
        imgBig: newImgSize,
      }));
    }, 16);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getNewValue() {
    if (this.state.valueDirection > 1) {
      // Upwards trend
      return [this.state.value + 1, this.state.valueDirection - 1];
    } else if (this.state.valueDirection < -1) {
      // Downwards trend
      return [this.state.value - 1, this.state.valueDirection + 1];
    } else {
      // Randomly choose a new direction, with a bias towards downward trend
      return [this.state.value, Math.random() * 150 - 100];
    }
  }

  render() {
    return (
      <div className="theme" id="game">
        <span>{this.coin}</span>
        <br />
        <progress value={this.state.value} max="1000" />
        <br />
        {this.state.imgBig ? (
          <img src={this.src} id="imgBig" alt="imgBig" />
        ) : (
          <img src={this.src} id="imgSmall" alt="imgSmall" />
        )}
        <br />
        <div id="actionButtons">
          <button>Feed</button>
          <button>Play</button>
          <button>Groom</button>
        </div>

        {this.state.hasCrashed && <GameOver trigger={this.trigger} />}
      </div>
    );
  }
}

class CryptoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: "title", coin: "" };
  }

  triggerSelection = () => {
    this.setState({
      ...this.state,
      page: "selection",
      coin: "",
    });
  };

  triggerGame = (coin) => {
    this.setState({
      ...this.state,
      page: "game",
      coin: coin,
    });
  };

  render() {
    return (
      <div>
        {this.state.page === "title" && (
          <Title trigger={this.triggerSelection} />
        )}

        {this.state.page === "selection" && (
          <Selection trigger={this.triggerGame} />
        )}

        {this.state.page === "game" && (
          <Game coin={this.state.coin} trigger={this.triggerSelection} />
        )}
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <CryptoApp />
  </React.StrictMode>,
  document.getElementById("root")
);
