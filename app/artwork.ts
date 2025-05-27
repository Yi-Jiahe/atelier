import { Artwork, Ref } from "./types";

export function getLatestRef(artwork: Artwork): Ref {
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