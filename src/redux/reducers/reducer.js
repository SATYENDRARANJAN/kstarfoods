const initState = {
    cart: []
}

export default function (state = initState, action){
    
    switch(action.type){
        case 'ADD_ITEM':
            state.cart.push(action.cart)
            return state.cart

        default:
            return state
    }
}
