import React from 'react'
import styled from 'styled-components'
class PaymentSuccess extends React.Component{


    componentDidMount=()=>{
        
    }
    render(){
        return(
            <Root>
                <Success>
                    Thank you for joining the Cherie Family !!
                    Your Cherie  will be delivered very soon . 
                </Success>
            </Root>
        )
    }
}

const Root = styled.div`
    display: flex;

    height:100vh
`

const Success = styled.text`
    font-size:30px;
    margin:40px;
`

export default PaymentSuccess