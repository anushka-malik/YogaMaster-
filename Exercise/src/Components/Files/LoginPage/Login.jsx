// import React, { useState, useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import validator from 'validator';
// import './Login.css';
// import { AContext } from "../Context/AppContext";

// const Login = () => {
//     const { backendURL, token, setToken } = useContext(AContext);
//     const navigate = useNavigate();

//     // Redirect if already logged in
//     useEffect(() => {
//         if (token) {
//             navigate("/");
//         }
//     }, [token, navigate]);

//     const [state, setState] = useState('Login'); // Start on Login
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(''); // State to store error messages

//     const validateInputs = () => {
//         if (state === 'Sign Up' && name.trim() === '') {
//             setError("Name cannot be empty.");
//             return false;
//         }
//         if (!validator.isEmail(email)) {
//             setError("Please enter a valid email address.");
//             return false;
//         }
//         if (password.length < 8) {
//             setError("Password must be at least 8 characters long.");
//             return false;
//         }
//         setError(''); // Clear error if validation passes
//         return true;
//     };

//     const onSubmitHandler = async (event) => {
//         event.preventDefault();
//         if (!validateInputs()) return;

//         setLoading(true);
//         try {
//             let response;
//             if (state === 'Sign Up') {
//                 // Sign-Up logic
//                 response = await axios.post(`${backendURL}/user/`, { name, email, password });
//             } else {
//                 // Login logic
//                 response = await axios.post(`${backendURL}/user/login`, { email, password });
//             }

//             const { data } = response;
//             if (data.success) {
//                 localStorage.setItem('token', data.token);
//                 setToken(data.token);
//                 navigate("/Home");
//             } else {
//                 setError(data.message); // Display backend error on the front page
//             }
//         } catch (error) {
//             setError(error.response?.data?.message || "An error occurred. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={onSubmitHandler} className="bodiess">
//             <div>
//                 <p className="mains">{state === 'Sign Up' ? "Create Account" : "Login"}</p>
//                 <p className="ques">Please {state === 'Sign Up' ? "Create Account" : "Login"} to continue</p>

//                 {error && <p className="error-message">{error}</p>} {/* Display error message */}

//                 {state === "Sign Up" && (
//                     <div className="name">
//                         <input
//                             type="text"
//                             placeholder="Full Name"
//                             onChange={(e) => setName(e.target.value)}
//                             value={name}
//                             required
//                         />
//                     </div>
//                 )}

//                 <div className="email">
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         onChange={(e) => setEmail(e.target.value)}
//                         value={email}
//                         required
//                     />
//                 </div>

//                 <div className="pass">
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         onChange={(e) => setPassword(e.target.value)}
//                         value={password}
//                         required
//                     />
//                 </div>

//                 <button type="submit" className="btn1" disabled={loading}>
//                     {loading ? "Loading..." : state === 'Sign Up' ? "Create Account" : "Login"}
//                 </button>

//                 {state === 'Sign Up' ? (
//                     <p>
//                         Already have an account?{' '}
//                         <span onClick={() => setState('Login')} className="log">Login</span>
//                     </p>
//                 ) : (
//                     <p>
//                         Create a new account?{' '}
//                         <span onClick={() => setState('Sign Up')} className="create">Click here</span>
//                     </p>
//                 )}
//             </div>
//         </form>
//     );
// };

// export default Login;



import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';
import './Login.css';
import { AContext } from "../Context/AppContext";

const Login = () => {
    const { backendURL, token, setToken } = useContext(AContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    const [state, setState] = useState('Login');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState('');

    const validateField = (name, value) => {
        switch (name) {
            case 'email':
                if (!value) {
                    return 'Email is required';
                } else if (!validator.isEmail(value)) {
                    return 'Please enter a valid email address';
                }
                return '';
            case 'password':
                if (!value) {
                    return 'Password is required';
                } else if (value.length < 8) {
                    return 'Password must be at least 8 characters long';
                } else if (!/\d/.test(value)) {
                    return 'Password must contain at least one number';
                } else if (!/[a-z]/.test(value)) {
                    return 'Password must contain at least one lowercase letter';
                } else if (!/[A-Z]/.test(value)) {
                    return 'Password must contain at least one uppercase letter';
                }
                return '';
            case 'name':
                if (state === 'Sign Up' && (!value || value.trim() === '')) {
                    return 'Name is required';
                } else if (value && value.length < 2) {
                    return 'Name must be at least 2 characters long';
                } else if (value && !/^[a-zA-Z\s]*$/.test(value)) {
                    return 'Name can only contain letters and spaces';
                }
                return '';
            default:
                return '';
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Real-time validation
        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            if (state === 'Login' && key === 'name') return;
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setGeneralError('');

        if (!validateForm()) {
            setGeneralError('Please fix all errors before submitting');
            return;
        }

        setLoading(true);
        try {
            let response;
            if (state === 'Sign Up') {
                response = await axios.post(`${backendURL}/user/`, {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                });
            } else {
                response = await axios.post(`${backendURL}/user/login`, {
                    email: formData.email,
                    password: formData.password
                });
            }

            const { data } = response;
            if (data.success) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                navigate("/Home");
            } else {
                setGeneralError(data.message);
            }
        } catch (error) {
            setGeneralError(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="bodiess" noValidate>
            <div>
                <p className="mains">{state === 'Sign Up' ? "Create Account" : "Login"}</p>
                <p className="ques">Please {state === 'Sign Up' ? "Create Account" : "Login"} to continue</p>

                {generalError && <p className="error-message">{generalError}</p>}

                {state === "Sign Up" && (
                    <div className="name">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            onChange={handleInputChange}
                            value={formData.name}
                            className={errors.name ? 'error' : ''}
                            required
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>
                )}

                <div className="email">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleInputChange}
                        value={formData.email}
                        className={errors.email ? 'error' : ''}
                        required
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="pass">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleInputChange}
                        value={formData.password}
                        className={errors.password ? 'error' : ''}
                        required
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <button type="submit" className="btn1" disabled={loading}>
                    {loading ? "Loading..." : state === 'Sign Up' ? "Create Account" : "Login"}
                </button>

                {state === 'Sign Up' ? (
                    <p>
                        Already have an account?{' '}
                        <span onClick={() => {
                            setState('Login');
                            setErrors({});
                            setGeneralError('');
                            setFormData({ email: '', password: '', name: '' });
                        }} className="log">Login</span>
                    </p>
                ) : (
                    <p>
                        Create a new account?{' '}
                        <span onClick={() => {
                            setState('Sign Up');
                            setErrors({});
                            setGeneralError('');
                            setFormData({ email: '', password: '', name: '' });
                        }} className="create">Click here</span>
                    </p>
                )}
            </div>
        </form>
    );
};

export default Login;