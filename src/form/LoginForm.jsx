import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import * as config from './../config.json' 
import Service from '../service/service'
import OtpInput from 'react-otp-input';
import MyContext from '../globalStore/MyContext';

class LoginForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            phone:'',
            show_OTP:false,
            otp:'',
            previous_10_digit_ph:''
        }
    }

    componentDidMount=()=>{
        
    } 

    handlePhoneChange=(e)=>{
        debugger
        if (!Number(e.target.value)) {
            return;
        }
        if ((e.target.value).toString().length >10)
        {return}
        else if ((e.target.value).toString().length ==10){
            this.setState({previous_10_digit_ph:e.target.value})
        }

        this.setState({[e.target.name]:e.target.value})
        console.log(this.state.phone)
        console.log(this.state.otp)
      }

    sendOTP =(e)=>{
        // e.preventDefault()
        let params={
            'phone':this.state.phone
        }
        // axios.get(`http://127.0.0.1:8000/users/login/`
        //     )
        //     .then(res => {
        //         const persons = res.data;
        //         this.setState({ persons });
        //     })
        this.setState({show_OTP:true})
        let headers = { headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
          }

        axios.post(config.BASE_URL + `/users/login/`,  params )
        .then(res => {
          console.log(res);
          console.log(res.data);
          localStorage.setItem('user_id',res.data.user_id)
        })
    }

    confirmOTP =(jwt,setJwt,closeM)=>{
        console.log(jwt)

        let params={
            'user_id':localStorage.getItem('user_id'),
            'otp':this.state.otp
        }
        axios.post(config.BASE_URL + `/users/verify/`,  params )
        .then(res => {
            if(res.data.token){
                localStorage.setItem('token','Bearer ' + res.data.token)
                setJwt(res.data.token)
                closeM()
            }
            else{
                
            }
        })
    }

    render(){
        return(
            <MyContext.Consumer>
                {({jwt,setJwt,closeM})=>(
                    <Root>
                        {console.log("printing jwt: " + jwt +" "+setJwt)}

                        <Title>Welcome to Cherie!</Title>
                        <Phone type="char" value={this.state.phone} name='phone' placeholder='Enter Phone no.' onChange={this.handlePhoneChange}></Phone>
                        { <SendOTP  onClick={this.sendOTP}>Send OTP</SendOTP>}
                        {/* {this.state.show_OTP &&<OTP  placeholder='Enter OTP'  type='number' name='otp' onChange={this.handleChange}/>} */}
                        {this.state.show_OTP && <OtpInput
                            value={this.state.otp}
                            onChange={otp => this.setState({otp})}
                            isInputNum={false}
                            numInputs={6}
                            separator={<span>-</span>}
                        />}
                        <Error>OTP entered does not match </Error>
                        {this.state.show_OTP && <ConfirmOTP onClick={()=>this.confirmOTP(jwt,setJwt,closeM)}>Confirm OTP</ConfirmOTP>}
                    </Root>
                )}
            </MyContext.Consumer>
        )
    }
}

const Root =styled.div`
    display: flex;
    flex-direction:column;
    width: 100%;
    opacity:0.9;
`

const Title=styled.text`
    margin :20px;
    padding:4px;
    opacity:0.9;
`

const Error=styled.text`
    margin :20px;
    color:red;
    font-size:10px;
    padding:4px;
    opacity:0.9;
`
const Phone= styled.input`
    margin :20px;
    padding:4px;
    opacity:0.9;
`

const OTP=styled.input`
    margin :20px;
    padding:4px;
    opacity:0.9;
`

const SendOTP=styled.button`
    display:flex;
    padding:3px;
    width:100px;
    align-items:center;
    justify-content:center;
`


const ConfirmOTP=styled.button`
    display:flex;
    padding:3px;
    width:100px;
    align-items:center;
    justify-content:center;
`

export default LoginForm