import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import * as path from 'node:path';

const hashSha256 = (filePath: string): string => {
  const fileBuffer = fs.readFileSync(filePath);
  const hash = crypto.createHash('sha256');
  hash.update(fileBuffer);
  return hash.digest('hex');
}

export const hashSha256Verify = (target: string, checksumsFile: string) => {
  if (!checksumsFile) {
      throw new Error("hash_sha256_verify checksum file not specified in argument 2");
  }

  const targetBaseName = path.basename(target)
  if (!targetBaseName) {
      throw new Error(`Unable to extract basename from target: ${target}`);
  }

  // チェックサムファイルを読み込み
  const checksumsContent = fs.readFileSync(checksumsFile, 'utf-8');
  const lines = checksumsContent.split('\n');
  const checksumEntry = lines.find(line => line.includes(targetBaseName));

  if (!checksumEntry) {
      throw new Error(`hash_sha256_verify unable to find checksum for '${target}' in '${checksumsFile}'`);
  }

  // ターゲットファイルの SHA-256 を計算
  const want = checksumEntry.split(/\s+/)[0]; // チェックサム部分を取得
  const got = hashSha256(target);

  if (want !== got) {
      throw new Error(`hash_sha256_verify checksum for '${target}' did not verify ${want} vs ${got}`);
  }

  console.log(`Checksum verification successful for ${target}`);
}
