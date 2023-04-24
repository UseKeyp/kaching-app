import React, { useState, useEffect } from "react";
import { Image } from "@chakra-ui/react";
import styles from "./PuzzleGame.module.css";

const CURRENT_WEEK = process.env.NEXT_PUBLIC_CURRENT_WEEK || 1;

const DEFAULT_PUZZLE_STATE = [1, 2, 3, 4, 5, 6, 7, 8, null];

type PuzzleGame = (number | null)[];

type GameLog = {
  puzzleState: PuzzleGame;
  moveTimeStamp: string;
  moveNumber: number;
};

const isSolved = (puzzle: PuzzleGame) => {
  return puzzle.every((item: number | null, index: number) => {
    return item === index + 1 || item === null;
  });
};

function shufflePuzzle(): PuzzleGame {
  const shuffledPuzzle = [...DEFAULT_PUZZLE_STATE]; // create a copy of the original array
  for (let i = shuffledPuzzle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledPuzzle[i], shuffledPuzzle[j]] = [
      shuffledPuzzle[j],
      shuffledPuzzle[i],
    ];
  }
  return shuffledPuzzle;
}

export const PuzzleGame = () => {
  const [puzzle, setPuzzle] = useState(DEFAULT_PUZZLE_STATE);
  const [isStarted, setIsStarted] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [gameLog, setGameLog] = useState<GameLog[]>([]);
  const [moveNumber, setMoveNumber] = useState(0);
  const [shuffleCount, setShuffleCount] = useState(0);

  useEffect(() => {
    if (isShuffling) {
      const newPuzzle = randomMove([...puzzle]);
      setPuzzle(newPuzzle);
      setShuffleCount(shuffleCount + 1);
      if (shuffleCount > 1000) {
        setIsShuffling(false);
        setIsStarted(true);
      }
    }
  }, [shuffleCount]);

  const startGame = async () => {
    setIsShuffling(true);
    setShuffleCount(1);
    // let shuffleCount = 0;
    // let puzzleCopy = [...puzzle];
    // while (shuffleCount < 100) {
    //   puzzleCopy = randomMove(puzzleCopy);
    //   setPuzzle(puzzleCopy);
    //   shuffleCount++;
    //   // pause for 5 mili seconds
    //   await new Promise((resolve) => setTimeout(resolve, 50));
    // }
    // setPuzzle(puzzleCopy);
    // setIsShuffling(false);
    // setIsStarted(true);
  };

  const randomMove = (puzzleCopy: PuzzleGame): PuzzleGame => {
    const nullIndex = puzzleCopy.indexOf(null);
    let possibleMoves = [-1, 1, -3, 3];
    console.log(
      "Math.floor(Math.random() * 4)]",
      Math.floor(Math.random() * 4)
    );
    let moveIndex = nullIndex;

    if (nullIndex === 0) {
      possibleMoves = [1, 3];
    } else if (nullIndex === 1) {
      possibleMoves = [-1, 1, 3];
    } else if (nullIndex === 2) {
      possibleMoves = [-1, 3];
    } else if (nullIndex === 3) {
      possibleMoves = [-3, 1, 3];
    } else if (nullIndex === 4) {
      possibleMoves = [-3, -1, 1, 3];
    } else if (nullIndex === 5) {
      possibleMoves = [-3, -1, 3];
    } else if (nullIndex === 6) {
      possibleMoves = [-3, 1];
    } else if (nullIndex === 7) {
      possibleMoves = [-3, -1, 1];
    } else if (nullIndex === 8) {
      possibleMoves = [-3, -1];
    }

    moveIndex =
      nullIndex +
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    console.log("moveIndex", moveIndex);

    [puzzleCopy[moveIndex], puzzleCopy[nullIndex]] = [
      puzzleCopy[nullIndex],
      puzzleCopy[moveIndex],
    ];
    return puzzleCopy;
  };

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
      setMoveNumber(moveNumber + 1);
      setPuzzle(puzzleCopy);
      setGameLog([
        ...gameLog,
        {
          moveTimeStamp: Date.now().toLocaleString(),
          moveNumber: moveNumber + 1,
          puzzleState: [...puzzleCopy],
        },
      ]);
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
  console.log("puzzle: ", puzzle);
  return (
    <div className={styles.puzzle}>
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
        {!isStarted && (
          <div className={styles.puzzleOverlay}>
            {isShuffling ? (
              <Image src="keyp_spinner.svg" alt="" w="4rem" />
            ) : (
              <button className={styles.startButton} onClick={startGame}>
                Start Game
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
