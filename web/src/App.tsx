import * as React from "react";
import "./App.css";

import Game from "./game/Game";

class App extends React.Component {
  public state = {
    games: 1
  };
  public render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Bombastic</h1>
        {...Array(this.state.games).fill(
          <Game onFinished={this.onGameFinished} />
        )}
      </div>
    );
  }

  private onGameFinished = () => {
    this.setState({
      games: this.state.games + 1
    });
  };
}

export default App;
