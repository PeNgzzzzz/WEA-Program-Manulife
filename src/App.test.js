import App from './App';
import React from 'react';
import { render } from "@testing-library/react";
import '@testing-library/jest-dom'

test("Initial Render fetches data from Api", async () => {
    fetch("https://restapi-wea202.herokuapp.com/api/exercises")
      .then((res) => res.json())
        .then((data) => { 
            expect(data).toBeCalledTimes(1);
            expect(data).toHaveLength(202)
       })
      .catch((error) => {
        console.log(error);
      })
    
})

test("App Renders On Startup", () => {
    const app = render(<App />)
    expect(app).toBeDefined();
})