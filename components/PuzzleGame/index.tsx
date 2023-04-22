import React, { useState, useEffect } from "react";
import styles from "./PuzzleGame.module.css";

const CURRENT_WEEK = process.env.NEXT_PUBLIC_CURRENT_WEEK || 1;

const isSolved = (puzzle: (number | null)[]) => {
  return puzzle.every((item, index) => {
    return item === index + 1 || item === null;
  });
};

export const PuzzleGame = () => {
  const [puzzle, setPuzzle] = useState([1, 2, 3, 4, 5, 6, 7, 8, null]);

  const handlePuzzleClick = (index: number) => {
    const nullIndex = puzzle.indexOf(null);
    const puzzleCopy = [...puzzle];

    if (index === nullIndex) {
      return;
    }

    if (
      index === nullIndex - 1 ||
      index === nullIndex + 1 ||
      index === nullIndex - 3 ||
      index === nullIndex + 3
    ) {
      [puzzleCopy[index], puzzleCopy[nullIndex]] = [
        puzzleCopy[nullIndex],
        puzzleCopy[index],
      ];
      setPuzzle(puzzleCopy);
    }
  };

  useEffect(() => {
    const isPuzzleSolved = isSolved(puzzle);

    if (isPuzzleSolved) {
      // alert("Congratulations, you solved the puzzle!");
      console.log("puzzle won", isPuzzleSolved, puzzle);
    }
  }, [puzzle]);
  // background: url('bgimage.jpg') no-repeat;
  // background-size: 100%;
  return (
    <div className={styles.puzzleContainer}>
      {puzzle.map((item, index) => (
        <div
          key={index}
          style={{ background: `url(/puzzle/week-${CURRENT_WEEK}/${index})` }}
          className={`puzzle-item-${index + 1} ${
            item === null ? "puzzle-item-empty" : ""
          } ${styles.puzzleItem}`}
          onClick={() => handlePuzzleClick(index)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
