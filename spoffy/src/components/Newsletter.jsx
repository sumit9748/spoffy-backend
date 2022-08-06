import React from 'react'
import styled from 'styled-components'
import SendIcon from '@mui/icons-material/Send';
const Container=styled.div`
height:60vh;
background-color:#fcf5f5;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;`
const Title=styled.h1`
font-size:70px;
margin-bottom:20px;`
const Desc=styled.div`
font-size:24px;
font-weight:300;
margin-bottom:20px;`
const InputContainer=styled.div`
width:50%;
height:40px;
background-color:white;
display:flex;
justify-content:space-between;
border:1px solid light gray;`
const Input=styled.input`
border:none;
flex:8;
padding-left:20px;`
const Button=styled.div`
flex:1;
boder:none;
background-color:teal;
color:white;
display:flex;
align-items:center;
justify-content:center;`


export const Newsletter = () => {
    return (
        <Container>
            <Title>NewsLetter</Title>
            <Desc>Get Timely Updated from Your favourite products</Desc>
            <InputContainer>
            <Input placeholder="email"/>
            <Button>
            <SendIcon/>
            </Button>
            
            </InputContainer>
        </Container>
    )
}
export default Newsletter;
