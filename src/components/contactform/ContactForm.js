import React, { useState } from 'react';
import './ContactForm.css';
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "83a18ef8-4480-446d-8718-3b1e94b5ba04");

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (data.success) {
      console.log("Success", data);
      setResult(data.message);
      setShowResult(true);
      setFormData({
        name: "",
        email: "",
        message: ""
      });
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  const handleBackClick = () => {
    setShowResult(false);
  };

  return (
    <div className={`contact-container shadow-layer ${showResult ? 'back-active' : ''}`}>
      {showResult ? (
        <div className='back'>
          <span>{result}</span>
          <button onClick={handleBackClick}>Back</button>
        </div>
      ) : (
        <>
          <form onSubmit={onSubmit} className='contact-left'>
            <div className='contact-left-title'>
              <h2>Get in touch</h2>
              <div className='line'></div>
            </div>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder='Your Name'
              className='contact-inputs'
              required
            ></input>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder='Your Email'
              className='contact-inputs'
              required
            ></input>
            <textarea
              name='message'
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder='Your Message'
              className='contact-inputs'
              required
            ></textarea>
            <button type='submit'>Submit</button>
          </form>
          
          <div className="social-container">
            <a href="https://www.instagram.com/_gabriele.it_/" target="_blank" className="social-image">
              <FaIcons.FaInstagram /></a>
            <a href="https://www.linkedin.com/in/gabriele-cruciani/" target="_blank" className="social-image">
              <FaIcons.FaLinkedinIn />
            </a>
            <a href="https://twitter.com/gabriele_it_" target="_blank" className="social-image">
              <FaIcons.FaTwitter />
            </a>
            <a href="https://github.com/gabrielecruciani" target="_blank" className="social-image">
              <FaIcons.FaGithub />
            </a>
            <a href="https://talent.start2impact.it/profile/gabriele-cruciani" target="_blank" className="social-image">
              <MdIcons.MdSchool />
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default ContactForm;