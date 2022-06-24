import React from 'react';
import SubmitForm from './Submit';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {render, screen} from '@testing-library/react'
import JestDom from '@testing-library/jest-dom';

describe('Testing the workout selection page', () => {
    test('Should default to \"Get Mobile\"', () => {
      render(
        <Router>
          <SubmitForm />
        </Router>);
      expect(screen.getByRole('radio', {name: 'Get Mobile'})).toBeChecked();
    });
});