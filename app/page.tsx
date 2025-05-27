import fs from 'fs';
import path from 'path';
import { parse } from 'yaml';

import { Artwork, Metadata, Ref, Thumbnail } from './types';


function getMetadata(): Metadata {
  const file = fs.readFileSync(path.join(process.cwd(), 'data', 'image-meta.yaml'), 'utf8');
  return parse(file) as Metadata;
}

// Helper to find the latest timestamp in refs
function getLatestRef(artwork: Artwork): Ref {
  let latestRef;
  let latestTimestamp: Date | undefined;
  for (const [, value] of Object.entries(artwork.refs)) {
    const timestamp = new Date(value.timestamp);
    if (latestTimestamp !== undefined && timestamp < latestTimestamp) {
      continue;
    }
    latestTimestamp = timestamp;
    latestRef = value;
  }
  if (latestRef === undefined) {
    throw new Error(`No refs found for ${artwork.root}`);
  }
  return latestRef;
}

export default function Home() {
  const metadata = getMetadata();
  console.log(metadata);

  const thumbnails = metadata.artworks.map((artwork: Artwork): Thumbnail => {
    const ref = getLatestRef(artwork)
    return {
      href: ref.href,
      alt: artwork.alt ? artwork.alt : "",
      timestamp: ref.timestamp
    }
  })
    .sort((a: Ref, b: Ref) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  console.log(thumbnails);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[8px]">
          {thumbnails.map((thumbnail: Thumbnail, index: number) => {
            // TO-DO: Add support for server sided resizing to reduce data transfer and better rescaling
            return (
              <a key={index} href={thumbnail.href} target="_blank" rel="noopener noreferrer">
                <img src={thumbnail.href} alt={thumbnail.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </a>
            );
          })}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
