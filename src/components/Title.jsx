import React, {useEffect, useContext} from 'react';
import {Context} from '../globalStore/store.jsx'
import styled from 'styled-components'
import cartpng from '../assets/images/cart.png'
import ModalStateUpdaterButton from '../components/ModalStateUpdaterButton.jsx'

export  const Title = ()=>{
    return (
        <TitleDiv>
            CHERIE CHOCOLATES
        </TitleDiv>
    )
}   

export const MenuBarComponent =()=>{
        return(
                <MenuBar>
                    <MenuItems >
                        Weddings
                    </MenuItems>
                    <MenuItems >
                        Birthday
                    </MenuItems>
                    <MenuItems >
                        Anniversary
                    </MenuItems>
                    <MenuItems >
                        Women's Day
                    </MenuItems>                   
                    <MenuItems >
                Bulk Orders
            </MenuItems>
                </MenuBar>
            )
}

export const AddToCartBtnTop = ({is_logged_in,openCartM})=>{
    return(
       
            <CartTopDiv >
                {console.log(is_logged_in)}
                {is_logged_in ?<AddToCartBtn src={cartpng} onClick={openCartM}/>:null}
                {!is_logged_in ?<ModalStateUpdaterButton/>:null}

            </CartTopDiv>
    )
}



// // function to guard the component for private access
// export const authGuard = (Component) => () => {
//     return localStorage.getItem("token") ? (
//       <Component />
//     ) : (
//       <Redirect to="/login" />
//     );
//   };
  
  

const TitleDiv = styled.h2`
    color: ${props => (props.color ? props.color : '#dddddd')};
    text-align: center;
`
const MenuBar =styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 30px;
    border: #eeeeee;
    margin-bottom: 20px;
`
const MenuItems =styled.button`
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




