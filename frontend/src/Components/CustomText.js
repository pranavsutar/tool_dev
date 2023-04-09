import React, { useState } from "react";

function CustomText() {
  const [isChecked, setIsChecked] = useState(false);
  const [textboxValue, setTextboxValue] = useState("");

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleTextboxChange = (event) => {
    setTextboxValue(event.target.value);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        Add Custom Regex for Data Smells
      </label>
      {isChecked && (
        <div>
          <input
            type="textarea"
            value={textboxValue}
            onChange={handleTextboxChange}
          />
        </div>
      )}
    </div>
  );
}

export default CustomText;
