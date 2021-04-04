import Home from '../components/Home';
import Chat from '../components/Chat';
import Profile from '../components/Profile/Profile';
import About from '../components/About';

const routes = [
  { path: '/', component: Home },
  { path: '/chat/:id', component: Chat },
  { path: '/profile', component: Profile },
  { path: '/about', component: About },
];
export default routes;
