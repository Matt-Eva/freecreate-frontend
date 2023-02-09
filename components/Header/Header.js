import styles from "./Header.module.css"
import Modal from "@mui/material/Modal"
import {useState} from "react"

function Header() {
  const [openLogin, setOpenLogin] = useState(false)
  const [createAccount, setCreateAccount] = useState(false)
  console.log(openLogin)

  const toggleOpenLogin = () => setOpenLogin(!openLogin)
  const toggleCreateAccount = () => setCreateAccount(!createAccount)

  function login(e){
    e.preventDefault()
  }

  function createNewAccount(e){
    e.preventDefault()
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
        <button onClick={toggleOpenLogin}>Login</button>
      </div>
      <Modal open={openLogin} onClose={toggleOpenLogin}>
        <div className={styles.login_modal}>
          { createAccount ?
          <div>
            <h3>Create Account</h3>
            <form onSubmit={createNewAccount}>
              <label for="username">Username</label>
              <input type="text" name="username" placeholder="enter username" />
              <label for="password">Password</label>
              <input type="password"name="password" placeholder="enter password"/>
              <label for="password-conf">Password</label>
              <input type="password"name="password-conf" placeholder="confirm password"/>
              <input type="submit" value="Create Account" />
            </form>
            <button onClick={toggleCreateAccount}>Login</button>
          </div>
          :
          <div>
            <h3>Login</h3>
            <form onSubmit={login}>
              <label for="username">Username</label>
              <input type="text" name="username" placeholder="enter username" />
              <label for="password">Password</label>
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