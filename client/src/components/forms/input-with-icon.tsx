/* eslint-disable
  jsx-a11y/control-has-associated-label,
  jsx-a11y/no-noninteractive-element-interactions,
  jsx-a11y/click-events-have-key-events,
*/
import React, { useRef } from 'react';
import { CommonProps, useInputClasses } from './common';

interface InputWithIconProps extends CommonProps {
  value: string | number | readonly string[] | undefined;
  placeholder?: string;
  required?: boolean;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
  error = '',
  IconSVG,
  id,
  onBlur,
  onFocus,
  title = '',
  touched = false,
  ...restProps
}) => {
  const inputEl = useRef<HTMLInputElement>(null);

  const { classes, setIsFocused } = useInputClasses();

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className={classes.label}
        onClick={() => inputEl.current?.focus()}
        title={title}
      >
        <div className={classes.iconContainer}>
          {IconSVG ? <IconSVG className={classes.icon} /> : null}
        </div>
        <input
          id={id}
          className={classes.input}
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          ref={inputEl}
          aria-label={title}
          {...restProps}
        />
      </label>
      <div className={classes.error}>{error && touched ? error : ''}</div>
    </div>
  );
};

export default InputWithIcon;
