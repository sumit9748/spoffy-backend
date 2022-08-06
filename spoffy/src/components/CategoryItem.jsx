import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
const Container=styled.div`
flex:1;
margin:3px;
height:70vh;
position:relative;`
const Image=styled.img`
width:100%;
height:100%;
object-fit:cover;`
const Info=styled.div`
position:absolute;
width:100%;
height:100%;
top:0;
left:0;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;`
const Title=styled.h1`
color:white;
margin-bottom:20px;`
const Button=styled.button`
border:none;
padding:10px;
background-color:white;
color:grey;
cursor:pointer;
font-weight:600;
border-radius:10px;
&:hover{
    background-color:black;
    color:white;
}`

export const CategoryItem = ({item}) => {
    return (
        <Container>
            <Link to={`/products/${item.cat}`}>
            <Image src={item.img}/>
            <Info>
                <Title>
                    {item.title}
                    <Button>
                    𝕤𝕙𝕠𝕡 𝕟𝕠𝕨
                    </Button>
                </Title>
            </Info>
            </Link>
        </Container>
    )
}
