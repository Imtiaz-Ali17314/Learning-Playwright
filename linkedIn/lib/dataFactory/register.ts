import { request, expect } from "@playwright/test";

export async function registerUser(email: string, password: string) {
  const apiUrl = process.env.API_URL;
  const createRequestContext = await request.newContext();
  const response = await createRequestContext.post(apiUrl + "/users/register", {
    data: {
      first_name: "Imtiaz",
      last_name: "Ali",
      dob: "2002-03-24",
      phone: "222222222222222",
      email: email,
      password: password,
      address: {
        street: "003",
        city: "Karachi",
        state: "Asia",
        country: "PK",
        postal_code: "55660",
      },
    },
  });

  expect(response.status()).toBe(201);
  return response.status();
}
