import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from './../../actions/auth';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleOnSubmit = (evt) => {
		evt.preventDefault();
		if (password !== password2) {
			dispatch(setAlert('Passwords do not match', 'danger'));
		} else {
			dispatch(register(formData));
		}
	};
	//check the auth state if user is loggedIn
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}
	const { name, email, password, password2 } = formData;
	return (
		<Fragment>
			<h1 className='large text-primary'>Sign Up</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Create Your Account
			</p>
			<form className='form' onSubmit={handleOnSubmit}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Name'
						name='name'
						value={name}
						required
						onChange={onChange}
					/>
				</div>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={onChange}
					/>
					<small className='form-text'>
						This site uses Gravatar so if you want a profile image, use a
						Gravatar email
					</small>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						minLength='6'
						value={password}
						onChange={onChange}
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Confirm Password'
						name='password2'
						minLength='6'
						value={password2}
						onChange={onChange}
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Register' />
			</form>
			<p className='my-1'>
				Already have an account? <Link to='/login'>Sign In</Link>
			</p>
		</Fragment>
	);
};

export default Register;
