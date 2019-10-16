import React from 'react';

import TextField from '@material-ui/core/TextField';

const InputField = ({ input, defaultValue, name, label, value, type, onChange, meta: { touched, error, warning } }) => (

    // <div className="inputBlock">
    //     <h3>{label}</h3>
    //     <div>
    //         <input {...input}
    //             placeholder={defaultValue}
    //             type={type}
    //         />
    //         {touched &&
    //             ((error && <span>{error}</span>) ||
    //             (warning && <span>{warning}</span>))}
    //     </div>
    // </div>
    <div>
        <TextField {...input}
            //onChande={onChange}
            label={label}
            value={defaultValue}
            type={type}
            className="inputBlock"
            margin="normal"
        />
        {touched &&
            ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))
        }
    </div>
)

export default InputField;