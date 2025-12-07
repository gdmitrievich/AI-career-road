import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import StartPage from './components/SkillMapGenerator/StartPage';
import RoadmapPage from './components/RoadmapPage/RoadmapPage';
import SignUpPage from './components/Auth/SignUpPage';
import LoginPage from './components/Auth/LoginPage';
import ProfilePage from './components/Profile/ProfilePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;