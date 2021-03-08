import styled from 'styled-components'
import React from 'react'
import {Link } from 'react-router-dom'

const NavBar = () => {

    return(
        <Root>
            <Link to='/'>Home</Link>
            <Link to='/'>Weddings</Link>
            <Link to='/'>Birthday</Link>
            <Link to='/'>Anniversary</Link>
            <Link to='/'>Women's Day</Link>
            <Link to='/'>Bulk Orders</Link>
        </Root>
    )
}

export default NavBar

const Root = styled.nav`
    display: flex;
    background-color: #f5be5a;
    & > a{
        text-decoration:none;
        width: 10%;
        padding: 12px;
        color: white;
        :hover{
            background-color: #f9a814;
        }
    }
`