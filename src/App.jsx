import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ZoneBlock from "./components/ZoneBlock";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";


import TodayZone from "./pages/TodayZone";
import History from "./pages/History";
import FutureGoal from "./pages/FutureGoal";
import ReflectionZone from "./pages/ReflectionZone";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />

        <Routes>
          {/* Homepage with 4 blocks */}
          <Route
            path="/"
            element={
              <div className="blocks-container">
                <ZoneBlock title="YOUR ZONE TODAY" page="/today-zone" />
                <ZoneBlock title="YOUR HISTORY" page="/history" />
                <ZoneBlock title="CREATE FUTURE GOAL" page="/future-goal" />
                <ZoneBlock title="REFLECTION ZONE" page="/reflection-zone" />
              </div>
            }
          />

          {/* Individual pages */}
          <Route path="/today-zone" element={<TodayZone />} />
          <Route path="/history" element={<History />} />
          <Route path="/future-goal" element={<FutureGoal />} />
          <Route path="/reflection-zone" element={<ReflectionZone />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
