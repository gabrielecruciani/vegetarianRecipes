import React from 'react';
import { Link } from 'react-router-dom';
import './Error.css'

const Error = () => {
  return (
    <section className="error-container">
      <div>
        <h1>Sorry, page not found :(</h1>
        <button className="back-button md:hidden m-2 p-2 rounded-lg bg-yellow-400 hover:bg-yellow-300 hover:scale-105 hover:transition-all text-slate-600 text-xl">
          <Link className='path' to="/">Back home</Link>
        </button>
      </div>
    </section>
  );
};

export default Error;