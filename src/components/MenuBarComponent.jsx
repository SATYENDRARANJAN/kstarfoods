import axios from 'axios'
import React from 'react'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import MyContext from '../globalStore/MyContext'
import {axiosInstance} from '../service/axiosservice'

class MenuBarComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
        }
    }

    componentDidMount=async()=>{
        // await axiosInstance.get("/shop/get_tags_and_products/").
        // then(response=> 
        //     {
        //         console.log(response)
        //         localStorage.setItem('taggedProducts',response.data.taggedproducts)
        //         this.setState({taggedproducts:response.data.taggedproducts})
                
        //     }
        // )

        await axiosInstance.get('/shop/get_tags').
        then(response=>{
            console.log(response)
            localStorage.setItem('tags',response.data)
            this.setState({tags:response.data})
        })
        console.log(this.state.tags)
    }


    menuClick=(tag,setSelectedTag)=>{
        setSelectedTag(tag)
        localStorage.setItem('tag',tag)
        const params = {'tag':tag}
        this.props.history.push({pathname:'/',params})
        
    }

    printMenu = (tags,setSelectedTag) =>{
        return (
            <>
             { tags.map(item => (
                <MenuItems key={item.id} id={item.id} onClick={()=>this.menuClick(item.tag_name,setSelectedTag) }>
                    {item.tag_name}
                </MenuItems>
             ))}
            </>
           )
    }

    render(){
        let div ={}
        return(
            <MyContext.Consumer>
                {({setSelectedTag})=>(
                <MenuBar>
                    {(this.state.tags !=null && this.state.tags !=undefined) &&  this.printMenu(this.state.tags,setSelectedTag)}
                 </MenuBar>
                )}
               
            </MyContext.Consumer>
        )
    }
}


const Root = styled.div`
    display: flex;
    flex-direction: column;
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

export default withRouter(MenuBarComponent) 
// export default withRouter(connect(mapStateToProps, matchDispatchToProps)(MenuBarComponent));
