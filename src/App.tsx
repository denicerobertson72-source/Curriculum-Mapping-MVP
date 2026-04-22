import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ProgramsList from './pages/ProgramsList';
import ProgramDetail from './pages/ProgramDetail';
import ProgramSLOs from './pages/ProgramSLOs';
import CoursesList from './pages/CoursesList';
import CourseDetail from './pages/CourseDetail';
import CurriculumMap from './pages/CurriculumMap';
import GapReport from './pages/GapReport';
import TopicsList from './pages/TopicsList';
import TopicPlaceholder from './pages/TopicPlaceholder';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/"                        element={<Dashboard />} />
        <Route path="/programs"                element={<ProgramsList />} />
        <Route path="/programs/:id"            element={<ProgramDetail />} />
        <Route path="/programs/:id/slos"       element={<ProgramSLOs />} />
        <Route path="/courses"                 element={<CoursesList />} />
        <Route path="/courses/:id"             element={<CourseDetail />} />
        <Route path="/map"                     element={<CurriculumMap />} />
        <Route path="/reports"                 element={<GapReport />} />
        <Route path="/topics"                  element={<TopicsList />} />
        <Route path="/topics/:id"              element={<TopicPlaceholder />} />
        <Route path="*"                        element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
