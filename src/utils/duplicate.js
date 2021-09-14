
const duplicate = (keys) => {
  let result = [];

  for(let i = 0; i<keys.length; i++)  {
    const curr = keys[i];

    if(result.includes(curr)) continue;

    if(keys.slice(i+1).includes(curr)) result.push(curr);
  }
  return result;
};

export default duplicate;