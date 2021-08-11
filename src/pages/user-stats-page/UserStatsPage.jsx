import React, { useState, useEffect } from "react";
import "./UserStatsPageStyles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserFromDb,
  setHighestScore,
} from "../../features/users/userDataSlice";
import "./UserStatsPageStyles.scss";
import DarkBtn from "../../components/buttons/DarkBtn";

const UserStatsPage = () => {
  const dispatch = useDispatch();
  const [numberOfScoresToShow, setNumberOfScoresToShow] = useState(2);

  const authUserId = useSelector(
    (state) => state.persistedReducer.auth.authInfo.uid
  );
  const currentScore = useSelector(
    (state) => state.persistedReducer.score.currentScore
  );
  const scores = useSelector((state) => state.persistedReducer.userData.scores);

  const max = scores.reduce(function (prev, current) {
    return prev.y > current.y ? prev : current;
  });
  const numberOfQuizzes = useSelector(
    (state) => state.persistedReducer.userData.numQuizzes
  );
  const sum = scores.reduce((prev, next) => prev + next.score, 0);
  const average = sum / scores.length;

  useEffect(() => {
    dispatch(getUserFromDb(authUserId));
    if (max.score <= currentScore) {
      dispatch(
        setHighestScore({ uid: authUserId, highestScore: currentScore })
      );
    }
    // console.log(sum);
    // console.log(average);

    // console.log(max);
    // console.log(numberOfQuizzes);
  }, []);

  return (
    <div className="user-stats-page">
      <h1>User Stats</h1>
      <div className="scores-container">
        <p>
          <strong>Number of quizzes:</strong> {numberOfQuizzes}{" "}
        </p>
        <p>
          <strong>average score: </strong>
          {average.toFixed(2)}
        </p>
        <h2>Recent Scores: </h2>
        {scores
          .slice(1, scores.length)
          .slice(0, numberOfScoresToShow)
          .map((item) => (
            <div className="score">
              {item.score < 0 ? (
                <p style={{ color: "red" }}>{item.score}</p>
              ) : item.score === 0 ? (
                <p style={{ color: "yellow" }}>{item.score}</p>
              ) : (
                <p style={{ color: "green" }}>{item.score}</p>
              )}
            </div>
          ))}
        {numberOfScoresToShow >= scores.length ? (
          <DarkBtn onClick={() => setNumberOfScoresToShow(2)}>
            Show Less
          </DarkBtn>
        ) : (
          <DarkBtn onClick={() => setNumberOfScoresToShow(scores.length)}>
            Show All
          </DarkBtn>
        )}
      </div>
    </div>
  );
};

export default UserStatsPage;
