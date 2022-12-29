import JsonData from "../api/newForm.json";

export const validataion = (data, allData = null) => {
  // console.log(data);
  let errors = {};
  const { inputFiled } = JsonData;

  const dataObj = Object.keys(data);

  dataObj.forEach((name) => {
    const char = data[name];
    const capitalizeName = name[0]
      ?.toUpperCase()
      ?.concat(name.slice(1))
      ?.replaceAll("_", " ");
    // console.log(capitalizeName);
    const findValidataionRequired = inputFiled.find(
      (item) => item?.name === name,
    );
    const validObject = Object.keys(findValidataionRequired.valid);
    for (let i = 0; i < validObject.length; i++) {
      // console.log(key, "=>", value);
      const key = validObject[i];
      const value = findValidataionRequired?.valid?.[key];
      // console.log(value);
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
          let newData;
          if (allData) {
            newData = allData[value];
          } else {
            newData = data[value];
          }
          console.log(data, newData);
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
  // console.log(char, newData);
  if (char === newData) return {};
  return { [name]: `${capitalizeName} does not match !!!` };
};
