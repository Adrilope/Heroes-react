import { authReducer, types } from "../../../src/auth";


describe('Tests with authReducer', () => {
    
    test('should return the default state', () => {
        const state = authReducer({ logged: false }, {})

        expect( state ).toEqual({ logged: false })
    })

    test('should call the login y set the user', () => {
        const action = {
            type: types.login,
            payload: {
                name: 'Juan',
                id: '123'
            }
        }

        const state = authReducer({ logged: false }, action)

        expect( state ).toEqual({
            logged: true,
            user: action.payload
        })
    })

    test('should call logout and delete the user and set logged to false', () => {
        const state = {
            logged: true,
            user: { id: '123', name: 'Juan' }
        }

        const action = {
            type: types.logout
        }

        const newState = authReducer( state, action )
        
        expect( newState ).toEqual({ logged: false })
    })
})