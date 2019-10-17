import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const InputField = ({ input, defaultValue, label, type, errorMessage }) => (
    (() => {
        if (typeof errorMessage === 'undefined') {
            return (
                <FormControl className={label}>
                    <InputLabel htmlFor={label}>{label}</InputLabel>
                    <Input {...input}
                        id={label}
                        type={type}
                        value={defaultValue}
                        aria-describedby="component-error-text"
                    />
                </FormControl>
            )
        }
        else {
            return (
                <FormControl className={label} error>
                    <InputLabel htmlFor={label}>{label}</InputLabel>
                    <Input {...input}
                        id={label}
                        type={type}
                        value={defaultValue}
                        aria-describedby="component-error-text"
                    />
                    <FormHelperText id="component-error-text">{errorMessage}</FormHelperText>
                </FormControl>
            )
        }
        
    })()
    
)

export default InputField;

