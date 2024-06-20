const Select = ({ placeholder, options, name,onchange }) => {
  return (
    <select
      className="flex rounded-md h-9 p-2 w-full max-w-lg outline-none bg-grayColor text-textColor mt-4 text-[13.5px]"
      defaultValue=""
      name={name}
      onChange={onchange}
    >
      <option value="">{placeholder}</option>
      {options && options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;