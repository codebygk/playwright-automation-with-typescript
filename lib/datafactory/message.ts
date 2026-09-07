import { expect, request } from "@playwright/test";
import fs from 'fs';
export async function sendMessage(name: string, subject: string, message: string, authFilePath: string){
    const authData = JSON.parse(fs.readFileSync(authFilePath, 'utf-8'));
    const token = authData.origins[0].localStorage.find((x: {name: string}) => x.name == 'auth-token').value;
    const createRequestContext = await request.newContext({
        baseURL: process.env.API_BASE_URL
    })

const response = await createRequestContext.post('/messages', {
  data: {"name": name,"subject": subject ,"message": message},
  headers: {
    authorization: `Bearer ${token}`,
  }
});
expect(response.status()).toBe(200);
return await response.json(); 
}
