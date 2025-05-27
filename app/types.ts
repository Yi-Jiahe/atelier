export type Metadata = {
  artworks: Artwork[];
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


export type Thumbnail = {
  href: string;
  alt: string;
  timestamp: string;
}