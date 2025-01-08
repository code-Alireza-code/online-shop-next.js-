function TextField({
  label,
  name,
  value,
  onChange,
  type = "text",
  dir = "rtl",
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
      />
    </div>
  );
}

export default TextField;
