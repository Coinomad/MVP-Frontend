import axios from 'axios';
import React, { useEffect, useState } from 'react';

const WaitListDisplay = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get('https://mvp-backend-bzvi.onrender.com/v1/api/waitlist').then((res) => {
            console.log('Waitlist Email', res.data);
            setList(res.data.data);
        }).catch((err) => {
            console.log('Email Waitlist Error', err);
        });
    }, []);

    return (
        <section className='w-full h-screen flex flex-col justify-center items-center gap-6'>
            <h1>Email Address Waitlist</h1>
            <div>
                Waitlist Count: {list.length}
            </div>
            <div>
                {list.length > 0 ? (
                    list.map((l, index) => (
                        <div className='flex justify-center items-center gap-2' key={index}>
                            <p>{index + 1}</p>
                            <p className='text-[1.25rem] font-medium text-black leading-8'>{l.email}</p>
                        </div>
                    ))
                ) : (
                    <p>No emails in the waitlist.</p>
                )}
            </div>
        </section>
    );
}

export default WaitListDisplay;
