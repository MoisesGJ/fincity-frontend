import { useEffect, useRef, useState } from 'react';

export default function Pin({ createPin }) {
  const [values, setValues] = useState(['', '', '', '']);
  const inputsRef = useRef([]);

  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (value, index) => {
    if (!/^\d$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value !== '' && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newValues = [...values];

      if (newValues[index] !== '') newValues[index] = '';
      else if (index > 0) {
        inputsRef.current[index - 1].focus();
        newValues[index - 1] = '';
      }

      setValues(newValues);
    }
  };

  useEffect(() => {
    const allItemsHaveText = values.every((item) => item.length > 0);
    setIsVisible(allItemsHaveText);
  }, [values]);

  return (
    <>
      <div className="flex w-full space-x-2 max-w-96">
        {values.map((value, index) => {
          return (
            <input
              type="number"
              ref={(curr) => (inputsRef.current[index] = curr)}
              value={value}
              maxLength={1}
              key={index}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="bg-white text-black w-1/4 h-24 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FD6A00]"
            />
          );
        })}
      </div>
      <button
        className={`transition-opacity duration-500 mt-8 bg-white text-black font-bold px-12 py-3 rounded-xl ${
          isVisible ? ' visible opacity-100' : 'opacity-0 invisible'
        }`}
        onClick={() => createPin(values)}
      >
        Crear
      </button>
    </>
  );
}
