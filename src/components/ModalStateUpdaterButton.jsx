import MyContext from '../globalStore/MyContext.jsx';
import { Context } from '../globalStore/store.jsx';
import styled from 'styled-components'

function ModalStateUpdaterButton() {
//   // The Theme Toggler Button receives not only the theme
//   // but also a toggleTheme function from the context
  return (
      <MyContext.Consumer>
       { ({openM})=>(
     
            <Button onClick={openM}>
                Login
            </Button>
         
        )}
      </MyContext.Consumer>
    );
//     <ThemeContext.Consumer>
//       {({theme, toggleTheme}) => (
//         <button
//           onClick={toggleTheme}
//           style={{backgroundColor: theme.background}}>
//           Toggle Theme
//         </button>
//       )}
//     </ThemeContext.Consumer>
//   );
}

export default ModalStateUpdaterButton;

const Button=styled.button`
`