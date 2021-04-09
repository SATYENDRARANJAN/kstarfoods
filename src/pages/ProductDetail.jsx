import React ,{Component}from 'react'
import {axiosInstance} from './../service/axiosservice.jsx'
import * as config from './../config.json' 
import styled from 'styled-components'
import MyContext from '../globalStore/MyContext.jsx';

class ProductDetail extends React.Component{
    constructor(){
        super();
        this.state= {
            qty:1,
            product_qty:{},
            item:{}
        }
    }

    getProductDetail =async (product_id)=>{
        await axiosInstance.get("/shop/products/"+product_id).
                    then(response=> 
                        {
                            console.log(response)
                            this.setState({item:response.data})
                            
                        }
                    )
    }

    componentDidMount= async ()=>{
        console.log(config.BASE_URL)
        let product_id = this.props.match.params.id
        let product_detail = await this.getProductDetail(product_id)

    }

    incrementQty=async()=>{
        this.setState({qty:parseInt(this.state.qty)+1})

    }
    
    decrementQty=async(item)=>{
        if ((this.state.qty-1) ===0){
            return
        }
        this.setState({qty:this.state.qty-1})
    }


    handleQtyChange=(e)=>{
        if (!Number(e.target.value)) {
            return;
        }
        this.setState({[e.target.name]:e.target.value})
    }


    addToCart=()=>{
        // http://localhost:8000/shop/add_to_cart/
        let params ={
            product_list:{
                [this.state.item.product_id]:this.state.qty
            }
        }
        axiosInstance.post("/shop/add_to_cart/",params).
                    then(response=> 
                        {
                            console.log(response)

                        }
                    )
    }
    
    gotoBuyNow=async(openM,openCart2M)=>{
        // this.props.history.push('/address')


        localStorage.setItem('product_detail',JSON.stringify(this.state.item))
        localStorage.setItem('qty',this.state.qty)



        // let params ={
        //         [this.state.item.product_id]:this.state.qty
        // }
        
        // console.log(params)
        // await axiosInstance.post("/shop/create_order/",params).
        // then(response=> 
        //     {
        //         console.log(response.data['order_id']);
        //         this.setState({'order_id':response.data['order_id']})
        //         localStorage.setItem('order_id',response.data['order_id'])

        //     }
        // )
        if (localStorage.getItem('token')){
            openCart2M()
        }
        else{
            openM()
        }
    }

    render(){
        return(
            <MyContext.Consumer>
            {({openM,openCart2M,order_id})=>(
        <Root>
            {/* <ProductTitle>   {this.state.item.product_name}</ProductTitle> */}
            <LeftWrapperDiv>
                <ProductImage src={this.state.item.img}/>
                <ProductCareInfoDiv>
                    PURITY GUARANTEED !
                </ProductCareInfoDiv>
            </LeftWrapperDiv>
            
            <RightWrapperDiv>
                <ProductName>
                   {this.state.item.heading}
                </ProductName>
                <Description>
                    {this.state.item.description}
                </Description>
                {/* <Category>
                   Category: {this.state.item.category}
                </Category>
                <SubCategory>
                    SubCategory :{this.state.item.subcategory}
                </SubCategory> */}
                <Price>Price : {this.state.item.price}</Price>
                <Category>
                   Bulk Order Price: {parseInt(0.8 * parseInt(this.state.item.price))}
                </Category>
                <ItemDiv style={{'width':'25%','background-color':'pink'}}>
                                        <Increment onClick={()=>{this.incrementQty()}}>+</Increment>
                                        <ItemQuantity value={this.state.qty} name='qty' onChange={this.handleQtyChange}></ItemQuantity>
                                        <Decrement onClick={()=>{this.decrementQty()}}>-</Decrement>
                                </ItemDiv>
                {localStorage.getItem('token') && <AddToCart onClick={()=>{this.addToCart()}}>Add to Cart</AddToCart>}
                <BuyNow onClick={()=>{this.gotoBuyNow(openM,openCart2M)}}> Buy Now</BuyNow>

            </RightWrapperDiv>

        </Root>
        )}
        </MyContext.Consumer>)
    }


}

export default (ProductDetail);


const Root =  styled.div`
    display:flex;
    flex-direction: row;
    // width : 100%;
    height: 100%;
    padding: 30px;
`
const ProductDescription= styled.div`
    display: flex;
    flex-direction: column;
    
`
const ProductTitle = styled.h2`
    color :#404040;
`
const LeftWrapperDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    margin-right:20px;
`
const ProductImage = styled.img`
    display: flex;
    width: 100%;
    height: 300px;
    object-fit: contain;
    padding-right: 20px;
`
const ProductCareInfoDiv = styled.text`
    display: flex;
    font-size:20px;

`
const RightWrapperDiv = styled.div`
    display: flex;
    flex-direction: column;
    // width: 40%;
`

const ProductName=styled.h3`
`
const Category = styled.text`
font-size:12`

const SubCategory = styled.h1``

const Price =styled.text`
    font-size : 16px
`

const AddToCart= styled.button`
    padding:10px 
`
const BuyNow= styled.button`
    padding:10px 
`
const Description = styled.text`
    font-size :20px;
`
const ItemDiv=styled.div`
    display:flex;
    flex-direction:column;
`


const ItemQuantity = styled.input`

`
const Increment=styled.button``
const Decrement=styled.button``
const Line =styled.div`
    width:100%;
    height:1px;
    margin:30px;
    background-color:#4e4e4e;

`