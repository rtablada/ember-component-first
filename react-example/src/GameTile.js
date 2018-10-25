import React from 'react';

export default ({ title, year, imageUrl, description }) => (
  <div className="game-tile">
    <h1>{title} <span>{year}</span></h1>
    <img
      alt=""
      src={imageUrl}
    />
    <p>{description}</p>
  </div>
);
