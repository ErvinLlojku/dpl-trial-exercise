import React, { useState, useRef, useEffect } from "react";
import "./Birthday.scss";

import { useQuery, useMutation } from "@apollo/client";
import { GET_BIRTHDAY, UPDATE_BIRTHDAY } from "./birthday.queries";

interface IBirthday {
  day: number;
  month: number;
  year: number;
}

function Birthday() {
  /**
   * Element refs
   */
  const monthEl = useRef<HTMLSelectElement>(null);
  const yearEl = useRef<HTMLSelectElement>(null);

  /**
   * State variables
   */
  const [selectedBirthday, setBirthday] = useState<IBirthday>({ day: 0, month: 0, year: 0 });

  /**
   * GrahpQL operations
   */
  const { data } = useQuery(GET_BIRTHDAY);
  const [ updateBirthday ] = useMutation(UPDATE_BIRTHDAY, {
    variables: {
      birthday: `${selectedBirthday.year}-${selectedBirthday.month}-${selectedBirthday.day}`,
      onComplete: (resp: any) => {
        // Do nothing
        console.log('onComplete', resp);
      }
    }
  });

  const today = new Date();
  const maxAge = 120;
  const minAge = 18;
  const maxYearAllowed = today.getFullYear() - minAge;

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

  /**
   * Effects
   */
  useEffect(() => {
    if (data && data.getBirthday) {
      const [year, month, day] = data.getBirthday.birthday.split('-');
      setBirthday({
        day: day,
        month: parseInt(month),
        year: year
      });
    }
  }, [data]);

  /**
   * Event handlers
   */
  const handleDaySelect = (ev: React.ChangeEvent<HTMLSelectElement>): void => {
    setBirthday({ ...selectedBirthday, day: parseInt(ev.target.value) });
  };

  const handleMonthSelect = (ev: React.ChangeEvent<HTMLSelectElement>): void => {
    setBirthday({ ...selectedBirthday, month: parseInt(ev.target.value) });
  };

  const handleYearSelect = (ev: React.ChangeEvent<HTMLSelectElement>): void => {
    setBirthday({ ...selectedBirthday, year: parseInt(ev.target.value) });
  };

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>): void => {
    ev.preventDefault();

    // do validation if birthday is valid
    updateBirthday();
  };

  return (
    <>
      <form name="userForm" autoComplete="on" onSubmit={handleSubmit}>
        <div role="group" aria-labelledby="birthday_head">
          <div id="birthday_head">Please enter your birthday:</div>
          <div id="bday">
            <select
              name="day"
              id="bday-day"
              autoComplete="bday-day"
              value={selectedBirthday.day}
              onChange={handleDaySelect}
              required>
              <option value="">dd</option>
              {days.map(d => <option key={d} value={d}>{d}</option>)}
            </select>

            <select
              ref={monthEl}
              name="month"
              onChange={handleMonthSelect}
              value={selectedBirthday.month}
              id="bday-month"
              autoComplete="bday-month"
              required>
              <option value="">mm</option>
              {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>

            <select
              ref={yearEl}
              name="year"
              onChange={handleYearSelect}
              value={selectedBirthday.year}
              id="bday-year"
              autoComplete="bday-year"
              required>
              <option value="">yyyy</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>

            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Birthday;
