import ProductDetailClient from "@/app/components/buyer/products/ProductDetailClient";

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <ProductDetailClient slug={params.slug} />;
}