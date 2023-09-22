import CenterLayout from "@/app/components/CenterLayout";
import { getPostBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
const getPageContent = async (slug) => {
  const { meta, content } = await getPostBySlug(slug);
  return { meta, content };
};

export async function generateMetadata({ params }) {
  const { meta } = await getPageContent(params.slug);
  return { title: meta.title };
}

const Page = async ({ params }) => {
  const { content } = await getPageContent(params.slug);

  return (
    <CenterLayout>
      <section className="py-5">
        {/* back to blog */}
        <Link
          href="/blog"
          className="text-sm text-gray-600 hover:text-gray-700"
        >
          Back to blog
        </Link>

        <div className="container py-4 prose prose-slate">{content}</div>
      </section>
    </CenterLayout>
  );
};

export default Page;
