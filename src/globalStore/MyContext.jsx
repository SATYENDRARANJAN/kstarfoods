import React from 'react';

const MyContext = React.createContext({
    loginopen:false,
    openM:()=>{},
    closeM:()=>{},
    jwt:'',
    setJwt:()=>{},
    openAddress:()=>{},
    selectedtag:''
});
export default MyContext;
