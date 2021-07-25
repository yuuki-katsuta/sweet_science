import Home from '../components/Home';
import ChatPage from '../components/ChatPage';
import Profile from '../components/Profile/Profile';
import About from '../components/About';
import Feedback from '../components/Feedback';
import Schedule from '../components/Schedule';

const routes = [
  { path: '/', component: Home },
  { path: '/chat/:id', component: ChatPage },
  { path: '/profile', component: Profile },
  { path: '/about', component: About },
  { path: '/schedule', component: Schedule },
  { path: '/feedback', component: Feedback },
];
export default routes;
