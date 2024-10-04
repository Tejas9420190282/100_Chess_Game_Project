import React from 'react'; // Importing React
import { FaChessKnight, FaChessPawn, FaChessKing, FaChessBishop, FaChessRook } from "react-icons/fa"; // Importing chess piece icons
import { GiChessQueen } from "react-icons/gi"; // Importing queen icon

// Chess piece symbols using an object for mapping
const symbols = {
  r: <FaChessRook />, // Black rook
  n: <FaChessKnight />, // Black knight
  b: <FaChessBishop />, // Black bishop
  q: <GiChessQueen />, // Black queen
  k: <FaChessKing />, // Black king
  p: <FaChessPawn />, // Black pawn
  R: <FaChessRook color='black' />, // White rook
  N: <FaChessKnight color='black' />, // White knight
  B: <FaChessBishop color='black' />, // White bishop
  Q: <GiChessQueen color='black' />, // White queen
  K: <FaChessKing color='black' />, // White king
  P: <FaChessPawn color='black' />, // White pawn
};

// Piece component for rendering individual chess pieces
const Piece = ({ type }) => {
  return (
    <span className="text-3xl"> {/* Setting text size for the piece */}
      {symbols[type] || ''} {/* Render the corresponding icon or an empty string if no piece */}
    </span>
  );
};

export default Piece; // Exporting Piece component
