import * as fs from 'fs';

const buildInfoFile = './dist/buildinfo.json';

export interface BuildInfo {
  version: number;
}

export const getBuildInfo = (): BuildInfo | undefined => {
  if (fs.existsSync(buildInfoFile)) {
    const rawdata: any = fs.readFileSync(buildInfoFile);
    return JSON.parse(rawdata);
  }
};
