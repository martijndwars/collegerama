import React from 'react';
import {Link} from 'react-router-dom';
import { Card } from 'react-bootstrap';
import './css/Homecard.css'


export default function LectureCard({imgUrl,Title,to,seen}) {
  return (
    <Link to={to} className="text-reset text-decoration-none">
    <Card style={{ width: '30rem', height: '22rem', display: seen ? "flex": "none"}} className="mx-3 mt-5 homeCard">
        <Card.Img 
            variant="top"
            src={imgUrl}
            style={{height: "65%"}}
            className="rounded mt-3"
        />
        <Card.Body className="fixed-height">
          <Card.Title className="text-center mt-3 title" style={{fontSize: 30}}>
              {Title}
          </Card.Title>
        </Card.Body>
    </Card>
    </Link>

        

  );
}
