import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Subcribe() {

    const [value] = useState(localStorage.getItem('subscriber') || '');
    return (
        <div>
            <br /><br />
            <Card className='bg-light container col-6' >
                <Card.Body>
                    <Card.Img variant="top" src="images/sub.jpg" fluid />

                    <hr />
                    <Card.Title className="text-center">
                        {value}
                    </Card.Title>

                </Card.Body>
            </Card>

        </div>
    )
}

export default Subcribe