function TextField({
  label,
  name,
  value,
  onChange,
  type = "text",
  dir = "rtl",
  ...rest
}) {
  return (
    <div>
      <label className="block mb-4" htmlFor={name}>
        {label}
      </label>
      <input
        className="textField__input"
        autoComplete="off"
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        id={name}
        dir={dir}
        {...rest}
      />
    </div>
  );
}

export default TextField;
