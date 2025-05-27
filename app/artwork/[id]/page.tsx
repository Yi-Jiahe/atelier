import { getMetadata } from "@/app/metadata";
import { getLatestRef } from "@/app/artwork";

export async function generateStaticParams() {
  const metadata = getMetadata();
  return Object.keys(metadata.artworks).map((id) => ({ id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const metadata = getMetadata();
  const artwork = metadata.artworks[id];
  const ref = getLatestRef(artwork);

  return (
    <div>
      <img src={ref.href} alt={artwork.alt ? artwork.alt : ""} />
    </div>
  );
}