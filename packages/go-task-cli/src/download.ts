import * as fs from "fs";

import { Gaxios } from "gaxios";

export const downloadFile = async (
  url: string,
  destination: string
): Promise<void> => {
  const gaxios = new Gaxios();
  const response = await gaxios.request({
      url,
      responseType: 'stream',
  });

  return new Promise((resolve, reject) => {
      const fileStream = fs.createWriteStream(destination);
      response.data.pipe(fileStream);

      fileStream.on('finish', () => resolve());
      fileStream.on('error', reject);
  });
};
