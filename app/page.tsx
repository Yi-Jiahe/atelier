import { getMetadata } from './metadata';
import { getLatestRef } from './artwork';
import { Artwork, Ref, ArtworkThumbnail} from './types';


export default function Home() {
  const metadata = getMetadata();
  console.log(metadata);

  const thumbnails = Object.entries(metadata.artworks).map(([key, artwork]: [string, Artwork]): ArtworkThumbnail => {
    const ref = getLatestRef(artwork)
    return {
      artworkKey: key,
      href: ref.href,
      alt: artwork.alt ? artwork.alt : "",
      timestamp: ref.timestamp
    }
  })
    .sort((a: Ref, b: Ref) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[8px]">
          {thumbnails.map((thumbnail: ArtworkThumbnail, index: number) => {
            return (
              <a key={index} href={`artwork/${thumbnail.artworkKey}`} rel="noopener noreferrer">
                <img src={`${thumbnail.href}?width=200`} alt={thumbnail.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
