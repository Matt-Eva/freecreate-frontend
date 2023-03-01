import Modal from "@mui/material/Modal"
import styles from "./LoginModal.module.css"
import {useState, useContext} from 'react'
import { UserContext } from '../../context/user_context'
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown"

function LoginModal() {
    const createFormInitialState = {
        username: '',
        nickname: '',
        password: '',
        passwordConf: '',
        thumbnail: ''
      }
    
    const loginFormInitialState = {
        username: '',
        password: ''
    }
    const {user, setUser} = useContext(UserContext)
    const [openLogin, setOpenLogin] = useState(false)
    const [createAccount, setCreateAccount] = useState(false)
    const [createFormData, setCreateFormData] = useState(createFormInitialState)
    const [loginFormData, setLoginFormData] = useState(loginFormInitialState)

    const toggleOpenLogin = () => setOpenLogin(!openLogin)
    const toggleCreateAccount = () => setCreateAccount(!createAccount)

    function handleCreateChange(e){
        setCreateFormData({...createFormData,
        [e.target.name]: e.target.value })
    }

    function handleLoginChange(e){
        setLoginFormData({
        ...loginFormData,
        [e.target.name]: e.target.value
        })
    }

    async function login(e){
        e.preventDefault()
        const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        credentials: 'include',
        body: JSON.stringify(loginFormData)
        }
        const res = await fetch('http://localhost:4000/login', config)
        console.log(res)
        const data = await res.json()
        setUser(data)
        toggleOpenLogin()
        setLoginFormData(loginFormInitialState)
        setCreateFormData(createFormInitialState)
        console.log(data)
    }

    async function logout(){
        const res = await fetch('http://localhost:4000/logout', {method: 'DELETE',credentials: 'include'})
        const data = await res.json()
        console.log(data)
        setUser(null)
      }

    async function createNewAccount(e){
        e.preventDefault()
        if (createFormData.password !== createFormData.passwordConf){
            alert("Must enter matching passwords")
            return
        }
        const config = {
            method: 'POST',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(createFormData), 
            credentials: 'include'
        }
        const res = await fetch('http://localhost:4000/users', config)
        const data = await res.json()
        console.log(data)
        setUser(data)
        toggleCreateAccount()
        toggleOpenLogin()
        setLoginFormData(loginFormInitialState)
        setCreateFormData(createFormInitialState)
    }


  return (
    <div className={styles.login}>
            {user ? 
            <div className={styles.logout}>
                <button onClick={logout} >Logout</button>
                <ProfileDropdown />
            </div>
            :
                <button onClick={toggleOpenLogin}>Login</button>
            }
        
        <Modal open={openLogin} onClose={toggleOpenLogin}>
            <div className={styles.login_modal}>
            { createAccount ?
                <div>
                    <h3>Create Account</h3>
                    <form onSubmit={createNewAccount} onChange={handleCreateChange}>
                    <label>Username</label>
                    <input type="text" name="username" placeholder="enter username" />
                    <label>Nickname</label>
                    <input type="text" name="nickname" placeholder="enter nickname" />
                    <label>Password</label>
                    <input type="password"name="password" placeholder="enter password"/>
                    <label>Password</label>
                    <input type="password"name="passwordConf" placeholder="confirm password"/>
                    <input type="submit" value="Create Account" />
                    </form>
                    <button onClick={toggleCreateAccount}>Login</button>
                </div>
                :
                <div>
                    <h3>Login</h3>
                    <form onSubmit={login} onChange={handleLoginChange}>
                    <label>Username</label>
                    <input type="text" name="username" placeholder="enter username" />
                    <label>Password</label>
                    <input type="password"name="password" placeholder="enter password"/>
                    <input type="submit" value="Login" />
                    </form>
                    <button onClick={toggleCreateAccount} >Create Account</button>
                </div>
            }
            </div>
        </Modal>
    </div>
  )
}

export default LoginModal