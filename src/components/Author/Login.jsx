import React from "react";
import "materialize-css/dist/css/materialize.min.css";

export const Login = () => {
  return (
    <div>
      <div className="col">
        <div className="col s12">
          <div className="col input">
            <div className="input-field col s12">
              <i className="material-icons prefix">email</i>
              <input
                type="text"
                id="autocomplete-input"
                className="autocomplete"
              />
              {/* <label for="autocomplete-input">Autocomplete</label> */}
            </div>
            <div className="input-field col s12">
              <i className="material-icons prefix">password</i>
              <input
                type="text"
                id="autocomplete-input"
                className="autocomplete"
              />
              {/* <label for="autocomplete-input">Autocomplete</label> */}
            </div>
          </div>
        </div>
      </div>
      {/* <button>Forgot password?</button> */}
      <button
        className="btn waves-effect waves-light"
        type="submit"
        name="action"
      >
        Submit
        <i className="material-icons right" />
      </button>
    </div>
  );
};
