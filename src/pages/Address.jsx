import React from 'react'
import styled from 'styled-components'
import { Formik } from 'formik';
class Address extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }

    componentDidMount=()=>{

    }

    render(){
        return(
            <Root>
                <Formik
                    initialValues={{firstname:'',
                                    lastname:'',
                                    street_1:'',
                                    street_2:'',
                                    city:'',
                                    pincode:'',
                                    phone:'',
                                    message:''
                                }}

                    onSubmit={(values,{setSubmitting})=>{
                        setTimeout(()=>{
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        },400)

                    }}
                >   
                {
                    ({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting})=>{
                        <form onSubmit={handleSubmit}>
                            <input
                             id="firstName"
                             name="firstName"
                             type="text"
                             placeholder='First Name'
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.firstName}/>
                             <input
                             id="lastName"
                             name="lastName"
                             type="text"
                             placeholder='Last Name'
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.firstName}/>
                             <input
                             id="street1"
                             name="street1"
                             type="text"
                             placeholder='Address'
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.firstName}/>
                             <input
                             id="street2"
                             name="street2"
                             type="text"
                             placeholder='Address (Contd.)'
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.firstName}/>
                            <input
                             id="city"
                             name="city"
                             type="text"
                             placeholder='City'
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.firstName}/>
                             <input
                             id="state"
                             name="state"
                             type="text"
                             placeholder='State'
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.firstName}/>
                             <input
                             id="pincode"
                             name="pincode"
                             type="number"
                             placeholder='Pincode'
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.firstName}/>
                             <input
                             id="phone"
                             name="phone"
                             type="number"
                             placeholder='State'
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.firstName}/>
                            <button type="submit">Submit</button>
                        </form>

                    }
                }
                

                </Formik>
            </Root>
        )
    }

}

const Root= styled.div`
    display:flex;
    flex-direction:column;
`

export default Address