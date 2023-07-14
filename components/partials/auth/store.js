import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const initialUsers = () => {
	if (typeof window !== 'undefined') {
		const item = window?.localStorage.getItem('users');
		return item
			? JSON.parse(item)
			: {
					firstname: '',
					lastname: '',
					username: '',
					token: '',
					role: '',
					email: '',
			  };
	}
};

// save users in local storage
const initialIsAuth = () => {
	if (typeof window !== 'undefined') {
		const item = window?.localStorage.getItem('isAuth');
		return item ? JSON.parse(item) : false;
	}
	return false;
};

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		users: initialUsers(),
		isAuth: initialIsAuth(),
	},
	reducers: {
		handleRegister: (state, action) => {
			const { name, username, password } = action.payload;
			const user = state.users.find((user) => user.username === username);
			if (user) {
				toast.error('User already exists', {
					position: 'top-right',
					autoClose: 1500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
			} else {
				state.users.push({
					id: uuidv4(),
					name,
					username,
					password,
				});
				if (typeof window !== 'undefined') {
					window?.localStorage.setItem('users', JSON.stringify(state.users));
				}
				toast.success('User registered successfully', {
					position: 'top-right',
					autoClose: 1500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
			}
		},

		handleLogin: (state, action) => {
			const { username, firstname, lastname, email, token, role } =
				action.payload;
			state.isAuth = true;
			state.users = {
				username,
				firstname,
				lastname,
				email,
				token,
				role,
			};
			if (typeof window !== 'undefined') {
				window?.localStorage.setItem('isAuth', JSON.stringify(state.isAuth));
        window?.localStorage.setItem('token', JSON.stringify(state.users.token));
        window?.localStorage.setItem('users', JSON.stringify(state.users));
			}
			toast.success('User logged in successfully', {
				position: 'top-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		},

		handleLogout: (state, action) => {
			state.isAuth = action.payload;
			// remove isAuth from local storage
			if (typeof window !== 'undefined') {
				window?.localStorage.removeItem('isAuth');
        window?.localStorage.removeItem('users');
        
			}
			toast.success('User logged out successfully', {
				position: 'top-right',
			});
		},
	},
});

export const { handleRegister, handleLogin, handleLogout } = authSlice.actions;
export default authSlice.reducer;
