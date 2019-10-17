import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const InputField = ({ input, defaultValue, label, type, errorMessage }) => (
    (() => {
        if (typeof errorMessage === 'undefined' || errorMessage === null) {
            return (
                <FormControl className={label.toLowerCase()}>
                    <InputLabel htmlFor={label.toLowerCase()}>{label}</InputLabel>
                    <Input {...input}
                        id={label.toLowerCase()}
                        type={type}
                        value={defaultValue}
                        aria-describedby="component-error-text"
                    />
                </FormControl>
            )
        }
        else {
            return (
                <FormControl className={label.toLowerCase()} error>
                    <InputLabel htmlFor={label.toLowerCase()}>{label}</InputLabel>
                    <Input {...input}
                        id={label.toLowerCase()}
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

