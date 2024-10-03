
import { Navbar } from '@/components/navbar/index'
// src/routes.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import App from './App';
import Dashboard from '@/pages/Main/dashboard/index';
import JobScheduling from '@/pages/Main/jobscheduling/index';
import JobScrapeList from '@/pages/Main/jobscrapelist/index';
// import About from './pages/About';
import NotFound from '@/pages/Notfound';

// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from './store';
// import { increment, decrement } from './slices/counterSlice';

const App: React.FC = () => {
  // const count = useSelector((state: RootState) => state.counter.value);
  // const dispatch = useDispatch();

  return (
    <div className="bg-gray-500">
      <Router>
      <Navbar />
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/JobScheduling" element={<JobScheduling />} />
        <Route path="/JobScrapeList" element={<JobScrapeList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
      {/* <div className="bg-green-300 h-16">bottombar</div> */}
    </div>
  );
};

export default App
