import PropTypes from 'prop-types'
const LoginForm = ({props}) => {
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={props.handleSubmit}>
                <div>
                    username
                    <input
                        value={props.username}
                        onChange={props.handleUsernameChange}
                        name="username"
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={props.password}
                        onChange={props.handlePasswordChange}
                        name="password"
                    />
                </div>
                <button type="submit">login</button>
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