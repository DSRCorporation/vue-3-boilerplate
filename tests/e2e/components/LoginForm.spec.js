/// <reference types="cypress" />
import { mount } from "@cypress/vue";
import LoginForm from "@/components/LoginForm";

// todo components testing support for vue 3 is still in development (at leats it doesn't work for now), come back to it later
describe("LoginForm", () => {
  it("renders the component", () => {
    mount(LoginForm);
  });
});
