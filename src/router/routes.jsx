import Home from '../components/Home';
import Chat from '../components/Chat';
import Profile from '../components/Profile/Profile';
import About from '../components/About';
import Page404 from '../components/Page404';
import Feedback from '../components/Feedback';

const routes = [
  { path: '/', component: Home },
  { path: '/chat/:id', component: Chat },
  { path: '/profile', component: Profile },
  { path: '/about', component: About },
  { path: '/feedback', component: Feedback },
  { path: '*', component: Page404, status: 404 },
];
export default routes;
