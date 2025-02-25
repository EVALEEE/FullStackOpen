import PropTypes from 'prop-types'
const LoginForm = ({
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleSubmit
}) => {
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    username
                    <input
                        id='username'
                        value={username}
                        onChange={handleUsernameChange}
                        name="username"
                    />
                </div>
                <div>
                    password
                    <input
                        id='password'
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        name="password"
                    />
                </div>
                <button id="login-button" type="submit">login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm