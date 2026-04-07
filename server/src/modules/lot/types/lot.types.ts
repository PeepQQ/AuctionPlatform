

export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

export interface CreateLotData {
  name: string;
  description: string;
  price: number;
  pictures: Array<MulterFile>
}