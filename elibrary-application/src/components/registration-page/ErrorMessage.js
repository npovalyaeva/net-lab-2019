import React, { PureComponent } from 'react';
import { FormHelperText } from '@material-ui/core';

import '../../styles/registration-page/Registration.css';

export const ErrorMessage = ({formErrors}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <p key={i}>{fieldName} {formErrors[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>

