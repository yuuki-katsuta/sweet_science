import { lazy } from 'react';
const Privacy = lazy(() => import('../components/pages/Privacy'));
const Terms = lazy(() => import('../components/pages/Terms'));
const Home = lazy(() => import('../components/pages/Home'));
const ChatPage = lazy(() => import('../components/pages/ChatPage'));
const Profile = lazy(() => import('../components/pages/Profile'));
const About = lazy(() => import('../components/pages/About'));
const Feedback = lazy(() => import('../components/pages/Feedback'));
const Schedule = lazy(() => import('../components/pages/Schedule'));
const UserScores = lazy(() => import('../components/pages/UserScores'));

const routes = [
  { path: '/', component: Home },
  { path: '/chat/:id', component: ChatPage },
  { path: '/profile', component: Profile },
  { path: '/about', component: About },
  { path: '/feedback', component: Feedback },
  { path: '/schedule', component: Schedule },
  { path: '/chat/:id/scores', component: UserScores },
  { path: '/terms', component: Terms },
  { path: '/privacy', component: Privacy },
];
export default routes;
