import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './components/SkillMapGenerator/StartPage';
import RoadmapPage from './components/RoadmapPage/RoadmapPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;