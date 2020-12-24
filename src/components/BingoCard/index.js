import React, { useCallback, useMemo, useState } from 'react';

import './styles.scss';

const BINGO = ['B', 'I', 'N', 'G', 'O'];

const getRndInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const BingoCard = () => {
  const [numbersChecked, setNumbersChecked] = useState([]);

  const generateNumbers = useCallback((column) => {
    const max = (column + 1) * 15;
    const min = column ? column * 15 + 1 : 1;
    let numbers = [
      ...new Set([...new Array(5)].map(() => getRndInteger(min, max))),
    ];

    while (numbers.length !== 5) {
      numbers = [
        ...new Set([...new Array(5)].map(() => getRndInteger(min, max))),
      ];
    }

    return numbers.sort((a, b) => a - b);
  }, []);

  const handleOnNumberClick = useCallback((number) => {
    setNumbersChecked((oldState) => {
      let newNumbersChecked = [...oldState];

      if (newNumbersChecked.includes(number)) {
        newNumbersChecked = newNumbersChecked.filter((n) => n !== number);
      } else {
        newNumbersChecked.push(number);
      }

      return newNumbersChecked;
    });
  }, []);

  const data = useMemo(
    () =>
      BINGO.map((currentLetter, columnIndex) => ({
        letter: currentLetter,
        numbers: generateNumbers(columnIndex),
      })),
    [generateNumbers]
  );

  return (
    <div className="bingo-card">
      {data.map((column, columnIndex) => (
        <div className="column" key={column.letter}>
          <p className="cell header">{column.letter}</p>
          {column.numbers.map((number, numberIndex) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <p
              className={`cell${
                numbersChecked.includes(number) ? ' checked' : ''
              }`}
              key={`${column.letter}_${number}`}
              onClick={() =>
                columnIndex === 2 && numberIndex === 2
                  ? null
                  : handleOnNumberClick(number)
              }
            >
              {columnIndex === 2 && numberIndex === 2 ? 'FREE' : number}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BingoCard;
