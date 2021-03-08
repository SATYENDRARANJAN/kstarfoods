import { BrowserRouter, Switch ,Route} from 'react-router-dom';
import Pages from './pages'
import {Suspense} from 'react'
import rootStore from './redux/store'
import {Provider} from 'react-redux'


function App() {
  return (
    <BrowserRouter>
      <Provider store={rootStore}>

        <Suspense fallback={<div>Loading...</div>}> 
          <Switch>
            <Route path='/' component={Pages.HomePage}/>
          </Switch>
        </Suspense>
      </Provider>
      
        
    </BrowserRouter>
  );
}

export default App;
