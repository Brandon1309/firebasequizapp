import "./App.scss";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/home-page/HomePage";
import Navbar from "./components/navbar/Navbar";
import QuizPage from "./pages/quiz-page/QuizPage";
// import CreatePage from "./pages/create-page/CreatePage";
import LeaderboardPage from "./pages/leaderboard-page/LeaderboardPage";
import SignInPage from "./pages/sign-in-page/SignInPage";
import SignUpPage from "./pages/sign-up-page/SignUpPage";
import UserStatsPage from "./pages/user-stats-page/UserStatsPage";
import UserSettingsPage from "./pages/user-settings-page/UserSettingsPage";
import ChangePasswordPage from "./pages/change-password-page/ChangePasswordPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/signIn" component={SignInPage} />
        <Route exact path="/signUp" component={SignUpPage} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/quiz" component={QuizPage} />
        {/* <Route exact path="/create" component={CreatePage} /> */}
        <Route exact path="/leaderboard" component={LeaderboardPage} />
        <Route exact path="/userStats/:userId" component={UserStatsPage} />
        <Route
          exact
          path="/userSettings/:userId"
          component={UserSettingsPage}
        />
        <Route
          exact
          path="/userSettings/:userId/ChangePasswordPage"
          component={ChangePasswordPage}
        />
      </Switch>
    </div>
  );
}

export default App;
