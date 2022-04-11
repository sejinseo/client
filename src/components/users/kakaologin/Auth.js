import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const REST_API_KEY = "d5b5727cf3aebb1508c6e0c0e1f0d42f";
    // 본인 REST API KEY 값
    const REDIRECT_URI = "http://1.1.1.168:3000/oauth/kakao/callback";
    const CLIENT_SECRET = "bZ50Z1fPE7ba3cIo3sB9Zz2UhmFYBW5M";

    const code = new URL(window.location.href).searchParams.get("code");
    // Redirect 주소로 전달받은 code 값을 추출하여 보여주는 코드

    const navigete = useNavigate();

    const getToken = async () => {
        const payload = qs.stringify({
            grant_type: "authorization_code",
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code: code,
            client_secret: CLIENT_SECRET
        });

        try {
            const res = await axios.post(
                "https://kauth.kakao.com/oauth/token",
                payload
            );

            window.Kakao.init(REST_API_KEY);

            navigete("/profile")
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getToken();
    }, []);

    return null;
 
}

export default Auth;