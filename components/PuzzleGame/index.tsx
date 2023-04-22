import React, { useState, useEffect } from "react";
import styles from "./PuzzleGame.module.css";

const CURRENT_WEEK = process.env.NEXT_PUBLIC_CURRENT_WEEK || 1;

const isSolved = (puzzle: (number | null)[]) => {
  return puzzle.every((item, index) => {
    return item === index + 1 || item === null;
  });
};

function shufflePuzzle(): (number | null)[] {
  const arr: (number | null)[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  arr[Math.random() * 9] = null;
  const shuffledArr = [...arr]; // create a copy of the original array
  for (let i = shuffledArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  }
  return shuffledArr;
}

export const PuzzleGame = () => {
  const [puzzle, setPuzzle] = useState(shufflePuzzle());

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
  console.log("style", `url(/puzzle/week-${CURRENT_WEEK}/${1})`);
  return (
    <div className={styles.puzzleContainer}>
      {puzzle.map((item, index) => (
        <div
          key={index}
          style={{
            ["background-image" as any]:
              item !== null
                ? `url(/puzzle/week-${CURRENT_WEEK}/${item}.png)`
                : null,
          }}
          className={`puzzle-item-${index + 1} ${
            item === null ? "puzzle-item-empty" : ""
          } ${styles.puzzleItem}`}
          onClick={() => handlePuzzleClick(index)}
        >
          {/* // todo: remove this item number before production */}
          {item}
        </div>
      ))}
    </div>
  );
};
