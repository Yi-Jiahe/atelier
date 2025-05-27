export type Metadata = {
  artworks: {
    [key: string]: Artwork;
  };
};

export type Artwork = {
  root: string;
  alt?: string;
  refs: {
    [key: string]: Ref;
  };
};

export type Ref = {
  href: string;
  timestamp: string;
}


export type ArtworkThumbnail = {
  artworkKey: string;
  href: string;
  alt: string;
  timestamp: string;
}