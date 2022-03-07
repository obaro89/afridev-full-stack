import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/auth';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const dispatch = useDispatch();

	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();
		dispatch(login(formData));
	};

	//check the auth state if user is loggedIn
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	const { email, password } = formData;
	return (
		<Fragment>
			<h1 className='large text-primary'>Sign In</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Sign into Your Account
			</p>
			<form className='form' onSubmit={handleOnSubmit}>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={onChange}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						value={password}
						onChange={onChange}
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Login' />
			</form>
			<p className='my-1'>
				Don't have an account? <Link to='/register'>Sign Up</Link>
			</p>
		</Fragment>
	);
};

export default Login;
