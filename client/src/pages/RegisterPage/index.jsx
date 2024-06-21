import React from 'react';
import logo from 'images/logo.png'
import google from 'images/gog.png'
import email from 'images/email.png'

function RegisterPage() {
  return (
    <div className="container">
      <img className="logo" src={logo} alt="" />
      <div className="title">Join the DEV Community</div>
      <div className="container__pt">DEV Community is a community of 1,626,760 amazing developers</div>

      <div className="button">
        <p><img src={google} alt="" /></p>
        <p>Sign up with Google</p>
        <p></p>
      </div>

      <div className="button">
        <p><img src={email} alt="" /></p>
        <p>Sign up with Email</p>
        <p></p>
      </div>

      <div className="container_footer">
        <p>By signing up, you are agreeing to our</p>
        <p className="text_blue">privacy policy, terms of use</p>
      </div>

      <div className="container_footer">
        <p>and</p>
        <p className="text_blue">code of conduct.</p>
      </div>

      <hr />

      <div className="container_footer_end">
        <p>Already have an account?</p>
        <p className="Log_blue">Log in.</p>
      </div>
    </div>
  );
}

export default RegisterPage;
