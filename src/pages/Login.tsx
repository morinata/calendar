import React, {FC} from 'react';
import styled from 'styled-components';
import {Card, Layout, Row} from 'antd';
import LoginForm from '../components/LoginForm';

const Login: FC = () => {
  return (
    <Layout>
      <Content>
        <Card>
          <LoginForm />
        </Card>
      </Content>
    </Layout>
  )
};

const Content = styled(Row)`
  height: calc(100vh - 64px);
  justify-content: center;
  align-items: center;
`;

export default Login;