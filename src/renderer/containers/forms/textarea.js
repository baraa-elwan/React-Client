import React from 'react'


export default (field) => {
    return (
        <div className="form-group row">
        <label htmlFor={field.id} className='col-sm-3 col-form-label'>{field.id}</label>

            <textarea
                name={field.name}
                type={field.type}
                className={'form-control form-control-sm col-sm-8' + ((field.meta.touched && field.meta.error) ? ' is-invalid' : '')}
                placeholder={field.placeholder}
                {...field.input} />
        </div>)
}
