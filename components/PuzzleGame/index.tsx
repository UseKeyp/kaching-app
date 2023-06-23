import React, { useState, useEffect } from "react";
import { Image, HStack, Flex } from "@chakra-ui/react";
import styles from "./PuzzleGame.module.css";
import { useFormContext } from "../../context/FormContext";
import { useSession } from "next-auth/react";
import Sparkles from "react-sparkle";
import { TypeAnimation } from "react-type-animation";
import { writeContract } from "@usekeyp/js-sdk";
import { useRouter } from 'next/router';

const CURRENT_WEEK = 1;

const NOT_MINTED = "NOT_MINTED";
const SUCCESS = "SUCCESS";
const ERROR = "ERROR";

const DEFAULT_PUZZLE_STATE = [1, 2, 3, 4, 5, 6, 7, 8, null];

const SHUFFLES_COUNT = process.env.NEXT_PUBLIC_DEV_MODE === "true" ? 1 : 1000;

type PuzzleGame = (number | null)[];

type GameLog = {
  puzzleState: PuzzleGame;
  moveTimeStamp: number;
  moveNumber: number;
};



export const PuzzleGame = () => {
  const router = useRouter();
  const { query } = router;

  const [displayStartScreen, setDisplayStartScreen] = useState<boolean>(true);
  const [puzzle, setPuzzle] = useState<PuzzleGame>(DEFAULT_PUZZLE_STATE);
  const [shufflingPuzzle, setShufflingPuzzle] =
    useState<PuzzleGame>(DEFAULT_PUZZLE_STATE);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [mintingStatus, setMintingStatus] = useState<string>(NOT_MINTED);
  const [mintTxhash, setMintTxHash] = useState<string>("");
  const [mintErrorMessage, setMintErrorMessage] = useState<string>("");
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [pendingMint, setPendingMint] = useState<boolean>(false);
  const [isMintingScreen, setIsMintingScreen] = useState<boolean>(true);
  const [isShuffling, setIsShuffling] = useState(false);
  const [gameLog, setGameLog] = useState<GameLog[]>([]);
  const [moveNumber, setMoveNumber] = useState<number>(0);
  const [shuffleCount, setShuffleCount] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const { setType } = useFormContext();
  const { data: session } = useSession();
  const address = session && session.user.address;

  const checkIsSolved = (puzzle: PuzzleGame) => {
    if (!!router.query.solved) return true
    return puzzle.every((item: number | null, index: number) => {
      return item === index + 1 || item === null;
    });
  };
  useEffect(() => {
    const isPuzzleSolved = checkIsSolved(puzzle);

    if (isStarted && isPuzzleSolved) {
      setIsStarted(false);
      setIsSolved(true);
      setIsStarted(false);
    }
  }, [puzzle]);

  useEffect(() => {
    if (isShuffling) {
      const newShufflingPuzzle = randomMove([...shufflingPuzzle]);
      setShufflingPuzzle(newShufflingPuzzle);
      setShuffleCount(shuffleCount + 1);
      if (shuffleCount > SHUFFLES_COUNT) {
        setIsShuffling(false);
        setIsStarted(true);
        setPuzzle(shufflingPuzzle);
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
    setDisplayStartScreen(false);
    setIsMintingScreen(false);
    setMintingStatus(NOT_MINTED);
  };

  const handleMintNFT = async () => {
    setIsMintingScreen(true);
    setPendingMint(true);
    try {
      const result = await writeContract({
        accessToken: session?.user.accessToken,
        address: process.env.NEXT_PUBLIC_PUZZLE_NFT_ADDRESS || "",
        abi: "mint(address,uint256)",
        args: [address || "", '1'],
        value: "0",
      });

      if (result.status === "SUCCESS") {
        setMintingStatus(SUCCESS);
        setMintTxHash(result.hash || "");
      } else {
        setMintingStatus(ERROR);
        setMintErrorMessage(result.error || "");
        console.error(`There was an error with the mint: ${result.error}`);
      }
      setPendingMint(false);
    } catch (e: any) {
      setPendingMint(false);
      setMintingStatus(ERROR);
      setMintErrorMessage("");
      console.error("There was an error with the writeContract call to mint");
    }
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

  const getCornerClassName = (index: number): string => {
    if (index === 0) {
      return styles.puzzleItemTopLeft;
    } else if (index === 2) {
      return styles.puzzleItemTopRight;
    } else if (index === 6) {
      return styles.puzzleItemBottomLeft;
    } else if (index === 8) {
      return styles.puzzleItemBottomRight;
    }
    return "";
  };

  const renderPuzzleOverlay = () => {
    if (displayStartScreen) {
      return (
        <div
          className={styles.puzzleOverlay}
          style={{ backgroundColor: "rgb(255 255 255 / 0%)" }}
        >
          {isShuffling ? (
            <Image src="keyp_spinner.svg" alt="" w="4rem" />
          ) : (
            <button className={styles.startButton} onClick={startGame}>
              Start Game
            </button>
          )}
        </div>
      );
    }
    if (isMintingScreen) {
      return (
        <div className={styles.mintingOverlay}>
          <div className={styles.mintingTop}>
            <Image
              className={styles.mintingImage}
              src="puzzle/nft-image-sm.png"
              alt="a console game controller"
            />
            <div className={styles.mintingTopText}>
              <TypeAnimation
                sequence={["We're airdropping the NFT into your wallet.", 1000]}
                speed={50}
                className={styles.mintingHeading}
                repeat={Infinity}
              />
              {pendingMint && (
                <p className={styles.mintingSubheading}>
                  <Image src="keyp_spinner.svg" alt="" w="1rem" mr="0.5rem" />{" "}
                  This might take a minute.
                </p>
              )}
              {mintingStatus === SUCCESS && (
                <HStack>
                  <span className={styles.viewTransactionText}>
                    View transaction{" "}
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={`https://${
                        process.env.NEXT_PUBLIC_NETWORK === "polygon"
                          ? "polygonscan.com"
                          : "mumbai.polygonscan.com"
                      }/tx/${mintTxhash}`}
                    >
                      here
                    </a>
                  </span>
                </HStack>
              )}
              {mintingStatus === ERROR && (
                <HStack>
                  <span className={styles.errorMessageText}>
                    Whoops! Something went wrong. 
                  </span>
                </HStack>
              )}
            </div>
          </div>
          <div className={styles.mintingBottom}>
            <button
              className={styles.overlayButton}
              onClick={() => setType("wallet")}
            >
              Go to Wallet
            </button>
            <button className={styles.overlayButton} onClick={startGame}>
              Play Again
            </button>
          </div>
        </div>
      );
    }
    if (isSolved) {
      return (
        <div className={styles.puzzleOverlay}>
          <Sparkles />
          <div className={styles.puzzleSolvedPanel}>
            <h3 className={styles.overlayHeading}>You solved the puzzle!</h3>
            <button className={styles.mintNFTButton} onClick={handleMintNFT}>
              Mint NFT
            </button>
            <button className={styles.startButton} onClick={startGame}>
              Play Again
            </button>
          </div>
          <Flex width="100%" direction="column" justify="end">
            <HStack p="8" justify="space-between">
              <p className={styles.overlayText}>{getGameTime()} minutes</p>
              <p className={styles.overlayText}>{gameLog.length} moves</p>
            </HStack>
          </Flex>
        </div>
      );
    }
  };

  return (
    <div className={styles.puzzle}>
      <div className={styles.puzzleContainer}>
        {puzzle.map((item, index) => (
          <div
            key={index}
            style={{
              ["backgroundImage" as any]: `url(/puzzle/week-${CURRENT_WEEK}/${
                // when puzzle is solved (start screen and end screen) display the entire solved puzzle with the missing piece
                item === null && checkIsSolved(puzzle) ? index + 1 : item
              }.png)`,
            }}
            className={`puzzle-item-${index + 1} ${
              item === null && !checkIsSolved(puzzle) ? "puzzle-item-empty" : ""
            } ${styles.puzzleItem} ${getCornerClassName(index)}`}
            onClick={() => handlePuzzleClick(index)}
          ></div>
        ))}
        {renderPuzzleOverlay()}
      </div>
    </div>
  );
};
