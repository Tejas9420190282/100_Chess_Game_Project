import React from 'react'; // Importing React
import Square from './Square'; // Importing Square component

// ChessBoard component for rendering the chessboard
const ChessBoard = ({ board, onSquareClick, selectedPiece, validMoves }) => {
  return (
    <div className="grid grid-cols-8 grid-rows-8"> {/* Using grid layout for chessboard */}
      {board.map((row, rowIndex) => // Iterate through each row in the board
        row.map((piece, colIndex) => ( // Iterate through each piece in the row
          <Square 
            key={`${rowIndex}-${colIndex}`} // Unique key for each square
            piece={piece} // Passing piece to Square
            row={rowIndex} // Passing row index
            col={colIndex} // Passing column index
            onClick={onSquareClick} // Passing click handler
            isHighlighted={validMoves.some(([r, c]) => r === rowIndex && c === colIndex)} // Check if square is valid move
            isSelected={selectedPiece && selectedPiece[0] === rowIndex && selectedPiece[1] === colIndex} // Check if square is selected
          />
        ))
      )}
    </div>
  );
};

export default ChessBoard; // Exporting ChessBoard component
