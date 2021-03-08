import styled from 'styled-components'
import React ,{Component}from 'react'
import banner from './../assets/images/cheriebanner.png'
import {NavBar, Carousel} from '../components'
import placeholder from './../assets/images/placeholder.png'

class Home extends React.Component{
    constructor(){
        super()
        this.state={
             itemlist :[
                {   
                    id:'1',
                    prdname:'Choco jars',
                    prdimg:'placeholder.png',
                    prdheading:' chocolates make you happy ',
                    prdsubtext:'Rs. 123'
                },
                {   
                    id:'2',
                    prdname:'Choco Balls',
                    prdimg:'placeholder',
                    prdheading:' chocolates make you happy',
                    prdsubtext:'Rs. 123'
                },
                {   
                    id:'3',
                    prdname:'Gift Item 1',
                    prdimg:'placeholder',
                    prdheading:' chocolates make you happy',
                    prdsubtext:'Rs. 123'
                },
                {   
                    id:'4',
                    prdname:'Gift Item 1',
                    prdimg:'placeholder',
                    prdheading:' chocolates make you happy',
                    prdsubtext:'Rs. 123'
                }
            ]
        }
    }

    

    getItemView=(item)=>{
        return(
            <ItemRoot>
                <ItemImage src={item.prdimg} alt='prdimg'/>
                <ItemName>
                {item.prdname}
                </ItemName>
                <ItemDescription>
                {item.prdheading}
                </ItemDescription>
                <ItemSubtext>
                {item.prdsubtext}
                </ItemSubtext>
            </ItemRoot>
        )
    }
    render(){
        return(
            <Root>
                <NavBar />
                <Carousel/>
                {/* <ListItemsDiv>
                    { this.state.itemlist && this.state.itemlist.map(item =>this.getItemView(item))}
                </ListItemsDiv> */}
                <Footer>

                </Footer>
                
            </Root>
        )
    }
}


const Root = styled.div`
    display: flex;
    min-height:100vh;
    flex-direction: column;
    text-align: center
`

const Title = styled.h2`
    color: ${props => (props.color ? props.color : '#dddddd')};
    text-align: center;
`

const MenuBar =styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 30px;
    border: #eeeeee;
    margin-bottom: 20px
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
`

const ItemRoot = styled.div`
    width: 200px;
    height: 200 px;
    border: #4e4e4e
`
// background: url(${(props)=>props.imgUrl});  
const ItemImage = styled.img`
    background-image : url(${props => props.imgUrl});
    height: 200px;
    width : auto;
    background-size: contain;
`

const ItemName = styled.h5`
    text-align: center;
    text-size: 30px;
    color:#4e4e4e;
`


const ItemDescription = styled.div`
    align: center;
    text-size: 20px;   
    color: #4e4e4e; 
`


const ItemSubtext = styled.text`
    align: center;
    text-size: 12px;   
    color: #4e4e4e; 
`


const Footer = styled.div`

`


export  default  (Home);