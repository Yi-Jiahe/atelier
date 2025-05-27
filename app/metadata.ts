import fs from 'fs';
import path from 'path';
import { parse } from 'yaml';

import { Metadata } from './types';

export function getMetadata(): Metadata {
  const file = fs.readFileSync(path.join(process.cwd(), 'data', 'image-meta.yaml'), 'utf8');
  return parse(file) as Metadata;
}
