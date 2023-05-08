import React, {FC, useEffect} from 'react';
import {Layout} from 'antd';
import Navbar from './components/Navbar';
import AppRoutes from './router/AppRoutes';
import {useActions} from './hooks/useActions';
import {IUser} from './models/IUser';
import './App.css';

const App: FC = () => {
  const {setIsAuth, setUser} = useActions();

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
      setUser({username: localStorage.getItem('username' || '')} as IUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Navbar />
      <Layout.Content>
        <AppRoutes />
      </Layout.Content>
    </Layout>
  );
};

export default App;