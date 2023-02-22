import styles from "./Header.module.css"
import Modal from "@mui/material/Modal"
import {useState} from "react"

function Header() {
  const createFormInitialState = {
    username: '',
    nickname: '',
    password: '',
    passwordConf: '',
  }

  const [openLogin, setOpenLogin] = useState(false)
  const [createAccount, setCreateAccount] = useState(false)
  const [createFormData, setCreateFormData] = useState(createFormInitialState)

  console.log(createFormData)

  const toggleOpenLogin = () => setOpenLogin(!openLogin)
  const toggleCreateAccount = () => setCreateAccount(!createAccount)

  function handleCreateChange(e){
    setCreateFormData({...createFormData,
    [e.target.name]: e.target.value })
  }

  async function login(e){
    e.preventDefault()
    const res = await fetch('http://localhost:4000/login', {credentials: 'include'})
    console.log(res)
  }

  async function logout(){
    const res = await fetch('http://localhost:4000/logout', {credentials: 'include'})
    const data = await res.json()
    console.log(data)
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
      body: JSON.stringify(createFormData)
    }
    const res = await fetch('http://localhost:4000/users', config)
    const data = await res.json()
    console.log(data)
  }

  return (
    <div className={styles.header}>
      <h1>FreeCreate</h1>
      <div className={styles.links}>
        <p>Donate</p>
        <p>About</p>
        <p>FAQs</p>
      </div>
      <div className={styles.login}>
        <button onClick={login}>Login</button>
        <button onClick={logout}>Logout</button>
      </div>
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
            <form onSubmit={login}>
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

export default Header