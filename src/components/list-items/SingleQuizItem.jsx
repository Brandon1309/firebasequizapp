import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import he from "he";
import { useDispatch, useSelector } from "react-redux";
import {
  activateDisabledBtns,
  addToScore,
  deductFromScore,
  setAnswerCorrect,
  setAnswerWrong,
} from "../../features/score/scoreSlice";
import QuizAnswerBtn from "../buttons/QuizAnswerBtn";
import "../../pages/quiz-page/QuizPageStyles.scss";
const SingleQuizItem = ({
  catagory,
  type,
  difficulty,
  question,
  correct,
  possible,
}) => {
  const dispatch = useDispatch();
  const [shuffledArray, setShuffledArray] = useState([]);
  //   const [correct, setCorrect] = useState("");
  const [selectedAns, setSelectedAns] = useState("");
  // const [isDisabled, setIsDisabled] = useState(false);

  const [answerResult, setAnswerResult] = useState("");
  // const [resultInorrect, setResultInorrect] = useState("Incorrect");
  const isDisabled = useSelector(
    (state) => state.persistedReducer.score.isDisabled
  );

  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const combinedPossible = () => {
    const allPossible = [];
    allPossible.push(correct);
    possible.forEach((item) => {
      allPossible.push(item);
    });
    const shuffled = shuffle(allPossible);
    return shuffled;
  };

  const setSelectedAnswer = (ansClicked) => {
    setSelectedAns(ansClicked);
    if (he.decode(ansClicked) === he.decode(correct)) {
      console.log("Correct!");
      // dispatch(setAnswerCorrect());
      setAnswerResult("Correct");
      dispatch(addToScore());
      dispatch(activateDisabledBtns());
    } else {
      console.log("wrong");
      setAnswerResult("Incorrect");
      // dispatch(setAnswerWrong());
      dispatch(deductFromScore());
      dispatch(activateDisabledBtns());
    }
  };

  useEffect(() => {
    setShuffledArray(combinedPossible());
    // question && console.log(shuffledArray);
  }, [question]);
  return (
    <div>
      <p className="question">{question}</p>
      {type === "boolean" && !isDisabled ? (
        <>
          <div>&nbsp;</div>
          <div className="answers-section">
            <QuizAnswerBtn onClick={() => setSelectedAnswer(shuffledArray[0])}>
              {shuffledArray[0]}
            </QuizAnswerBtn>
            <QuizAnswerBtn onClick={() => setSelectedAnswer(shuffledArray[1])}>
              {shuffledArray[1]}
            </QuizAnswerBtn>
            {/* <hr /> */}
          </div>
        </>
      ) : type === "boolean" && isDisabled ? (
        <>
          {answerResult === "Correct" ? (
            <p className="answer-res" style={{ color: "#50CB93" }}>
              {answerResult}! +10
            </p>
          ) : answerResult === "Incorrect" ? (
            <p className="answer-res" style={{ color: "#BD1616" }}>
              {answerResult}. -20
            </p>
          ) : (
            <>
              <div>&nbsp;</div>
            </>
          )}
          <div className="answers-section">
            <QuizAnswerBtn
              disabled
              onClick={() => setSelectedAnswer(shuffledArray[0])}
            >
              {shuffledArray[0]}
            </QuizAnswerBtn>
            <QuizAnswerBtn
              disabled
              onClick={() => setSelectedAnswer(shuffledArray[1])}
            >
              {shuffledArray[1]}
            </QuizAnswerBtn>
            {/* <hr /> */}
          </div>
        </>
      ) : type === "multiple" && !isDisabled ? (
        <>
          <div>&nbsp;</div>
          <div className="answers-section">
            <QuizAnswerBtn
              onClick={() => setSelectedAnswer(he.decode(shuffledArray[0]))}
            >
              {shuffledArray[0]}
            </QuizAnswerBtn>
            <QuizAnswerBtn
              onClick={() => setSelectedAnswer(he.decode(shuffledArray[1]))}
            >
              {shuffledArray[1]}
            </QuizAnswerBtn>
            <QuizAnswerBtn
              onClick={() => setSelectedAnswer(he.decode(shuffledArray[2]))}
            >
              {shuffledArray[2]}
            </QuizAnswerBtn>
            <QuizAnswerBtn
              onClick={() => setSelectedAnswer(he.decode(shuffledArray[3]))}
            >
              {shuffledArray[3]}
            </QuizAnswerBtn>
            {/* <hr /> */}
          </div>
        </>
      ) : type === "multiple" && isDisabled ? (
        <>
          {answerResult === "Correct" ? (
            <p className="answer-res" style={{ color: "#50CB93" }}>
              {answerResult}! +10
            </p>
          ) : answerResult === "Incorrect" ? (
            <p className="answer-res" style={{ color: "#BD1616" }}>
              {answerResult}. -20
            </p>
          ) : (
            <div>&nbsp;</div>
          )}

          <>
            <div className="answers-section">
              <QuizAnswerBtn
                disabled
                onClick={() => setSelectedAnswer(he.decode(shuffledArray[0]))}
              >
                {shuffledArray[0]}
              </QuizAnswerBtn>
              <QuizAnswerBtn
                disabled
                onClick={() => setSelectedAnswer(he.decode(shuffledArray[1]))}
              >
                {shuffledArray[1]}
              </QuizAnswerBtn>
              <QuizAnswerBtn
                disabled
                onClick={() => setSelectedAnswer(he.decode(shuffledArray[2]))}
              >
                {shuffledArray[2]}
              </QuizAnswerBtn>
              <QuizAnswerBtn
                disabled
                onClick={() => setSelectedAnswer(he.decode(shuffledArray[3]))}
              >
                {shuffledArray[3]}
              </QuizAnswerBtn>
              {/* <hr /> */}
            </div>
          </>
        </>
      ) : (
        <p>There was an error</p>
      )}
    </div>
  );
};

export default SingleQuizItem;
