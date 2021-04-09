import React from 'react'

import styled from 'styled-components'
import cartpng from '../assets/images/cart.png'

class AddToCartBtnTop extends React.Component{

    constructor(){
        super()
        this.state={
            loginopen:false
        }
    }

    componentDidMount=()=>{       
    }
    open=()=>{     
    }

    render(){
        return(
            <CartTopDiv >
                <AddToCartBtn src={cartpng} />
                <Login onClick={this.open(modalstate)}>Login</Login>
            </CartTopDiv>
        )
    }

}


const CartTopDiv = styled.div`
    display:flex;
    position:absolute;
    top:10px;
    right:10px;
    float:right;
`
const AddToCartBtn=styled.img`
    display:flex;
    width:30px;
    height: 30px;
    object-fit:contain;
`


const Login=styled.button`
    margin: 0px 10px 0px 10px;
    width: auto;
    height : 100%;
    text-align: center;
    border: #eeeeee

    &:focus{
        &:focus {
            color: #244234;
      }
    }
`
export default AddToCartBtnTop