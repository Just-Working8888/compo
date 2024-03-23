import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import classes from './Login.module.scss';
import { useAppDispatch } from 'store/hook';
import { loginAsync } from 'store/reducers/authRedusers';
import { setCookie } from 'helpers/cookies';
import {Link} from 'react-router-dom';


const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);
        dispatch(loginAsync({ username: values.username, password: values.password }));
        try {
            setLoading(true);
            const response = await dispatch(loginAsync({ username: values.username, password: values.password }));
            message.success('Login successful');
            navigate('/');
            setCookie('user_id', response.payload.user_id, 30)
            setCookie('access_token', response.payload.access, 30);
        } catch (error) {
            message.error('Login failed. Please check your credentials.');
        }finally{
            setLoading(false);
        }
    };


    return (
        <section className={classes.auth_reg}>
            <div className={classes.form}>

                <div className={classes.icon}>
                    <UserOutlined style={{ fontSize: '50px', color: "white" }} />
                </div>

                <div className={classes.title}>
                    <h2>Welcome back!</h2>
                    <p>Sign in to your account to continue</p>
                </div>

                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <div className={classes.formBlock}>
                            <div>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                            </div>

                            <div>
                                <a className="login-form-forgot" href="#/">
                                    Forgot password
                                </a>
                            </div>
                        </div>
                    </Form.Item>

                    <Form.Item>
                        <Button loading={loading} type="primary" htmlType="submit" className="login-form-button" block>
                            Log in
                        </Button>
                        Or <a href="#/"> <Link to={'/signUp'}>register now!</Link></a>
                    </Form.Item>
                </Form>
            </div>
        </section>

    );
};

export default Login;