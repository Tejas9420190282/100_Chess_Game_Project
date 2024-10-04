import { useState } from 'react'; // Importing useState hook from React for managing state
import './App.css'; // Importing CSS styles for the App
import ChessBoard from './components/ChessBoard'; // Importing the ChessBoard component

function App() {
  // Initializing the chessboard with two-dimensional array. Each piece is represented by a letter.
  const [board, setBoard] = useState([
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'], // 8th rank (black pieces)
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'], // 7th rank (black pawns)
    [null, null, null, null, null, null, null, null], // 6th rank (empty)
    [null, null, null, null, null, null, null, null], // 5th rank (empty)
    [null, null, null, null, null, null, null, null], // 4th rank (empty)
    [null, null, null, null, null, null, null, null], // 3rd rank (empty)
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'], // 2nd rank (white pawns)
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'], // 1st rank (white pieces)
  ]);

  const [currentPlayer, setCurrentPlayer] = useState('white'); // State to track whose turn it is
  const [selectedPiece, setSelectedPiece] = useState(null); // State to track the currently selected piece
  const [validMoves, setValidMoves] = useState([]); // State to track valid moves for the selected piece

  // Function to handle square click events
  const handleSquareClick = (row, col) => {
    if (selectedPiece) { // If a piece is selected
      const [selectedRow, selectedCol] = selectedPiece; // Destructuring selected piece's coordinates

      // Check if the clicked square is a valid move for the selected piece
      if (validMoves.some(([r, c]) => r === row && c === col)) {
        // Create a new board by mapping through the existing board
        const newBoard = board.map((r) => r.slice()); // Creates a shallow copy of each row

        // Move the selected piece to the new square
        newBoard[row][col] = newBoard[selectedRow][selectedCol]; // Place piece in new position
        newBoard[selectedRow][selectedCol] = null; // Remove piece from old position

        setBoard(newBoard); // Update the board state
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white'); // Switch players
      }

      setSelectedPiece(null); // Deselect the piece
      setValidMoves([]); // Clear valid moves
    } else {
      const piece = board[row][col]; // Get the piece at the clicked square
      // Check if the clicked piece belongs to the current player
      if (
        (currentPlayer === 'white' && piece === piece.toUpperCase()) || // Check for white piece
        (currentPlayer === 'black' && piece === piece.toLowerCase()) // Check for black piece
      ) {
        setSelectedPiece([row, col]); // Set the selected piece
        // Calculate valid moves for the selected piece
        setValidMoves(calculateValidMoves(row, col, piece, board)); // Call the function to get valid moves
      }
    }
  };

  // Function to calculate valid moves based on piece type and position
  const calculateValidMoves = (row, col, piece, board) => {
    const moves = []; // Array to hold valid moves
    // Object containing movement directions for each piece type
    const directions = {
      king: [
        [1, 0], [0, 1], [-1, 0], [0, -1], // vertical and horizontal moves
        [1, 1], [-1, -1], [-1, 1], [1, -1], // diagonal moves
      ],
      queen: [
        [1, 0], [0, 1], [-1, 0], [0, -1],
        [1, 1], [-1, -1], [-1, 1], [1, -1],
      ],
      bishop: [[1, 1], [-1, -1], [-1, 1], [1, -1]],
      rook: [[1, 0], [0, 1], [-1, 0], [0, -1]],
      knight: [
        [2, 1], [2, -1], [-2, 1], [-2, -1], // L-shaped moves
        [1, 2], [1, -2], [-1, 2], [-1, -2],
      ],
    };

    // King Movement
    if (piece.toLowerCase() === 'k') {
      directions.king.forEach(([dx, dy]) => {
        const [newRow, newCol] = [row + dx, col + dy]; // Calculate new position
        if (isValidMove(newRow, newCol, piece, board)) { // Check if move is valid
          moves.push([newRow, newCol]); // Add valid move to array
        }
      });
    }

    // Queen Movement (combination of rook and bishop)
    if (piece.toLowerCase() === 'q') {
      directions.queen.forEach(([dx, dy]) => {
        let [newRow, newCol] = [row + dx, col + dy]; // Calculate new position
        while (isValidMove(newRow, newCol, piece, board)) { // Loop for multiple squares
          moves.push([newRow, newCol]); // Add valid move to array
          if (board[newRow][newCol]) break; // Stop if a piece is encountered
          newRow += dx; // Move to the next square in the same direction
          newCol += dy;
        }
      });
    }

    // Rook Movement
    if (piece.toLowerCase() === 'r') {
      directions.rook.forEach(([dx, dy]) => {
        let [newRow, newCol] = [row + dx, col + dy]; // Calculate new position
        while (isValidMove(newRow, newCol, piece, board)) { // Loop for multiple squares
          moves.push([newRow, newCol]); // Add valid move to array
          if (board[newRow][newCol]) break; // Stop if a piece is encountered
          newRow += dx; // Move to the next square in the same direction
          newCol += dy;
        }
      });
    }

    // Bishop Movement
    if (piece.toLowerCase() === 'b') {
      directions.bishop.forEach(([dx, dy]) => {
        let [newRow, newCol] = [row + dx, col + dy]; // Calculate new position
        while (isValidMove(newRow, newCol, piece, board)) { // Loop for multiple squares
          moves.push([newRow, newCol]); // Add valid move to array
          if (board[newRow][newCol]) break; // Stop if a piece is encountered
          newRow += dx; // Move to the next square in the same direction
          newCol += dy;
        }
      });
    }

    // Knight Movement
    if (piece.toLowerCase() === 'n') {
      directions.knight.forEach(([dx, dy]) => {
        const [newRow, newCol] = [row + dx, col + dy]; // Calculate new position
        if (isValidMove(newRow, newCol, piece, board)) { // Check if move is valid
          moves.push([newRow, newCol]); // Add valid move to array
        }
      });
    }

    // Pawn Movement (forward and diagonal capture)
    if (piece.toLowerCase() === 'p') {
      const direction = piece === 'P' ? -1 : 1; // Determine direction based on piece color
      const startRow = piece === 'P' ? 6 : 1; // Determine starting row for double step

      // Move forward
      if (!board[row + direction][col]) { // Check if the square in front is empty
        moves.push([row + direction, col]); // Add forward move
        // Check if the pawn is in its starting position for double move
        if (row === startRow && !board[row + 2 * direction][col]) {
          moves.push([row + 2 * direction, col]); // Add double move
        }
      }

      // Capture diagonally
      const diagonalCaptures = [
        [row + direction, col + 1], // Right diagonal capture
        [row + direction, col - 1], // Left diagonal capture
      ];
      diagonalCaptures.forEach(([r, c]) => {
        if (isValidCapture(r, c, piece, board)) { // Check if capture is valid
          moves.push([r, c]); // Add capture move to array
        }
      });
    }

    return moves; // Return the array of valid moves
  };

  // Function to check if a move is valid
  const isValidMove = (row, col, piece, board) => {
    return (
      row >= 0 && row < 8 && // Check row boundaries
      col >= 0 && col < 8 && // Check column boundaries
      (!board[row][col] || isOpponentPiece(piece, board[row][col])) // Check if square is empty or contains an opponent's piece
    );
  };

  // Function to check if a capture is valid
  const isValidCapture = (row, col, piece, board) => {
    return (
      row >= 0 && row < 8 && // Check row boundaries
      col >= 0 && col < 8 && // Check column boundaries
      board[row][col] && // Check if square contains a piece
      isOpponentPiece(piece, board[row][col]) // Check if the piece is an opponent's piece
    );
  };

  // Function to check if a piece is an opponent's piece
  const isOpponentPiece = (piece, targetPiece) => {
    return (
      (piece === piece.toUpperCase() && targetPiece === targetPiece.toLowerCase()) || // Check if piece is white and target is black
      (piece === piece.toLowerCase() && targetPiece === targetPiece.toUpperCase()) // Check if piece is black and target is white
    );
  };

  return (
    <>
      <ChessBoard 
        board={board} // Passing board state to ChessBoard component
        onSquareClick={handleSquareClick} // Passing click handler
        selectedPiece={selectedPiece} // Passing selected piece's coordinates
        validMoves={validMoves} // Passing valid moves to highlight
      />
      <div className="text-center mt-4">
        <h2>{currentPlayer === 'white' ? 'Black\'s Turn' : 'White\'s Turn'  }</h2> {/* Display current player's turn */}
      </div>
    </>
  );
}

export default App; // Exporting App component
