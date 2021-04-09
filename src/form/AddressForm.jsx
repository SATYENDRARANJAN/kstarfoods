import React from 'react'
import styled from 'styled-components'
import { Formik } from 'formik';
import MyContext from '../globalStore/MyContext';
import {axiosInstance} from './../service/axiosservice.jsx'
import * as Yup from 'yup';


class Address extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }

    componentDidMount=()=>{

    }
    addressSchema =()=> Yup.object().shape({
        firstname: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        lastname: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        'street_1': Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        'street_2': Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        city: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        pincode: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        phone: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        message: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
      });

    update_order=async(payment_id,rporder_id)=>{
        alert('thanks')
        // update on server and mark status
        let params={
            rporder_id:rporder_id
        }
        await axiosInstance.post('/shop/place_order/',params)
    }

    handleSubmit=async ( values,{setSubmitting})=>{
        let params=values
        var options={}
        var redirect_url=null
        const that =this
        await axiosInstance.post("/shop/delivery_address/",params).
            then(response=> 
                {
                console.log(response.data)
                options=response.data
                console.log(options)
                options["handler"]= function (response){
                    alert(response.razorpay_payment_id);
                    alert(response.razorpay_order_id);
                    that.update_order(response.razorpay_payment_id,response.razorpay_order_id)
                    localStorage.setItem('payment_id',response.razorpay_payment_id)
                    localStorage.setItem('rporder_id',response.order_id)
                    window.location.href='/payment_success';
                }
                /**
                  * You can track the modal lifecycle by * adding the below code in your options
                  */
                options["modal"]= {
                        "ondismiss": function(){
                            console.log('Checkout form closed');
                        }
                    }                    
                }
            )
       
                
        var rzp1 = new window.Razorpay(options);
                rzp1.on('payment.failed', function (response){
                    alert(response.error.code);
                    alert(response.error.description);
                    alert(response.error.source);
                    alert(response.error.step);
                    alert(response.error.reason);
                    alert(response.error.metadata.order_id);
                    alert(response.error.metadata.payment_id);
                });
            rzp1.open();
        
            setTimeout(()=>{
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
            },400)
    }

    render(){
        return(
            <MyContext.Consumer>
            {({closeAddress,order_id})=>(

            <Root>
                <Title>
                    Delivery Address
                </Title>
                <Formik
                    initialValues={{
                                    firstname:'',
                                    lastname:'',
                                    street_1:'',
                                    street_2:'',
                                    city:'',
                                    pincode:'',
                                    phone:'',
                                    message:'',
                                    order_id:order_id,
                                    }}                    
                    validationSchema={this.addressSchema}
                    onSubmit={this.handleSubmit}>   
                {
                    ({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting})=>(
                        <Form onSubmit={handleSubmit}>
                            <Input
                             id="firstname"
                             name="firstname"
                             type="text"
                             placeholder='First Name of Recipient'
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.firstname}/>
                             {errors.firstname && touched.firstname ? (<ErrorText>{errors.firstname}</ErrorText>) : null}
                             <Input
                             id="lastname"
                             name="lastname"
                             type="text"
                             placeholder='Last Name of Recipient'
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.lastname}/>
                             {errors.lastname && touched.lastname ? (<ErrorText>{errors.lastname}</ErrorText>) : null}
                             <Input
                             id="street_1"
                             name="street_1"
                             type="text"
                             placeholder='Address'
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.street_1}/>
                             {errors.street_1 && touched.street_1 ? (<ErrorText>{errors.street_1}</ErrorText>) : null}
                             <Input
                             id="street_2"
                             name="street_2"
                             type="text"
                             placeholder='Address (Contd.)'
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.street_2}/>
                             {errors.street_2 && touched.street_2 ? (<ErrorText>{errors.street_2}</ErrorText>) : null}
                            <Input
                             id="city"
                             name="city"
                             type="text"
                             placeholder='City'
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.city}/>
                             {errors.city && touched.city ? (<ErrorText>{errors.city}</ErrorText>) : null}
                             <Input
                             id="state"
                             name="state"
                             type="text"
                             placeholder='State'
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.state}/>
                             {errors.state && touched.state ? (<ErrorText>{errors.state}</ErrorText>) : null}
                             <Input
                             id="pincode"
                             name="pincode"
                             type="number"
                             placeholder='Pincode'
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.pincode}/>
                             {errors.pincode && touched.pincode ? (<ErrorText>{errors.pincode}</ErrorText>) : null}
                             <Input
                             id="phone"
                             name="phone"
                             type="number"
                             placeholder='Phone no. of the recipient of order'
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.phone}/>
                             {errors.phone && touched.phone ? (<ErrorText>{errors.phone}</ErrorText>) : null}
                             <Input
                             id="message"
                             name="message"
                             type="text"
                             placeholder='Special Message'
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.message}/>
                             {errors.message && touched.message ? (<ErrorText>{errors.message}</ErrorText>) : null}
                            <Submit type="submit">Submit</Submit>
                        </Form>
                    )
                }
                </Formik>
            </Root>
            )}
            </MyContext.Consumer>
        )
    }

}

const Root= styled.div`
    display:flex;
    width:100%;
    height:100%;
    flex-direction:column;
    background-color:#546546;
    
`

const Input= styled.input`
height:30px;
margin-bottom:4px;
`

const Title=styled.div`
display:flex;
margin:20px;
color:#f4f4f4;
font-size:30px;
`

const Form = styled.form`
display:flex;
flex-direction:column;
padding:24px;
`

const Submit=styled.button`
    height:56px;
`

const ErrorText=styled.div`
    display:flex;
    font-size:10.5px;
    font-color:#343434;
    margin-bottom:8px;

`

export default Address