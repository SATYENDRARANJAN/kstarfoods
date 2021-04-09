import styled from 'styled-components'
import React ,{Component}from 'react'
import banner from './../assets/images/cheriebanner.png'
import {axiosInstance} from './../service/axiosservice.jsx'
import placeholder from './../assets/images/placeholder.png'
import * as config from './../config.json' 
import Service from '../service/service'
import MyContext from '../globalStore/MyContext'
import { withRouter } from 'react-router'

const images = require.context('./../assets/images', true);

class Home extends React.Component{
    static contextType = MyContext
    constructor(props){
        super(props)
        this.state={
             itemlist :[],
             tag:''
        }
    }

    componentDidMount=async()=>{
        console.log(config.BASE_URL)
        let itemlist = this.props.itemlist
        await this.setState({itemlist:itemlist})
        // axiosInstance.get("/shop/products/list/" + tag).
        // then((response)=> 
        //     {
        //         console.log(response)
        //         // response && this.setState({itemlist:response.data.products},()=>{
        //             // console.log(this.state.itemlist)
        //             // {this.state.itemlist &&  this.state.itemlist.map((item) =>{div.push(this.getItemView(item))})}
        //             // return div
        //         // })
        //         // response && response.data.products.map((item) =>{div.push(this.getItemView(item))})
        //         this.setState({itemlist:response.data.products})
                
        //     }
        // )
        this.context.setSelectedTag('all')
        const params = {'tag':'all'}
        this.props.history.push({pathname:'/',params})
        
    }

    componentDidUpdate=(prevProps, prevState)=> {
        // console.log(this.props)
        //  this.setState({tag})
        // if (prevState.projetct) { //Ensuring This is not the first call to the server
        //   if(projectId !== prevProps.match.params.projectId ) {
        //     this.GetProject(projectId); // Get the new Project when project id Change on Url
        //   }
        // }
        // axiosInstance.get("/shop/products/list/" + tag).
        // then((response)=> 
        //     {
        //         console.log(response)
        //         // response && this.setState({itemlist:response.data.products},()=>{
        //             // console.log(this.state.itemlist)
        //             // {this.state.itemlist &&  this.state.itemlist.map((item) =>{div.push(this.getItemView(item))})}
        //             // return div
        //         // })
        //         // response && response.data.products.map((item) =>{div.push(this.getItemView(item))})
        //         this.setState({itemlist:response.data.products})
                
        //     }
        // )
    }

    goToProductDetail=(product_slug)=>{
        this.props.history.push('/product/'+product_slug)
    }

    getItemView=(item)=>{
        return(
            <ItemRoot id={item.product_slug} onClick={()=>this.goToProductDetail(item.product_slug)}>
                <ItemImage src={item.img} alt='prdimg'/>
                <ItemName>
                {item.product_name}
                </ItemName>
                <ItemDescription>
                {item.heading}
                </ItemDescription>
                <ItemSubtext>
                {item.subtext}
                </ItemSubtext>
                <View>View</View>
            </ItemRoot>
        )
    }

    renderProductList =  (selectedTag)=>{
        let div=[]
        var that =this
        var item=[]
        this.props.itemlist.map((item)=>{div.push(this.getItemView(item))})
        
        return div
    }

    setTag =(tag)=>{
        this.setState({tag})
    }

    render(){
        return(
            <MyContext.Consumer>
                {({selectedtag,setSelectedTag})=>(    
                    <Root>
                    <Banner/>
                    <ListItemsDiv>
                        {/* { this.state.itemlist && this.state.itemlist.map(item =>this.getItemView(item))} */}
                        { this.renderProductList(this.props.itemlist)}
                    </ListItemsDiv>
                    <Footer>

                    </Footer>
                    
                </Root>
                ) 
            }
            </MyContext.Consumer>
        )
    }
    
}


const Root = styled.div`
    display: flex;
    height:100%;
    flex-direction: column;
    margin: 16px;
    border: 2px solid #4e4e4e;
    text-align: center

`

const Title = styled.h2`
    color: ${props => (props.color ? props.color : '#dddddd')};
    text-align: center;
`


// style="background:yourimage.jpg no-repeat;height:imageheight px;width:imagewidth px"
const Banner = styled.img`
    margin: 20px 60px 20px 60px;
    background-image: url(${banner});
    height:300px;
    width:auto;
    border: #4e4e4e;
    background-repeat: repeat;
    background-size: contain;
`

const ListItemsDiv= styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 20px 60px 20px 60px;
    border: #4e4e4e;
    width: auto;
`

const ItemRoot = styled.div`
    display:flex;
    flex-direction:column;
    position:relative;
    width: 200px;
    margin:20px;
    padding:5px;
    border: 2px solid #4e4e4e;

`
// background: url(${(props)=>props.imgUrl});  
const ItemImage = styled.img`
    height: 200px;
    width : auto;
    background-size: contain;
    object-fit:contain;
`

const ItemName = styled.h5`
    display:flex;
    justify-content:center;
    margin-top:0;
    padding-top:0;
    text-size: 30px;
    height:18px;
    color:#000;
`


const ItemDescription = styled.div`
    display:flex;
    align-items: center;
    justify-content:center;
    margin-top:0;
    padding-top:0;
    text-size: 20px;   
    height:40px;
    color: #4e4e4e; 
`


const ItemSubtext = styled.text`
    display:flex;
    align-items: center;
    text-size: 12px;   
    color: #4e4e4e; 
`
// const View =styled.div`
//     display:flex;
//     position:absolute; 
//     height:10px;
//     padding:3px;
//     bottom: 5px;
//     right:0;
//     float:right;
// `

const View =styled.div`
    display:flex;
    height:10px;
    padding:3px;
    bottom: 5px;
    right:0;
    float:right;
`

const Buy =styled.div`
    display:flex;
    height:10px;
    padding:3px;
    bottom: 5px;
    right:0;
    float:right;
`

const Footer = styled.div`

`


export  default  Home