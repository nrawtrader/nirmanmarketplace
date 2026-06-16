import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogs, blogCategories } from "@/data/blogs";
import { Clock, ArrowLeft, ArrowRight, Tag, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const categoryColors: Record<string, string> = {
  cement: "bg-amber-100 text-amber-800",
  steel: "bg-blue-100 text-blue-800",
  "construction-tips": "bg-green-100 text-green-800",
  guides: "bg-purple-100 text-purple-800",
};

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const blog = blogs.find((b) => b.slug === slug);
  const blogIndex = blogs.findIndex((b) => b.slug === slug);
  const prev = blogIndex > 0 ? blogs[blogIndex - 1] : null;
  const next = blogIndex < blogs.length - 1 ? blogs[blogIndex + 1] : null;
  const related = blogs.filter((b) => b.id !== blog?.id && b.category === blog?.category).slice(0, 2);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-16 text-center">
          <p className="text-2xl font-bold mb-4">Article not found</p>
          <Button onClick={() => navigate("/blog")}>Back to Blog</Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">

          {/* Breadcrumb */}
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-5">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[blog.category]}`}>
                {blogCategories[blog.category]}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" /> {blog.readTime} min read
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <CalendarDays className="w-3 h-3" />
                {new Date(blog.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
              {blog.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{blog.excerpt}</p>

            <div className="flex items-center gap-2 mb-8 pb-8 border-b border-border">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-sm font-bold text-accent">N</div>
              <div>
                <p className="text-sm font-medium text-foreground">{blog.author}</p>
                <p className="text-xs text-muted-foreground">Nirman MarketPlace</p>
              </div>
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="prose prose-gray max-w-none
              [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-3
              [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2
              [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4
              [&_ul]:text-muted-foreground [&_ul]:space-y-1.5 [&_ul]:mb-4 [&_ul]:pl-5 [&_ul>li]:list-disc
              [&_table]:w-full [&_table]:border-collapse [&_table]:mb-6 [&_table]:text-sm
              [&_th]:bg-secondary [&_th]:text-foreground [&_th]:font-semibold [&_th]:text-left [&_th]:p-3 [&_th]:border [&_th]:border-border
              [&_td]:p-3 [&_td]:border [&_td]:border-border [&_td]:text-muted-foreground
              [&_tr:nth-child(even)_td]:bg-secondary/30
              [&_strong]:text-foreground [&_strong]:font-semibold
              [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-accent/80"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap mt-8 pt-8 border-t border-border">
            <Tag className="w-3.5 h-3.5 text-muted-foreground" />
            {blog.tags.map((tag) => (
              <span key={tag} className="text-xs bg-secondary text-foreground px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 rounded-2xl bg-accent/5 border border-accent/20 p-6 text-center">
            <p className="font-semibold text-foreground mb-1">Ready to order materials?</p>
            <p className="text-sm text-muted-foreground mb-4">Get cement and steel delivered to your site across Lucknow.</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link to="/products">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Browse Products</Button>
              </Link>
              <Link to="/calculator">
                <Button variant="outline">Calculate Quantity</Button>
              </Link>
            </div>
          </div>

          {/* Prev / Next Navigation */}
          <div className="flex gap-4 mt-10">
            {prev && (
              <Link to={`/blog/${prev.slug}`} className="flex-1 group">
                <div className="rounded-xl border border-border bg-card p-4 hover:border-accent/30 transition-colors">
                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><ArrowLeft className="w-3 h-3" /> Previous</p>
                  <p className="text-sm font-medium text-foreground group-hover:text-accent line-clamp-2 transition-colors">{prev.title}</p>
                </div>
              </Link>
            )}
            {next && (
              <Link to={`/blog/${next.slug}`} className="flex-1 group">
                <div className="rounded-xl border border-border bg-card p-4 hover:border-accent/30 transition-colors text-right">
                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1 justify-end">Next <ArrowRight className="w-3 h-3" /></p>
                  <p className="text-sm font-medium text-foreground group-hover:text-accent line-clamp-2 transition-colors">{next.title}</p>
                </div>
              </Link>
            )}
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="mt-12">
              <h3 className="text-lg font-bold text-foreground mb-5">Related Articles</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((b) => (
                  <Link key={b.id} to={`/blog/${b.slug}`} className="group">
                    <div className="rounded-xl border border-border bg-card p-5 hover:border-accent/30 hover:shadow-md transition-all">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[b.category]} mb-3 inline-block`}>
                        {blogCategories[b.category]}
                      </span>
                      <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">{b.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><Clock className="w-3 h-3" /> {b.readTime} min read</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetail;
