import React, {FC} from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {Layout, Menu, MenuProps, Row} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {RouteNames} from '../router';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {useActions} from '../hooks/useActions';
import {capitalize} from '../utils/rules';


const Navbar: FC = () => {
  const {isAuth, user} = useTypedSelector((state) => state.auth);
  const {logout} = useActions();
  const navigate = useNavigate();

  const handleLogIn = () => {
    navigate(RouteNames.LOGIN);
  };

  const handleLogout = () => {
    navigate(RouteNames.EVENT);
    logout();
  };

  const authItems: MenuProps['items'] = [
    {
      label: capitalize(user.username || ''),
      key: 'user',
      className: 'username',
    },
    {
      label: 'Logout',
      key: 'logout',
      onClick: handleLogout,
    },
  ];

  const items: MenuProps['items'] = [
    {
      label: 'Log In',
      key: 'login',
      icon: <Icon />,
      onClick: handleLogIn,
    },
  ];

  return (
    <Wrapper>
      <Row justify="end">
        <Menu theme="dark" mode="horizontal" items={isAuth ? authItems: items} selectable={false} />
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled(Layout.Header)`
  & > div {
    display: contents;
    
    & ul {
      justify-content: end;

      & li.ant-menu-item {
        &.username:hover {
          background-color: unset;
          color: inherit !important;
          cursor: unset;
        }
        
        &:hover {
          background-color: darkblue;
        }
      }
    }
  }
`;

const Icon = styled(UserOutlined)`
  padding: 5px;
  border: 1px solid;
  border-radius: 50%;
`;

export default Navbar;
