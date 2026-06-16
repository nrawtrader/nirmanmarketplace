import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogs, blogCategories } from "@/data/blogs";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const categoryColors: Record<string, string> = {
  cement: "bg-amber-100 text-amber-800",
  steel: "bg-blue-100 text-blue-800",
  "construction-tips": "bg-green-100 text-green-800",
  guides: "bg-purple-100 text-purple-800",
};

const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = activeCategory === "all"
    ? blogs
    : blogs.filter((b) => b.category === activeCategory);

  const featured = blogs[0];
  const rest = blogs.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Construction Knowledge Base
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Learn Before You Build
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Expert guides on cement, steel, cost estimation, and construction tips — written for homebuilders in Lucknow.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-10 scrollbar-none justify-center flex-wrap">
            <button
              onClick={() => setActiveCategory("all")}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                activeCategory === "all"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border text-muted-foreground hover:border-accent hover:text-foreground"
              }`}
            >
              All Articles
            </button>
            {Object.entries(blogCategories).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  activeCategory === key
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-muted-foreground hover:border-accent hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Featured Article */}
          {activeCategory === "all" && (
            <Link to={`/blog/${featured.slug}`} className="block mb-12 group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-xl hover:shadow-accent/5 hover:border-accent/30 transition-all duration-500 grid md:grid-cols-5"
              >
                <div className="md:col-span-3 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[featured.category]}`}>
                        {blogCategories[featured.category]}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {featured.readTime} min read
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors leading-snug">
                      {featured.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">{featured.excerpt}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-6 text-accent font-medium text-sm group-hover:gap-3 transition-all">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                <div className="md:col-span-2 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center p-8 min-h-[200px]">
                  <div className="text-center">
                    <div className="text-6xl mb-3">🏗️</div>
                    <p className="text-sm font-medium text-muted-foreground">Featured Article</p>
                  </div>
                </div>
              </motion.div>
            </Link>
          )}

          {/* Articles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeCategory === "all" ? rest : filtered).map((blog, i) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/blog/${blog.slug}`} className="group block h-full">
                  <div className="h-full rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg hover:shadow-accent/5 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 flex flex-col">
                    <div className="bg-gradient-to-br from-secondary to-secondary/50 h-40 flex items-center justify-center">
                      <span className="text-5xl">
                        {blog.category === "cement" ? "🧱" : blog.category === "steel" ? "⚙️" : blog.category === "guides" ? "📊" : "💡"}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[blog.category]}`}>
                          {blogCategories[blog.category]}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {blog.readTime} min
                        </span>
                      </div>
                      <h3 className="font-bold text-foreground mb-2 leading-snug group-hover:text-accent transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 flex-1">{blog.excerpt}</p>
                      <div className="flex items-center gap-1.5 mt-4 text-accent text-sm font-medium group-hover:gap-2.5 transition-all">
                        Read more <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg font-medium mb-1">No articles in this category yet</p>
              <p className="text-sm">Check back soon — we publish new guides every week</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blogs;
