import React, { useRef, useEffect, useState } from "react";

const BarInput = () => {
  const [input, setInput] = useState();

  console.log(input);

  const newValues =
    input?.length > 0
      ? input
          ?.map((val) => parseInt(val.trim()))
          ?.filter((val) => !Number.isNaN(val))
      : "";

  console.log(newValues);

  return (
    <div style={{ color: "white" }}>
      <div>
        <label htmlFor="algorithmInput">
          Enter Your input. (Please Use comma sperated values. No spaces allowed
          between commas) eg-:10,20,40,50
        </label>
        <input
          type="text"
          name="algorithmInput"
          onChange={(e) => {
            const currrentArrayString = e.target.value;
            const newString = currrentArrayString?.trim()?.split(",");
            newString?.forEach((val) => {
              if (val.includes(" ")) {
                console.log("No Spaces are allowed");
                return;
              }
              if (val.match(/[a-zA-Z]/)) {
                console.log("error");
              }
            });
            setInput(newString);
          }}
        />
      </div>
      <span>Your current Array {input ? `[${input}]` : `[]`}</span>
    </div>
  );
};

export default BarInput;
