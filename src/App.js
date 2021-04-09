import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch ,Route} from 'react-router-dom';
import styled from 'styled-components'
import Home from './pages/Home.jsx';
import Address from './pages/Address.jsx';
import ProductDetail from './pages/ProductDetail.jsx'
import PaymentSuccess from './pages/PaymentSuccess.jsx'
import {Title} from './components/Title.jsx'
import MenuBarComponent from './components/MenuBarComponent.jsx'
// import  AddToCartBtnTop from './components/AddToCartBtnTop.jsx'
import {AddToCartBtnTop} from './components/Title.jsx'
import MyContext from './globalStore/MyContext';
import {Helmet} from "react-helmet";
import {axiosInstance} from './service/axiosservice.jsx'

import Modal from './modal/Modal';
import LoginForm from './form/LoginForm';
import CartForm from './form/CartForm'
import CartForm2 from './form/CartForm2'
import AddressForm from './form/AddressForm'
import {MyProvider,MyConsumer} from './globalStore/MyProvider.jsx'
import React from 'react';
class App extends React.Component{
  static whyDidYouRender = true

  constructor(props){
    super(props)
    this.state={
      loginopen:false,
      openM:this.openM,
      closeM:this.closeM,
      jwt:'',
      setJwt:this.setJwt,
      resetJwt:this.resetJwt,
      cartopen:false,
      openCartM:this.openCartM,
      closeCartM:this.closeCartM,
      cart2open:false,
      openCart2M:this.openCart2M,
      closeCart2M:this.closeCart2M,
      addressOpen:false,
      openAddress:this.openAddress,
      closeAddress:this.closeAddress,
      order_id:'',
      selectedtag:'all',
      setSelectedTag:this.setSelectedTag,
      tags:[],
      setTags:this.setTags,
      itemlist:[],
      logout:this.logout
    }
  }

  is_logged_in=()=>{
    let jwt=localStorage.getItem('token')
    console.log(jwt)
    return !(jwt===null || jwt===''||jwt===undefined)
  }

openAddress=(order_id)=>{
  this.setState({addressOpen:true,order_id})
}

closeAddress=()=>{
  this.setState({addressOpen:false})
}

openCart2M=()=>{
  this.setState({cart2open:true})
}

closeCart2M=()=>{
  this.setState({cart2open:false})
}

openCartM=()=>{
  this.setState({cartopen:true})
}

closeCartM=()=>{
  this.setState({cartopen:false})
}

logout =()=>{
  localStorage.clear()
  this.setState({jwt:''})

}

closeM=()=>{
  this.setState({loginopen:false})
}

openM=()=>{
  this.setState({loginopen:true})
}

setJwt=(token)=>{
  this.setState({jwt:token})
}

resetJwt=()=>{
  this.setState({jwt:''})
}

setSelectedTag=async(tag_name)=>{
   localStorage.setItem('tag',tag_name)
   await this.setState({selectedtag:tag_name})
  axiosInstance.get("/shop/products/list/" + this.state.selectedtag).
        then((response)=> 
            {
                console.log(response)
                // response && this.setState({itemlist:response.data.products},()=>{
                    // console.log(this.state.itemlist)
                    // {this.state.itemlist &&  this.state.itemlist.map((item) =>{div.push(this.getItemView(item))})}
                    // return div
                // })
                // response && response.data.products.map((item) =>{div.push(this.getItemView(item))})
                this.setState({itemlist:response.data.products})
                
            }
        )
}

setTags =(tags)=>{
  this.setState({tags})
}

render(){
  const {loginopen,openM,closeM,jwt,setJwt,cartopen,openCartM,closeCartM,cart2open,openCart2M,closeCart2M,resetJwt,addressOpen,openAddress,closeAddress,order_id,selectedtag,setSelectedTag,tags,setTags,logout}=this.state
  return (
    <BrowserRouter>
      <MyContext.Provider value={{loginopen:loginopen,openM:openM,closeM:closeM,jwt:jwt,setJwt:setJwt,
        cartopen:cartopen,openCartM:openCartM,closeCartM:closeCartM,cart2open:cart2open,openCart2M:openCart2M,closeCart2M:closeCart2M,resetJwt:resetJwt,
        addressOpen:addressOpen,openAddress:openAddress,closeAddress:closeAddress,order_id:order_id,selectedtag:selectedtag,setSelectedTag:setSelectedTag,tags:tags,setTags:setTags,logout:logout}}>
          <Root className="App" >
            {/* <Navbar/> */}
            <Header>
            <AddToCartBtnTop is_logged_in={localStorage.getItem('token')}  openCartM={openCartM}/>
              <Title/>
            <MenuBarComponent/>
            </Header>
            <Modal open={this.state.loginopen} close={this.closeM}>
                <LoginForm/>
            </Modal>
            <Modal open={this.state.cartopen} close={this.closeCartM}>
                <CartForm />
            </Modal>
            <Modal open={this.state.cart2open} close={this.closeCart2M}>
                <CartForm2 />
            </Modal>
            <Modal open={this.state.addressOpen} close={this.closeAddress}>
                <AddressForm />
            </Modal>
            <Switch>
                <Route path ="/product/:id"   component={ProductDetail}/>
                <Route path ="/payment_success"   component={PaymentSuccess}/>
                <Route path ="/address"   component={Address}/>
                {/* <Route path='/' exact component={Home}/> */}
                <Route path='/' exact render={(props) => ( <Home {...props} itemlist={this.state.itemlist} />)}/>
            </Switch>
          </Root>
        </MyContext.Provider>
    </BrowserRouter>
    )
  }
}

export default App;
// export default withRouter(connect(mapStateToProps)(App));

const Header = styled.div`
  display: flex;
  flex-direction:column;
  position:relative;
  width : 100%;
`
const Root=styled.div`
display:flex;
flex-direction:column;
width:100%;
height:100%;
`

const ModalTitle=styled.text``