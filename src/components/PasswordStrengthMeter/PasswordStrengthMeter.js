/* https: //upmostly.com/tutorials/build-a-password-strength-meter-react */

import React from "react";
import zxcvbn from "zxcvbn";

import "./PasswordStrengthMeter.css";

const PasswordStrengthMeter = ({ password }) => {
  const createPasswordLabel = result => {
    switch (result.score) {
      case 0:
        return "Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "Weak";
    }
  };
  const testedResult = zxcvbn(password);
  return (
    <div className="password-strength-meter">
      <progress
        className={`password-strength-meter-progress strength-${createPasswordLabel(
          testedResult
        )}`}
        value={testedResult.score}
        max="4"
      />
      <br />
      <label
        className={
          password
            ? "password-strength-meter-label"
            : "password-strength-meter-label hidden"
        }
      >
        <strong>Password strength:</strong> {createPasswordLabel(testedResult)}
      </label>
    </div>
  );
};

export default PasswordStrengthMeter;
