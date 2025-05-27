import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function NewsItem({title, imgUrl, searchKeyWords, source, feedDate, id}) {

  return (
    <div className="item-news">
      <div className="item-news__head">
        <Link to={id} className="item-news__image">
          <img src={imgUrl} alt="Image" />
        </Link>
      </div>
      <div className="item-news__body">
        {searchKeyWords.length > 0 &&
        <div className="item-news__keywords">
            {searchKeyWords.map((elem, i) => (
                <span className="item-news__keyword" key={i}>{elem}</span>
            ))}
        </div>
        }
        
        <Link to={id} className="item-news__name">{title}</Link>
        <div className="item-news__date">{new Date(feedDate).toLocaleString("en-UK")}</div>
      </div>
    </div>
  );
}
