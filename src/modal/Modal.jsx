import React ,{Component}from 'react'
import styled from 'styled-components'

class Modal extends React.Component{

    constructor(props){
        super(props)

    }

    componentDidMount=()=>{
    }

    showModal=()=>{
        return( <Root>
                    <Close onClick={()=>{this.props.close()}}>Close</Close>
                    {this.props.children}
                </Root>
            )
    }

    render(){
        const is_open =this.props.open
            return(
            <React.Fragment>
                {is_open ? this.showModal():null}
            </React.Fragment>
           
        )
    }
}

const Root = styled.div`
    // display:flex;
    flex-direction:column;
    position:fixed;
    height: 100%;
    width:100%;
    justify-items:center;
    background-color: #4e4e4e;
    opacity:0.9;
    z-index:999
`

const Close=  styled.button`   
position:absolute; 
right:0;
margin:20px 20px;
z-index:999

`


export default Modal