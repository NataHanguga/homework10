import React from 'react';

export const FormErrors = ({formErrors, name}) =>
    <div className='formErrors'>
        {Object.keys(formErrors).map((fieldName, i) => {
        if(formErrors[fieldName].length > 0){
            if(name === fieldName){
                return (
                    <p key={i}>{fieldName} {formErrors[fieldName]}</p>
                )        
            } else {
                return '';
            }
        }
    })}
</div>