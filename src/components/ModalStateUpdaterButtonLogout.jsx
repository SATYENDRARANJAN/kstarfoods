import MyContext from '../globalStore/MyContext.jsx';
import { Context } from '../globalStore/store.jsx';
import styled from 'styled-components'

function ModalStateUpdaterButtonLogout() {
  return (
      <MyContext.Consumer>
       { ({logout})=>(
            <Button onClick={logout}>
                Logout
            </Button>
         
        )}
      </MyContext.Consumer>
    );
}

export default ModalStateUpdaterButtonLogout;

const Button=styled.button`
`