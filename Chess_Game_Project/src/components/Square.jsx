import React from 'react'; // Importing React
import Piece from './Piece'; // Importing Piece component

// Square component for individual squares on the chessboard
const Square = ({ piece, row, col, onClick, isHighlighted, isSelected }) => {
  // Determine if the square is black or white based on its coordinates
  const isBlack = (row + col) % 2 === 1; // Checks if sum of row and column index is odd
  // Set background color based on piece state and highlight conditions
  const bgColor = isHighlighted ? 'bg-green-500' : isSelected ? 'bg-red-500' : isBlack ? 'bg-blue-300' : 'bg-yellow-800';

  return (
    <div 
      className={`w-16 h-16 flex items-center justify-center ${bgColor}`} // Set width, height, and background color
      onClick={() => onClick(row, col)} // Set click event to call the passed onClick function
    >
      {piece && <Piece type={piece} />} {/* Render Piece component if a piece is present */}
    </div>
  );
};

export default Square; // Exporting Square component
