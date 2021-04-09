import React, {useEffect, useContext} from 'react';
import {Context} from '../globalStore/store.jsx'

export const is_authenticated_notexpired=()=>{
    let jwt=localStorage.getItem('token')
    return !(jwt==null || jwt==''||jwt==undefined)
    // check expiry here 
}