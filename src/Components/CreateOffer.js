import React, { useState } from "react";
import SimplePeer from "simple-peer";
// import DisplayQR from "./DisplayQR";

const CreateOffer = () => {
    const [offer, setOffer] = useState('');
    const [message, setMessage] = useState('no message');

    const createOfferObj = async () => {
        const p1 = new SimplePeer({
            initiator: true,
            trickle: false,
        })

        p1.on('signal', data => {
            setOffer(JSON.stringify(data));
        })

        const testApi = await fetch('/.netlify/functions/createOffer', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: offer
        });
        const message = await testApi.json();
        setMessage(message);
    }

    return (
        <div>
            <button className="create-offer-btn" onClick={createOfferObj}>Create an Offer</button>
            <p className="offer-outgoing">{offer}</p>
            {/* <DisplayQR data={offer} type="outgoing" /> */}
            <p>{message}</p>
        </div>
    )
}

export default CreateOffer;