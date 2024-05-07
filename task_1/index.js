import { encoded, translations } from './data.js';

console.log("Let's rock");
console.log(encoded, translations);

function decoded() {
  const onjExceptions = {
    groupId: true,
    servic: true,
    formatSize: true,
    ca: true,
  };

  let listsId = new Set();

  let newEncoded = encoded.map((el) => {
    let newObj = {};
    for (const key in el) {
      let convertNumId = Number(el[key]);

      if (onjExceptions[key]) {
        newObj[key] = el[key];
        // если закамитеть то 'groupId' не будут в списке уникального id
        if (convertNumId) listsId.add(el[key]);
        continue;
      }

      if (!isNaN(convertNumId)) {
        if (el[key]) listsId.add(el[key]);

        if (key.endsWith('Id')) {
          newObj[key] = translations[el[key]];
        }
      }
    }

    return newObj;
  });

  return [newEncoded, [...listsId]];
}

console.log(decoded());
