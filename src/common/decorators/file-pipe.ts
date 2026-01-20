import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import path from "path";
import sharp from "sharp";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class FilePipe implements PipeTransform<Express.Multer.File, Promise<string>> {

    async transform(image: Express.Multer.File): Promise<string> {
        if (image) {
            const uuid = uuidv4();

            const fileName = uuid + '.webp'

            fs.mkdirSync(path.join('src/public/uploads'), { recursive: true });

            await sharp(image.buffer)
                .resize(800)
                .webp({ quality: 80 })
                .toFile(path.join('src/public/uploads', fileName));

            return fileName;
        } else {
            return '';
        }

    }

}