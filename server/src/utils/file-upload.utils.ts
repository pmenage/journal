import { extname } from 'path';

export const editRequestFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0].replace(/\s/g, '');
  const fileExtName = extname(file.originalname);
  //   const randomName = Array(6)
  //     .fill(null)
  //     .map(() => Math.round(Math.random() * 16).toString(16))
  //     .join('');
  //    callback(null, `${name}-${randomName}${fileExtName}`);
  callback(null, `${name}${fileExtName}`);
};

export const editFileName = file => {
  const name = file.originalname.split('.')[0].replace(/\s/g, '');
  const fileExtName = extname(file.originalname);
  //   const randomName = Array(6)
  //     .fill(null)
  //     .map(() => Math.round(Math.random() * 16).toString(16))
  //     .join('');
  //   return `${name}-${randomName}${fileExtName}`;
  return `${name}${fileExtName}`;
};
