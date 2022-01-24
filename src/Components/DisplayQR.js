import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

const DisplayQR = ({ data, type }) => {
    const [QRCodeURL, setQRCodeURL] = useState('');
    
    const createQRCode = () => {
        QRCode.toDataURL(data, (err, string) => {
            setQRCodeURL(string);
        })
    }

    useEffect(() => {createQRCode()}, [data]);

    return (
        <div>
            <img className={ `qr-${type}` } src={QRCodeURL} alt={`${type} offer QR code`} />
        </div>
    )
}

export default DisplayQR;