import React, {useState} from "react";
import {Modal, Button, Form, Container} from 'react-bootstrap';
// 부트 스트랩 연결 후 필요한 것들 불러옴
import "bootstrap/dist/css/bootstrap.min.css";
// 부트 스트랩 css 연결
import { GoogleLogin } from 'react-google-login';
// 구글 로그인 연동
import HorizonLine from "../HorizonLine";
import {useDispatch} from 'react-redux';
import { loginUser } from '../../_reducers/user_action';
import { useNavigate } from "react-router-dom";

// d5b5727cf3aebb1508c6e0c0e1f0d42f


const SignInModal = ({show, onHide}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: email,
            password: password
        }

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess) {
                    navigate('/');
                } else {
                    alert('Error')
                }
            })

    }
   
    return (
        <Modal
            show={show}
            onHide={onHide}
            dialogClassName="modal-90w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Container>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Sign In
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={onSubmitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>이메일</Form.Label>
                        <Form.Control type="email" value={email} onChange={onEmailHandler}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control type="password" value={password} onChange={onPasswordHandler}/>
                    </Form.Group>                 
                    <Button block variant="secondary" type="submit" className="my-3" style={{width: "100%"}}>
                        Sign In
                    </Button>
                    <HorizonLine text={"OR"} />
                    <GoogleLogin
                        render={renderProps=>{
                           return <Button 
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            block
                            style={{backgroundColor: "#176BEF",
                                    borderColor: "#176BEF",
                                    width: "100%"
                            }}>
                               <i className="fab fa-google"></i>&nbsp; Sign In with Google
                           </Button> 
                        }}
                    />
                    <img style={{width:"100%", height:"45px", marginTop:"10px", marginBottom:"10px"}} src="../img/kakao_login_medium_wide.png" alt="kakao button"/>
                </Form>
                </Modal.Body>
                
            </Container>
        </Modal>
    );
}




export default SignInModal