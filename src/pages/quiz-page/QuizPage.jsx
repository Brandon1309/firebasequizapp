import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionSet } from "../../features/quizData/quizDataSlice";
import "./QuizPageStyles.scss";
import he from "he";
import SingleQuizItem from "../../components/list-items/SingleQuizItem";
import { v4 as uuidv4 } from "uuid";
import {
  activateDisabledBtns,
  deactivateDisabledBtns,
  resetScore,
} from "../../features/score/scoreSlice";
import {
  addScoreToUserInDb,
  incrementNumOfQuizzes,
} from "../../features/users/userDataSlice";
import { Link, Redirect } from "react-router-dom";
import { getUserFromDb } from "../../features/users/userDataSlice";
import DarkBtn from "../../components/buttons/DarkBtn";

const QuizPage = () => {
  const dispatch = useDispatch();

  const [quizStarted, setQuizStarted] = useState(false);
  // change this back to 0 once done testing
  const [questIndex, setQuestIndex] = useState(0);
  const [currentScoreColor, setCurrentScoreColor] = useState("white");

  const handleStartClick = () => {
    setQuizStarted(true);
    // change this back to 0 once done testing
    setQuestIndex(0);
    dispatch(getQuestionSet());
    dispatch(resetScore());
    dispatch(deactivateDisabledBtns());
  };

  const allQuestions = useSelector((state) => state.quizData.allQuestions);
  const authUserId = useSelector(
    (state) => state.persistedReducer.auth.authInfo.uid
  );
  const currentScore = useSelector(
    (state) => state.persistedReducer.score.currentScore
  );
  const isAuth = useSelector(
    (state) => state.persistedReducer.auth.authInfo.isAuthenticated
  );
  const isDisabled = useSelector(
    (state) => state.persistedReducer.score.isDisabled
  );

  useEffect(() => {
    dispatch(getUserFromDb(authUserId));

    if (quizStarted) {
      allQuestions && console.log(allQuestions[0]);
    }
  }, []);

  useEffect(() => {
    if (currentScore < 0) {
      setCurrentScoreColor("#BD1616");
    } else if (currentScore > 0) {
      setCurrentScoreColor("#50CB93");
    } else {
      setCurrentScoreColor("black");
    }
  }, [currentScore]);

  const handleNextBtnClick = () => {
    setQuestIndex(questIndex + 1);
    dispatch(deactivateDisabledBtns());
  };

  const handleGetScoreClick = () => {
    setQuizStarted(false);
    dispatch(
      addScoreToUserInDb({
        uid: authUserId,
        score: currentScore,
        quizId: uuidv4(),
      })
    );
    dispatch(incrementNumOfQuizzes(authUserId));
  };

  return (
    <div className="quiz-page">
      {isAuth ? (
        <>
          {/* <h1>Quiz Page</h1> */}
          <div className="score-and-completed">
            <p className="completed-quest">{questIndex} / 10</p>
            <p style={{ color: currentScoreColor }}>Score:{currentScore}</p>
          </div>
          {!quizStarted ? (
            <div className="quiz-start-section">
              <h2>Brandon's Quiz</h2>
              <DarkBtn onClick={handleStartClick}>Start Quiz</DarkBtn>
            </div>
          ) : (
            <></>
          )}

          {quizStarted && allQuestions.length !== 0 && questIndex < 10 ? (
            <>
              <SingleQuizItem
                catagory={allQuestions[questIndex].catagory}
                type={allQuestions[questIndex].type}
                difficulty={allQuestions[questIndex].difficulty}
                question={he.decode(allQuestions[questIndex].question)}
                correct={allQuestions[questIndex].correct_answer}
                possible={allQuestions[questIndex].incorrect_answers}
              />
              {isDisabled ? (
                <div className="next-btn-section">
                  <DarkBtn onClick={handleNextBtnClick}>Next</DarkBtn>
                </div>
              ) : (
                <></>
              )}
              {/* <p>{allQuestions[questIndex]}</p> */}
            </>
          ) : (
            <>
              {questIndex > 9 ? (
                <div className="end-section">
                  <h2>Quiz End</h2>
                  <Link to={`/userStats/${authUserId}`}>
                    <DarkBtn onClick={handleGetScoreClick}>
                      Get your score!
                    </DarkBtn>
                  </Link>
                </div>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      ) : (
        <Redirect to="/signIn" />
      )}
    </div>
  );
};

export default QuizPage;
