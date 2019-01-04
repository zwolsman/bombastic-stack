import * as React from "react";
import { Move } from "./Game";

export interface GridProps {
  width?: number;
  height?: number;
  moves: Move[];
  onTileClick: ((tileId: number) => void);
  finished: boolean;
}

const defaultProps = {
  height: 5,
  width: 5
};

export default class Grid extends React.Component<GridProps, any> {
  public render() {
    const width = this.props.width || defaultProps.width;
    const height = this.props.height || defaultProps.height;

    const { moves, finished, onTileClick } = this.props;

    const rows = [];
    for (let y = 0; y < height; y++) {
      const row = [];
      for (let x = 0; x < width; x++) {
        const index = y * height + x;
        const tileClick = () => onTileClick(index);
        const move = moves.find(m => m.tileId === index);
        const disabled = finished || move !== undefined;

        let text = "-";
        if (disabled && move !== undefined) {
          if (move.points === -1) {
            text = "BOMB";
          } else {
            text = `+${move.points}`;
          }
        }

        const style = {
          color: "",
          height: 75,
          margin: 8,
          width: 75
        };

        if (move) {
          style.color = move.playerId === 0 ? "purple" : "blue";
        }

        row.push(
          <button
            key={index}
            style={style}
            onClick={tileClick}
            disabled={disabled}
          >
            {text}
          </button>
        );
      }

      rows.push(<div key={y}>{row}</div>);
    }
    return <div>{rows}</div>;
  }
}
