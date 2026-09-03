import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type CommonProps = {
  label: string;
  error?: string;
  optional?: boolean;
};

export function TextField({
  label,
  error,
  optional,
  ...props
}: CommonProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="input-label" htmlFor={props.id}>
        {label}
        {optional && <span className="ml-1 font-normal text-muted">(opcional)</span>}
      </label>
      <input className="input-field" {...props} />
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

export function TextAreaField({
  label,
  error,
  optional,
  ...props
}: CommonProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="input-label" htmlFor={props.id}>
        {label}
        {optional && <span className="ml-1 font-normal text-muted">(opcional)</span>}
      </label>
      <textarea className="input-field" rows={4} {...props} />
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

export function SelectField({
  label,
  error,
  optional,
  children,
  ...props
}: CommonProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label className="input-label" htmlFor={props.id}>
        {label}
        {optional && <span className="ml-1 font-normal text-muted">(opcional)</span>}
      </label>
      <select className="input-field" {...props}>
        {children}
      </select>
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}
