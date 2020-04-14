import React from 'react';
import {Link} from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { isMobile } from "react-device-detect";


export default function LectureCard({imgUrl,Title,to}) {

  return (
        <Card style={{ 
          width: 
            isMobile ? '20rem' :'30rem', 
          height: 
            isMobile ? '15rem' :'22rem'
          }} className="mx-3 mt-5">
          <Link to={to} className="text-reset text-decoration-none">

            <Card.Img 
                variant="top"
                src={imgUrl}
                className="rounded"
            />
            <Card.Body className="fixed-height align-text-middle">
              <Card.Title className="text-center"
              style={{fontSize: isMobile ? 10 : "1.25rem"}} 
              >
                  {Title}
              </Card.Title>

            </Card.Body>
          </Link>

        </Card>
        

  );
}
