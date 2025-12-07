import React from 'react'

const test = () => {
  return (
    <div>
        <form className="box">
        <h1>login</h1>
        <div className="input-field">
            <input type="text" name="username" id="username" placeholder="Email" autoComplete="off" />
        </div>
        <div className="input-field">
            <input type="password" name="pass" id="pass" placeholder="Password" autoComplete="off" />
        </div>
        <button type="submit" id="submit">LOGIN</button>
        </form>
    </div>
  )
}

export default test
