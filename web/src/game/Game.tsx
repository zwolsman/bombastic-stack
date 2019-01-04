import * as React from "react";
import { random, reward } from "src/utils";
import Grid from "./Grid";

export interface GameProps {
  id?: string;
  onFinished: () => void;
}

export interface GameState {
  moves: Move[];
  stake: number;
  turnPlayerId: number;
  bombs: number[];
  finished: boolean;
}

export interface Move {
  playerId: number;
  tileId: number;
  points: number;
}

export default class Game extends React.Component<GameProps, GameState> {
  public state: GameState = {
    bombs: this.generateBombs(),
    finished: false,
    moves: [],
    stake: 100,
    turnPlayerId: 0
  };

  public render() {
    return (
      <div>
        <Grid
          onTileClick={this.tileClick}
          moves={this.state.moves}
          finished={this.state.finished}
        />

        <p>
          Number of moves: <b>{this.state.moves.length}</b>
        </p>
        <p>
          Stake: <b>{this.state.stake}</b>
        </p>
        {this.state.finished && <p>Game is finished</p>}
      </div>
    );
  }

  private generateBombs() {
    const bombs: number[] = [];
    for (let i = 0; i < 3; i++) {
      let bomb = random(0, 24);
      while (bombs.indexOf(bomb) !== -1) {
        console.log("rerolling bomb");
        bomb = random(0, 24);
      }
      bombs.push(bomb);
    }
    return bombs;
  }

  private tileClick = (tileId: number) => {
    const moves = [...this.state.moves];

    const { stake, bombs, turnPlayerId } = this.state;

    const points =
      bombs.indexOf(tileId) === -1 ? reward(moves.length, stake) - stake : -1;

    moves.push({
      playerId: turnPlayerId,
      points,
      tileId
    });

    this.setState(
      {
        finished: points === -1,
        moves,
        stake: stake + points,
        turnPlayerId: (turnPlayerId + 1) % 2
      },
      this.checkFinished
    );
  };

  private checkFinished() {
    if (this.state.finished) {
      this.props.onFinished();
    }
  }
}
