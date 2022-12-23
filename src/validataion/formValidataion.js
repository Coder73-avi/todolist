import JsonData from "../api/newForm.json";

export const validataion = (data) => {
  let errors = {};
  const { inputFiled } = JsonData;

  inputFiled.forEach((item) => {
    const { name, valid } = item;
    const char = data[name];
    const capitalizeName = name[0]
      .toUpperCase()
      .concat(name.slice(1))
      .replaceAll("_", " ");

    const newValid = Object.keys(valid);
    for (let i = 0; i < newValid.length; i++) {
      const key = newValid[i];
      const value = valid[key];
      // console.log(key, "=>", value);

      switch (key) {
        case "required":
          if (char === "") {
            return (errors = {
              ...errors,
              [name]: `${capitalizeName} is required`,
            });
          }
          break;

        case "min":
          if (char.length < value) {
            return (errors = {
              ...errors,
              [name]: `${capitalizeName} min ${value} character`,
            });
          }
          break;

        case "max":
          if (key === "max" && char.length > value) {
            return (errors = {
              ...errors,
              [name]: `${capitalizeName} max ${value} character`,
            });
          }
          break;

        case "type":
          errors = {
            ...errors,
            ...charType({ name, char, value, capitalizeName }),
          };
          break;

        case "match":
          const newData = data[value];
          errors = {
            ...errors,
            ...matchData({ name, char, capitalizeName, newData }),
          };
          break;

        default:
          return errors;
      }
    }

    // break();
  });

  return errors;
};

const charType = ({ name, char, value, capitalizeName }) => {
  const textOnly = /[^a-z\s]/gi;
  const textAndNumberOnly = /[^a-z0-9]/gi;
  const numberOnly = /[^0-9]/gi;
  const emailOnly = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  switch (value) {
    case "text":
      if (!char.match(textOnly)) return;
      return { [name]: `Do not use number` };

    case "number":
      if (!char.match(numberOnly)) return;
      return { [name]: `Invalid ${capitalizeName}` };

    case "textandnumber":
      if (!char.match(textAndNumberOnly)) return;
      return { [name]: `Invalid ${capitalizeName}` };

    case "email":
      if (char.match(emailOnly)) return;
      return { [name]: `Invalid ${capitalizeName}` };

    default:
      return;
  }
};

const matchData = ({ name, char, capitalizeName, newData }) => {
  console.log("match >> ", newData);
  if (char === newData) return;
  return { [name]: `${capitalizeName} does not match !!!` };
};
