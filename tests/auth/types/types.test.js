import { types } from "../../../src/auth/types/types";


describe('Tests with "Types.js"', () => {
    
    test('should return the types', () => {
        expect(types).toEqual({
            login:  '[Auth] Login',
            logout: '[Auth] Logout',
        })  
    })
})