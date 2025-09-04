import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function footer() {
    return (
        <div className="container-fluid bg-danger">
            <div className="d-flex w-100 align-items-center text-white">
                <p>DeliveryGo &copy;</p>
                <p>2025</p>
            </div>
        </div>
    )
}

export default footer;