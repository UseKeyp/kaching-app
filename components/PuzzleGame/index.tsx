import React, { useState, useEffect } from "react";
import { Image } from "@chakra-ui/react";
import styles from "./PuzzleGame.module.css";

const CURRENT_WEEK = process.env.NEXT_PUBLIC_CURRENT_WEEK || 1;

const DEFAULT_PUZZLE_STATE = [1, 2, 3, 4, 5, 6, 7, 8, null];

type PuzzleGame = (number | null)[];

type GameLog = {
  puzzleState: PuzzleGame;
  moveTimeStamp: number;
  moveNumber: number;
};

const checkIsSolved = (puzzle: PuzzleGame) => {
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
  const [puzzle, setPuzzle] = useState<PuzzleGame>(DEFAULT_PUZZLE_STATE);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [gameLog, setGameLog] = useState<GameLog[]>([]);
  const [moveNumber, setMoveNumber] = useState<number>(0);
  const [shuffleCount, setShuffleCount] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    const isPuzzleSolved = checkIsSolved(puzzle);

    if (isStarted && isPuzzleSolved) {
      setIsStarted(false);
      const moves = gameLog.length;
      setIsSolved(true);
      setIsStarted(false);
    }
  }, [puzzle]);

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
    setIsSolved(false);
    setIsStarted(true);
    setGameLog([]);
    setStartTime(Date.now());
  };

  const getPossibleMoves = (nullIndex: number): number[] => {
    let possibleMoves: number[] = [];
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
    return possibleMoves;
  };

  const randomMove = (puzzleCopy: PuzzleGame): PuzzleGame => {
    const nullIndex = puzzleCopy.indexOf(null);
    const possibleMoves = getPossibleMoves(nullIndex);
    const moveIndex =
      nullIndex +
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

    [puzzleCopy[moveIndex], puzzleCopy[nullIndex]] = [
      puzzleCopy[nullIndex],
      puzzleCopy[moveIndex],
    ];
    return puzzleCopy;
  };

  const getGameTime = () => {
    if (gameLog.length === 0) {
      return "0:00";
    }
    const endTime = gameLog[gameLog.length - 1].moveTimeStamp;
    const timeDiff =
      new Date(endTime).getTime() - new Date(startTime).getTime();
    console.log(`timeDiff: ${timeDiff}`);
    const minutes = Math.floor(timeDiff / 1000 / 60);
    const seconds = Math.floor(timeDiff / 1000) % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handlePuzzleClick = (index: number) => {
    const nullIndex = puzzle.indexOf(null);
    const puzzleCopy = [...puzzle];
    const possibleMoves = getPossibleMoves(nullIndex);
    if (
      index === nullIndex ||
      !possibleMoves.find((move) => nullIndex + move === index)
    ) {
      return;
    }

    [puzzleCopy[index], puzzleCopy[nullIndex]] = [
      puzzleCopy[nullIndex],
      puzzleCopy[index],
    ];
    setMoveNumber(moveNumber + 1);
    setPuzzle(puzzleCopy);
    setGameLog([
      ...gameLog,
      {
        moveTimeStamp: Date.now(),
        moveNumber: moveNumber + 1,
        puzzleState: [...puzzleCopy],
      },
    ]);
  };
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
            <span className={styles.puzzleItemText}>{item}</span>
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
        {isSolved && (
          <div className={styles.puzzleOverlay}>
            <div className={styles.puzzleSolvedPanel}>
              <h3 className={styles.heading}>
                You solved the puzzle in {gameLog.length} moves!
              </h3>
              <span className={styles.puzzleTime}>Time: {getGameTime()}</span>
              <button className={styles.mintNFT}>
                Mint your Special Keyp NFT
              </button>
              <button className={styles.startButton} onClick={startGame}>
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
