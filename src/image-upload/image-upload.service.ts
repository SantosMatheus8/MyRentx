import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';

import * as fs from 'fs';

@Injectable()
export class ImageUploadService {
  async upload(file: Express.Multer.File) {
    try {
      const filePath = `${process.env.UPLOAD_TEMP_DIR}/${file.originalname}`;

      fs.writeFileSync(filePath, file.buffer);

      return {
        status: 'sucess',
        message: 'File uploaded successfully',
        imageName: file.originalname,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: 'error',
        message: error.message,
      });
    }
  }
}
