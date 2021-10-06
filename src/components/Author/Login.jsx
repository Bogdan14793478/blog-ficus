import React from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/css/materialize.min.css'


const Login = () => {
    return (
        <div>
            <div class="col">
                <div class="col s12">
                    <div class="col input">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">email</i>
                            <input type="text" id="autocomplete-input" class="autocomplete" />
                            {/* <label for="autocomplete-input">Autocomplete</label> */}
                        </div>
                        <div class="input-field col s12">
                            <i class="material-icons prefix">password</i>
                            <input type="text" id="autocomplete-input" class="autocomplete" />
                            {/* <label for="autocomplete-input">Autocomplete</label> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <button>Forgot password?</button> */}
            <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                <i class="material-icons right"></i>
            </button>
        </div>
    )
}
export default Login;