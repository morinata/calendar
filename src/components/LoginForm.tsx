import React, {ChangeEvent, FC, useState} from 'react';
import styled from 'styled-components';
import {Button, Form, Input} from 'antd';
import {useActions} from '../hooks/useActions';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {rules} from '../utils/rules';

const LoginForm: FC = () => {
  const {login} = useActions();
  const {error, isLoading} = useTypedSelector((state) => state.auth);
  const [loginValue, setLoginValue] = useState<{[key: string]: string}>({
    username: '',
    password: '',
  });

  const handleChange = (name: string, value: string) => {
    setLoginValue((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    login(loginValue.username, loginValue.password);
  };

  return (
    <Wrapper onFinish={handleSubmit}>
      {error && <Error>{error}</Error>}
      <Form.Item
        label="Username"
        name="username"
        rules={[rules.required('Please input your username')]}
      >
        <Input
          value={loginValue.username}
          onChange={({target: {value}}: ChangeEvent<HTMLInputElement>) => handleChange('username', value)}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[rules.required('Please input your password')]}
      >
        <Input.Password
          value={loginValue.password}
          onChange={({target: {value}}: ChangeEvent<HTMLInputElement>) => handleChange('password', value)}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Log In
        </Button>
      </Form.Item>
    </Wrapper>
  );
};

const Wrapper = styled(Form)`
  width: 400px;
  
  & button {
    margin-left: 88px;
  }
`;

const Error = styled.div`
  margin-bottom: 20px;
  color: red;
`;

export default LoginForm;