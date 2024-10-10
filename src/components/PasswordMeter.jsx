import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import zxcvbn from "zxcvbn";
import PropTypes from "prop-types";

const atLeastOneUppercase = /[A-Z]/g; // capital letters from A to Z
const atLeastOneLowercase = /[a-z]/g; // small letters from a to z
const atLeastOneNumeric = /[0-9]/g; // numbers from 0 to 9
const atLeastOneSpecialChar = /[#?!@$%^&*-]/g; // any of the special characters within the square brackets
const eightCharsOrMore = /.{8,}/g;

const PasswordMeter = ({ password }) => {
  const getStrengthLevel = (score) => {
    switch (score) {
      case 0:
        return {
          label: "Too weak",
          color: "bg-[#FC5757]",
          container: "border border-[#FC5757] bg-[#FFD4D4]",
        };
      case 1:
        return {
          label: "Weak",
          color: "bg-[#FC5757]",
          container: "border border-[#FC5757] bg-[#FFD4D4]",
        };
      case 2:
        return {
          label: "Fair",
          color: "bg-[#FFC107]",
          container: "border border-[#FFC107] bg-[#FFF8CD]",
        };
      case 3:
        return {
          label: "Good",
          color: "bg-blue-500",
          container: "border border-blue-500 bg-[#D9EDF7]",
        };
      case 4:
        return {
          label: "Strong",
          color: "bg-[#28A745]",
          container: "border border-[#28A745] bg-[#D4EDDA]",
        };
      default:
        return { label: "Too weak", color: "bg-[#FC5757]" };
    }
  };

  const passwordTracker = {
    uppercase: password.match(atLeastOneUppercase),
    lowercase: password.match(atLeastOneLowercase),
    number: password.match(atLeastOneNumeric),
    specialChar: password.match(atLeastOneSpecialChar),
    eightCharsOrGreater: password.match(eightCharsOrMore),
  };

  const { score } = zxcvbn(password);
  const strengthLevel = getStrengthLevel(score);

  return (
    <div className="flex flex-col px-4 py-5 rounded-xl border bg-white shadow-lg">
      <div>
        <p className="text-xs">Password Strength</p>
        <div
          className={`w-full ${strengthLevel.container} transition-all rounded-full h-1 mt-2 flex`}
        >
          <div
            className={`${strengthLevel.color} h-1 transition-all rounded-full`}
            style={{ width: `${(score / 4) * 100}%` }}
          />
        </div>
        <p className={`text-[6px] text-[#000066] mt-1 text-right`}>{strengthLevel.label}</p>
      </div>
      <div className="text-[8px]/normal mt-2">
        <p>
          8 characters or more{" "}
          {!passwordTracker.eightCharsOrGreater ? (
            <span className="text-red-500">*</span>
          ) : (
            <FontAwesomeIcon className="ml-1 text-[#000066]" icon={faCheck} />
          )}
        </p>
        <p>
          At least one uppercase letter{" "}
          {!passwordTracker.uppercase ? (
            <span className="text-red-500">*</span>
          ) : (
            <FontAwesomeIcon
              className="ml-[2px] text-[#000066]"
              icon={faCheck}
            />
          )}
        </p>
        <p>
          At least one lowercase letter{" "}
          {!passwordTracker.lowercase ? (
            <span className="text-red-500">*</span>
          ) : (
            <FontAwesomeIcon className="ml-1 text-[#000066]" icon={faCheck} />
          )}
        </p>
        <p>
          At least one number{" "}
          {!passwordTracker.number ? (
            <span className="text-red-500">*</span>
          ) : (
            <FontAwesomeIcon className="ml-1 text-[#000066]" icon={faCheck} />
          )}
        </p>
        <p>
          At least one special character{" "}
          {!passwordTracker.specialChar ? (
            <span className="text-red-500">*</span>
          ) : (
            <FontAwesomeIcon className="ml-1 text-[#000066]" icon={faCheck} />
          )}
        </p>
      </div>
    </div>
  );
};

export default PasswordMeter;

PasswordMeter.propTypes = {
  password: PropTypes.string,
};
