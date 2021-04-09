import MyContext from './MyContext';
import React from 'react'

class MyProvider extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <MyContext.Provider>
                {this.props.children}
            </MyContext.Provider>
        );
    }
}


export { MyProvider};