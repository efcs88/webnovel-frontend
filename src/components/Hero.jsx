import React from 'react'

const Hero = ({ title, content}) => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url('expresswriters-influencer-4081842_1920.jpg')",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">{title}</h1>
          <p className="mb-5">
            {content}
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  )
}
export default Hero;