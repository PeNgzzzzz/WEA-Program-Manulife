import React from 'react';
import SubmitForm from './Submit';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {fireEvent, render, screen} from '@testing-library/react'
import JestDom from '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

describe('Testing the workout selection page', () => {
    test('Should default to \"Get Mobile\"', () => {
      render(
        <Router>
          <SubmitForm />
        </Router>);
      expect(screen.getByRole('radio', {name: 'Get Mobile'})).toBeChecked();
    });

    test('Should update goal buttons when clicked', () => {
      render(
        <Router>
          <SubmitForm />
        </Router>);
      // Gain Strength button
      fireEvent.click(screen.getByRole('radio', {name: 'Gain Strength'}));
      expect(screen.getByRole('radio', {name: 'Gain Strength'})).toBeChecked();
      // Build Muscle button
      fireEvent.click(screen.getByRole('radio', {name: 'Build Muscle'}));
      expect(screen.getByRole('radio', {name: 'Build Muscle'})).toBeChecked();
      // Lose Fat button
      fireEvent.click(screen.getByRole('radio', {name: 'Lose Fat'}));
      expect(screen.getByRole('radio', {name: 'Lose Fat'})).toBeChecked();
    });

    test('Should check day buttons without unchecking others', () => {
      render(
        <Router>
          <SubmitForm />
        </Router>);
      fireEvent.click(screen.getByRole('checkbox', {name: 'Sunday'}));
      fireEvent.click(screen.getByRole('checkbox', {name: 'Monday'}));
      fireEvent.click(screen.getByRole('checkbox', {name: 'Tuesday'}));
      fireEvent.click(screen.getByRole('checkbox', {name: 'Wednesday'}));
      fireEvent.click(screen.getByRole('checkbox', {name: 'Thursday'}));
      fireEvent.click(screen.getByRole('checkbox', {name: 'Friday'}));
      fireEvent.click(screen.getByRole('checkbox', {name: 'Saturday'}));
      expect(screen.getByRole('checkbox', {name: 'Sunday'})).toBeChecked();
      expect(screen.getByRole('checkbox', {name: 'Monday'})).toBeChecked();
      expect(screen.getByRole('checkbox', {name: 'Tuesday'})).toBeChecked();
      expect(screen.getByRole('checkbox', {name: 'Wednesday'})).toBeChecked();
      expect(screen.getByRole('checkbox', {name: 'Thursday'})).toBeChecked();
      expect(screen.getByRole('checkbox', {name: 'Friday'})).toBeChecked();
      expect(screen.getByRole('checkbox', {name: 'Saturday'})).toBeChecked();
    });
});