import {test, expect} from '@playwright/test';

test('GET /products', async ({ request, context }) => {
    const apiUrl = "https://api.practicesoftwaretesting.com";
    const response = await request.get(`${apiUrl}/products`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(Array.isArray(responseBody.data)).toBe(true);
    expect(responseBody.data.length).toBe(9);
});

test('POST /users/login', async ({ request, context }) => {
    const apiUrl = "https://api.practicesoftwaretesting.com";
    const response = await request.post(`${apiUrl}/users/login`, {
        data: {
            email: "customer@practicesoftwaretesting.com",
            password: "welcome01"
        }
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.access_token).toBeDefined();
});

    test('GET /products/{id}', async ({ request }) => {
        const apiUrl = "https://api.practicesoftwaretesting.com";
        const thorHammerProduct = await request.get(`${apiUrl}/products/search?q=thor%20hammer`);
        expect(thorHammerProduct.status()).toBe(200);
        const thorHammerProductBody = await thorHammerProduct.json();
        expect(thorHammerProductBody.data.length).toBeGreaterThan(0);
        const productId = thorHammerProductBody.data[0].id;

        const response = await request.get(`${apiUrl}/products/${productId}`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.id).toBe(productId);
    });