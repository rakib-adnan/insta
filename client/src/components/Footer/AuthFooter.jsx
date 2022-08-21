import React from 'react';
import "./AuthFooter.scss";

const AuthFooter = () => {
  return (
    <>
    <div className="auth-footer">
<div className="footer-link">
<ul>
  <li><a href="">Meta</a></li>
  <li><a href="">About</a></li>
  <li><a href="">Blog</a></li>
  <li><a href="">Jobs</a></li>
  <li><a href="">Help</a></li>
  <li><a href="">API</a></li>
  <li><a href="">Privacy</a></li>
  <li><a href="">Terms</a></li>
  <li><a href="">Top Accounts</a></li>
  <li><a href="">Hastags</a></li>
  <li><a href="">Location</a></li>
  <li><a href="">Instagram Lite</a></li>
  
</ul>
<div className="footer-link-1">
<ul>
<li><a href="">Contact Uploading & Non-Users</a></li>
</ul>
</div>
<div className="footer-link-2">
    <ul>
    <li><a href="">Dance</a></li>
  <li><a href="">Food&Drink</a></li>
  <li><a href="">Home & Garden</a></li>
  <li><a href="">Music</a></li>
  <li><a href="">Visual Arts</a></li>
    </ul>
</div>
</div>
<div className="option-tag">
  <select name="" id="">
    <option value="">English</option>
    <option value="">العربية</option>
    <option value="">中文</option>
    <option value="">日本語</option>
    <option value="">한국어</option>
    <option value="">हिन्दी</option>
    <option value="">ภาษาไทย</option>
    <option value="">ภาษาจีน</option>            
  </select>
  <span className="copy-right-area">© 2022 Instagram from Meta</span>
</div>
</div>
    </>
  )
}

export default AuthFooter