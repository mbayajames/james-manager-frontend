// src/routes.js
import Dashboard from './pages/Dashboard';
import Assignment from './pages/Assignment';
import CreateAssignment from './pages/CreateAssignment';
import Submissions from './pages/Submissions';
import Login from './pages/Login';
import UserManagement from './pages/UserManagement';
import SubmitAssignment from './pages/SubmitAssignment';
import Calendar from './pages/Calendar';
import Pages from './pages/pages';
import Profile from './pages/Profile';

export const routes = [
  { path: '/login', component: Login, protected: false },
  { path: '/', component: Dashboard, protected: true },
  { path: '/assignment', component: Assignment, protected: true },
  { path: '/create-assignment', component: CreateAssignment, protected: true },
  { path: '/submissions', component: Submissions, protected: true },
  { path: '/user-management', component: UserManagement, protected: true },
  { path: '/submit-assignment', component: SubmitAssignment, protected: true },
  { path: '/calendar', component: Calendar, protected: true },
  { path: '/pages', component: Pages, protected: true },
  { path: '/profile', component: Profile, protected: true },
];