import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import classes from './SignUp.module.scss';
import { useAppDispatch } from 'store/hook';
import { registerAsync } from 'store/reducers/authRedusers';


const SignUp: React.FC = () => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);
        try {
            setLoading(true);
            const response = await dispatch(registerAsync({ username: values.username, password: values.password, confirm_password: values.confirm_password }));
            message.success('Registration successful. You can now log in.');
      
            navigate('/login');
        } catch (error) {
            message.error('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <section className={classes.auth_reg}>
            <div className={classes.form}>

                <div className={classes.title}>
                    <h2>Сreate an account!</h2>
                    <p>Please fill in this form to create an account.</p>
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
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            placeholder="Password"
                            prefix={<LockOutlined className="site-form-item-icon"
                            />} />
                    </Form.Item>

                    <Form.Item
                        name="confirm_password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder="Confirm Password"
                            prefix={<LockOutlined className="site-form-item-icon"
                            />} />
                    </Form.Item>


                    <Form.Item>
                        <Button loading={loading} type="primary" htmlType="submit" className="login-form-button" block>
                            SignUp
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </section>

    );
};

export default SignUp;