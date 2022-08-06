import React, { useContext } from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { mobile } from "../responsive"
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";
import { useDispatch } from "react-redux"

const Container = styled.div`
height:60px;
${mobile({ height: "50px" })}
`
const Wrapper = styled.div`
padding:10px 20px;
display:flex;
justify-content:space-between;
align-items:center;
${mobile({ padding: "10px 0" })}
`
const Left = styled.div`
flex:1;
display:flex;
align-items:center;`

const Language = styled.span`
font-size:14px;
cursor:pointer;
${mobile({ display: "none" })}`

const SearchContainer = styled.div`
border:1px solid lightgray;
display:flex;
align-items:center;
margin-left:25px;
padding:5px;`

const Input = styled.input`
border:none;
${mobile({ width: "50px" })};
`
const ProfileImg = styled.img`
width:32px;
height:32px;
border-radius:50%;
object-fit:cove;
margin-left:20px;`
const Center = styled.div`
display:flex;
flex:1;
text-align:center;
justify-content:center;`

const Logo = styled.h1`
font-weight:bold;
${mobile({ fontSize: "24px" })}`

const Right = styled.div`
flex:1;
display:flex;
justify-content:flex-end;
align-items:center;
${mobile({ flex: 2, justifyContent: "center" })}`

const MenuItem = styled.button`
font-size:14px;
cursor:pointer;
margin-left:25px;
border:none;
background-color:transparent;
color:black;
font-weight:500;
${mobile({ fontSize: "12px", marginLeft: "10px" })}`


const MenuItemlog = styled.button`
font-size:14px;
cursor:pointer;
margin-left:25px;
border:none;
background-color:transparent;
color:black;
font-weight:500;
${mobile({ fontSize: "12px", marginLeft: "10px" })}`

const Username = styled.span`
font-size:20px;
font-weight:500;
margin-left:20px;`

const Img = styled.img`
width:70px;
height:70px;
border-radius:50%;
object-fit:cover;`



const Navbar = () => {
    const user = useSelector(state => state.user.currentUser)
    const size = useSelector(state => state.cart.products.length);


    return (
        <Container>
            <Wrapper>
                <Left>
                    <Img src='https://www.clipartmax.com/png/middle/474-4745177_cook-logo.png' />
                </Left>

                <Center><Logo>𝓢𝓟𝓞𝓕𝓕𝓨</Logo>
                    <ProfileImg src={user.profileImg} />

                </Center>
                <Right>
                    <Link to="/register">
                        <MenuItem>
                            REGISTER
                        </MenuItem>
                    </Link>
                    <MenuItemlog>
                        LOG-OUT
                    </MenuItemlog>
                    <MenuItem>
                        <Link to="/cart">
                            {size != 0 && <Badge badgeContent={size} color="primary">
                                <AddShoppingCartOutlinedIcon color="action" />
                            </Badge>}
                        </Link>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar
