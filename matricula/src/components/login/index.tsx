import React from 'react';
import book from '../../assets/books.png';
import '../login/style.css';

export default function Login() {


    return (

        <div className="row">
            <div className="col-5">
                Column1
            </div>
            <div className="col-7">
                <img src={book} />
            </div>

        </div>

    );
}