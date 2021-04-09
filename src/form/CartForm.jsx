import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import MyContext from '../globalStore/MyContext';
import placeholder from '../assets/images/placeholder.png'
import {axiosInstance} from './../service/axiosservice.jsx'
import { withRouter } from 'react-router'

class CartForm extends React.Component{
    constructor(props){
        super(props)
        this.state={          
            product_qty:{},
            amount:0,
            total:0,
            tax:0,
            cartlist:[]
        }
    }

    componentDidMount = async()=>{
        
        const itemsList = await  axiosInstance.get("/shop/get_cart_details/").
        then(response=> 
            {
                console.log(response.data)
                this.setState({cartlist:response.data})

            }
        )

        for( var item of   this.state.cartlist){
            // this.setState({ product_qty:{[`${item.product.product_id}`]:`${item.quantity}`}})
            await  this.setState({product_qty:{...this.state.product_qty,[`${item.product.product_id}`]: ((parseInt(`${item.quantity}`)))}})

        }

    }

    removeItemFromCart=(key)=>{
        debugger
        let params={
            "product_id":key
        }
        const itemsList =  axiosInstance.post("/shop/remove_item_from_cart/",params).
        then(response=> 
            {
                console.log(response.data)
                this.setState({cartlist:response.data})

            }
        )
    }


    onIncrementItem=async (item)=>{
        await  this.setState({product_qty:{...this.state.product_qty,[`${item.product.product_id}`]: (parseInt(this.state.product_qty[`${item.product.product_id}`])+1)}})
    }

    onDecrementItem=async(item)=>{
        if (((this.state.product_qty[`${item.product.product_id}`])-1)==0){
            return
        }
        await  this.setState({product_qty:{...this.state.product_qty,[`${item.product.product_id}`]: (parseInt(this.state.product_qty[`${item.product.product_id}`])-1)}})
    }




    printRows=(item)=>{
        return(
                <Row>
                <ItemDiv style={{'width':'25%','background-color':'red','padding':'4px'}}>
                        <ItemPic src={placeholder}></ItemPic>
                </ItemDiv>
                <ItemDiv style={{'width':'50%','background-color':'yellow'}}>
                    <ItemName>{item.product.product_name}</ItemName>
                    <ItemPrice>Price per piece:{item.product.price}</ItemPrice>
                    <ItemPrice> Total Price:{item.product.price * parseInt(this.state.product_qty[`${item.product.product_id}`])}</ItemPrice>
                </ItemDiv>
                <ItemDiv style={{'width':'25%','background-color':'pink'}}>
                        <Increment  onClick={()=>this.onIncrementItem(item)}>+</Increment>
                        <ItemQuantity>{this.state.product_qty[`${item.product.product_id}`] }</ItemQuantity>
                        <Decrement  onClick={()=>this.onDecrementItem(item)}>-</Decrement>
                        <Remove onClick={()=>this.removeItemFromCart(item.product.product_id)}>Remove</Remove>
                </ItemDiv>
            </Row>
        )
    }
  

    getTotal=(that)=>{
        var amount=0
        for (var item of this.state.cartlist){
            amount += item.product.price * this.state.product_qty[`${item.product.product_id}`]
        }
        // thats.setState({amount})
        return amount
    }

    getTax=(that)=>{
        var tax =0;
        tax =Math.ceil(0.18 * parseInt(this.getTotal()))
        // that.setState({tax})
        return tax
    }
    
    getDiscount=()=>{}

    getPayableAmount=()=>{

        return this.getTotal() + this.getTax() + " INR"
    }

    removeItem=()=>{

    }

    buyNow=async(closeCartM,openAddress)=>{
        //create order for selected products in cart
        let params ={
            ...this.state.product_qty

            }
        
        console.log(params)
        await axiosInstance.post("/shop/create_order/",params).
        then(response=> 
            {
                console.log(response.data['order_id']);
                this.setState({'order_id':response.data['order_id']})

            }
        )

         
        // closeCartM(s); 
        openAddress(this.state.order_id);
  
    }

    render(){
        let div=[]
        
        this.state.cartlist && this.state.cartlist.map((item)=>{div.push(this.printRows(item))})
        return(
            <MyContext.Consumer>
                {({jwt,setJwt,closeCartM,openAddress})=>(
                    <Root>
                        <CartWrapper>
                           {/* {this.state.cartlist && this.state.cartlist.map((item)=>{this.printRows(item)})} */}
                            {div}
                            <Line/>
                            <LastRow style={{'display':'flex','flex-direction':'column'}}>
                                <LastRow>
                                <TotalPriceTitle>Total : {this.getTotal()} </TotalPriceTitle>
                                {/* <TotalPrice></TotalPrice> */}
                                </LastRow>
                                <LastRow>
                                <TotalPriceTitle>Tax : {this.getTax()}</TotalPriceTitle>
                                {/* <TotalPrice>{this.getTax()}</TotalPrice> */}
                                </LastRow>
                                {/* <LastRow>
                                <TotalPriceTitle>Discount: </TotalPriceTitle>
                                <TotalPrice>{this.getDiscount()}</TotalPrice>
                                </LastRow> */}
                                <LastRow >
                                <TotalPriceTitle>Payable Amount : {this.getPayableAmount()}</TotalPriceTitle>
                                {/* <TotalPrice>{this.getPayableAmount()}</TotalPrice> */}
                                </LastRow>
                                <BuyNow onClick={()=>this.buyNow(closeCartM,openAddress)}>Buy Now</BuyNow>

                            </LastRow>

                        </CartWrapper>

                    </Root>
                )}
            </MyContext.Consumer>

        )
    }

}

const Root =styled.div`
    display:flex;
    flex-direction:column;
    // width:100%;
    height:100vh;
    background-color:#4e4e4e;
`

const CartWrapper=styled.div`
    display:flex;
    flex-direction:column;
    // width:100%;
    height:auto;
    margin:40px;
    background-color:#4e4e4e;

`

const Row= styled.div`
    display:flex;
    flex-direction:row;
    height:100px;
    margin-bottom:5px;
`

const ItemPic=styled.img`
    display:flex;
    // width:100%;
    height:100%;
`
const ItemDiv=styled.div`
    display:flex;
    flex-direction:column;
`


const ItemName = styled.text`
    font-size:16px;
`
const ItemPrice = styled.text`
    font-size:18px;
    bold:true;
`

const ImageDiv=styled.div`
    width:100%;
    height:100%;
    margin:4px;
`

const ItemQuantity = styled.text`

`
const Increment=styled.button``
const Decrement=styled.button`
`
const Remove=styled.button`
display:flex;

    margin-top:10px;
`
const Line =styled.div`
display:flex;
    height:1px;
    margin:30px;
    background-color:#ffffff;
`

const LastRow = styled.div`
    // display:flex;
    // width: 100%;
    // height: 60px;
    background-color:#f4f4f4;
    // align-items:center;
    padding:12px;
`
const TotalPriceTitle = styled.text`
display:flex;

    font-size:18px;
    bold:true;
    
`

const TotalPrice= styled.text`
display:flex;

    font-size:18px;
    bold:true;
`

const BuyNow= styled.button`
    // display:flex;   
    padding:10px 
`
export default withRouter(CartForm)