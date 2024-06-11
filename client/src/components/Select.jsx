const Select = ({ placeholder, option }) => {
  return (
    <select
      className="flex rounded-md h-9 p-2 w-full max-w-lg outline-none bg-grayColor text-textColor mt-4 text-[13.5px]"
      defaultValue="" // Set defaultValue here
      placeholder="Choisir la marque"
    >
      <option value="">{placeholder}</option>
      <option value="brand1">{option}</option>
    </select>
  );
};

export default Select;