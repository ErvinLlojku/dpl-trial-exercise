import React, { useState, useRef, useEffect } from "react";

import { useQuery, useMutation } from "@apollo/client";
import { GET_BIRTHDAY, UPDATE_BIRTHDAY } from "./birthday.queries";
import { UpdateBirthdayResponse } from "./update-birthday-response.interface";
import { Birthday as IBirthday } from './birthday.interface';

function Birthday() {
  // Used to avoid form validation on first render and after graphql useQuery
  const firstRender = useRef(true);

  // State variable used to store selected birthday
  const [selectedBirthday, setBirthday] = useState<IBirthday>({ day: 0, month: 0, year: 0 });
  // State variable used to store form validiti
  const [isValid, setIsValid] = useState(true);
  // State variable used to store a success/error message
  const [message, setMessage] = useState('');

  /**
   * GrahpQL operations
   */
  const { data } = useQuery(GET_BIRTHDAY);
  const [updateBirthday] = useMutation(UPDATE_BIRTHDAY, {
    variables: {
      birthday: `${selectedBirthday.year}-${selectedBirthday.month}-${selectedBirthday.day}`
    },
    onCompleted: (response: UpdateBirthdayResponse) => {
      setIsValid(response.setBirthday.success);
      setMessage(response.setBirthday.message);
    }
  });

  const today = new Date();
  const maxAge = 120;
  const maxYearAllowed = today.getFullYear();

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];
  const years = Array.from({ length: maxAge + 1 }, (_, i) => maxYearAllowed - i);

  useEffect(() => {
    // Effect used to update selectedBirthday state value with remote data
    if (data && data.getBirthday) {
      const [year, month, day] = data.getBirthday.birthday.split('-');
      setBirthday({
        day: day,
        month: parseInt(month),
        year: year
      });
      firstRender.current = true; // set true to not run form validation useEffect
    }
  }, [data]);

  useEffect(() => {
    // Reset message when inputs change
    setMessage('');

    // Skip first render
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    // Effect used to validate date after all inputs are compiled
    if (selectedBirthday.day && selectedBirthday.month && selectedBirthday.year) {
      let currentTime = today.getTime();
      let birthDate = `${selectedBirthday.year}-${selectedBirthday.month}-${selectedBirthday.day}`;
      let birthDateTime= new Date(birthDate).getTime();
      let difference = (currentTime - birthDateTime);
      let ageInYears = difference/(1000*60*60*24*365);

      if (ageInYears < 18) {
        setIsValid(false);
        setMessage('You have to be at least 18 years old!');
      } else {
        setIsValid(true);
      }
    }

  }, [ selectedBirthday ]);


  /**
   * Handle input change event
   * @param ev React.ChangeEvent<HTMLSelectElement>
   */
  const handleInputChange = (ev: React.ChangeEvent<HTMLSelectElement>): void => {
    setBirthday({ ...selectedBirthday, [ev.target.name]: parseInt(ev.target.value) });
  };

  /**
   * Handle form submit event
   * @param ev React.FormEvent<HTMLFormElement>
   */
  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>): void => {
    ev.preventDefault();
    updateBirthday();
  };

  return (
    <>
      <form name="userForm" className="form" autoComplete="on" onSubmit={handleSubmit}>

        {(isValid !== null && message) && <div className={`notice ${isValid ? 'notice--success' : 'notice--error'}`}>{message}</div>}

        <div role="group" className="form__group form__group--horizontal">
          <div className="form__control">
            <label className="form__label" htmlFor="bday-day">Day</label>
            <select
              className="form__select"
              name="day"
              id="bday-day"
              autoComplete="bday-day"
              value={selectedBirthday.day}
              onChange={handleInputChange}
              required>
              <option value=""></option>
              {days.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="form__control">
            <label className="form__label" htmlFor="bday-month">Month</label>
            <select
              className="form__select"
              name="month"
              onChange={handleInputChange}
              value={selectedBirthday.month}
              id="bday-month"
              autoComplete="bday-month"
              required>
              <option value=""></option>
              {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
          </div>

          <div className="form__control">
            <label className="form__label" htmlFor="bday-year">Year</label>
            <select
              className="form__select"
              name="year"
              onChange={handleInputChange}
              value={selectedBirthday.year}
              id="bday-year"
              autoComplete="bday-year"
              required>
              <option value=""></option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>

        <button
          className="button button--primary"
          type="submit"
          disabled={!isValid}
        >Save</button>
      </form>
    </>
  );
}

export default Birthday;
