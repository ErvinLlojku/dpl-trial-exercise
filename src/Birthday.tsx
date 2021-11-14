import React, { useState, useRef, useEffect } from "react";
import "./Birthday.scss";

interface IBirthday {
  day: string;
  month: string;
  year: string;
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
  const [selectedBirthday, setBirthday] = useState<IBirthday>({ day: '', month: '', year: '' });

  const today = new Date();
  const maxAge = 120;
  const minAge = 18;
  const maxYearAllowed = today.getFullYear() - minAge;

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const years = Array.from({ length: maxAge + 1 }, (_, i) => maxYearAllowed - i);

  /**
   * Event handlers
   */
  const handleDaySelect = (ev: React.ChangeEvent<HTMLSelectElement>): void => {
    setBirthday({...selectedBirthday, day: ev.target.value});
  };

  const handleMonthSelect = (ev: React.ChangeEvent<HTMLSelectElement>): void => {
    setBirthday({...selectedBirthday, month: ev.target.value});
  };

  const handleYearSelect = (ev: React.ChangeEvent<HTMLSelectElement>): void => {
    setBirthday({...selectedBirthday, year: ev.target.value});
  };

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>): void => {
    ev.preventDefault();
    console.log(selectedBirthday);
  };

  return (
    <>
      <form name="userForm" autoComplete="on" onSubmit={handleSubmit}>
        <div role="group" aria-labelledby="birthday_head">
          <div id="birthday_head">PLEASE ENTER YOUR BIRTHDAY:</div>
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
              {months.map(m => <option key={m} value={m}>{m}</option>)}
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
