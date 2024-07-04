import { Routes, Route, Navigate } from 'react-router-dom';
// import { NotFound } from './pages/error/NotFound';
import { AppLayout } from './pages/layouts/app';
import { AuthLayout } from './pages/layouts/auth';
import { Feedback } from './pages/app/feedback';
import { AdminLayout } from './pages/layouts/admin';
import { Admin } from './pages/app/admin/dashboard';
import { PullRequests } from './pages/app/admin/pull-requests';
import { Home } from './pages/app/home';
import { SignIn } from './pages/auth/sign-in';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { Loading } from './components/loading';
import { NotFound } from './pages/error/NotFound';
import { NotAuthorized } from './pages/error/NotAuthorized';
import { InDevelopment } from './pages/error/InDevelopment';

export function Router() {
  const { loading, user } = useContext(AuthContext)
  if(loading) {
    return (<Loading/>)
  }

  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route path='' element={<Home />} />
      </Route>

      <Route path='/login' element={<AuthLayout />}>
        <Route path='' element={<SignIn />} />
      </Route>

      <Route path='/feedback' element={<Feedback />} />

      <Route 
        path='/admin' 
        element={
          <ProtectedRoute user={user} >
            <AdminLayout />
          </ProtectedRoute>
        }>
        <Route path='' element={<Admin />} />
        <Route path='pr' element={<PullRequests />} />
      </Route>
      

      <Route path='/401' element={<NotAuthorized />} />
      <Route path='/in-development' element={ <InDevelopment /> } />
      <Route path='*' element={ <NotFound /> } />
    </Routes>
  )
}

function ProtectedRoute({ user, children }: any) {
  if (!user) {
    return <Navigate to="/401" replace />;
  }

  return children;
};
