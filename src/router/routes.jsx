import Home from '../components/pages/Home';
import ChatPage from '../components/pages/ChatPage';
import Profile from '../components/pages/Profile';
import About from '../components/pages/About';
import Feedback from '../components/pages/Feedback';
import Schedule from '../components/pages/Schedule';
import UserScores from '../components/pages/UserScores';

const routes = [
  { path: '/', component: Home },
  { path: '/chat/:id', component: ChatPage },
  { path: '/chat/:id/scores', component: UserScores },
  { path: '/profile', component: Profile },
  { path: '/about', component: About },
  { path: '/schedule', component: Schedule },
  { path: '/feedback', component: Feedback },
];
export default routes;
