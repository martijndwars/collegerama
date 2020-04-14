import React from 'react';
import {Link} from 'react-router-dom';
import { Card } from 'react-bootstrap';


export default function LectureCard({imgUrl,Title,to}) {

  return (
        <Card style={{ width: '30rem', height: '22rem'}} className="mx-3 mt-5">
          <Link to={to} className="text-reset text-decoration-none">

            <Card.Img 
                variant="top"
                src={imgUrl}
                className="rounded"
            />
            <Card.Body className="fixed-height align-text-middle">
              <Card.Title className="text-center ">
                  {Title}
              </Card.Title>

            </Card.Body>
          </Link>

        </Card>
        

  );
}
