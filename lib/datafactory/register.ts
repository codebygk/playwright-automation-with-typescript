import { expect, request } from '@playwright/test';


export async function registerUser(email: string, password: string) {
    const createRequestContext = await request.newContext({
    baseURL: process.env.API_BASE_URL,
});

   const response = await createRequestContext.post('/users/register', {
        data: { 
            first_name: "TestUser", 
            last_name: "One", 
            dob: "2000-01-01", 
            phone: "9876543210", 
            email: email, 
            password: password, 
            address: 
            { 
                street: "Test Street", 
                city: "Test City", 
                state: "Test State", 
                country: "IN", 
                postal_code: "600001" 
            } 
        },
    });
    expect(response.status()).toBe(201);
    return response.status();
}