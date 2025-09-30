import { Routes, Route } from 'react-router-dom';
import Hello from '../components/home/Hello';
import MainLayout from '../layouts/MainLayout';
import ProjectsPage from '../components/projects/ProjectsPage';
import CatView from '../components/catView/CatView';
import BackyardSquirrels from '../components/backyardSquirrels/BackyardSquirrels';
import CatFacts from '../components/catFacts/CatFacts';

/**
 * Application routes
 * - The `MainLayout` wraps the inner pages and renders the header + <Outlet />
 * - Index route renders `Hello`
 * - /Projects renders the projects page
 * - /CatView renders the cat carousel page
 *
 * Check `src/layouts/MainLayout.tsx` if you want to change where the
 * navigation or header lives.
 */
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />} >
                {/* index (/) */}
                <Route index element={<Hello />} />
                {/* /Projects */}
                <Route path="Projects" element={<ProjectsPage />} />
                {/* /CatView - the carousel page */}
                <Route path="CatView" element={<CatView />} />
                {/* /BackyardSquirrels - the carousel page */}
                <Route path="BackyardSquirrels" element={<BackyardSquirrels />} />
                {/* /uselessfacts - random facts */}
                <Route path="CatFacts" element={<CatFacts />} />
            </Route>
        </Routes>
    );
}
export default AppRoutes;