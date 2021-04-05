import Home from '../components/Home';
import Chat from '../components/Chat';
import Profile from '../components/Profile/Profile';
import About from '../components/About';
import Page404 from '../components/Page404';

const routes = [
  { path: '/', component: Home },
  { path: '/chat/:id', component: Chat },
  { path: '/profile', component: Profile },
  { path: '/about', component: About },
  { path: '*', component: Page404, status: 404 },
];
export default routes;
