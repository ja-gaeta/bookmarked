import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import kebabCase from "lodash/kebabCase"
import "./templates.css"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  console.log(post.frontmatter.tags)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <h5
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginTop: "1rem",
              marginBottom: 0,
            }}
          >
            Autor:{" "}
            <a
              href={post.frontmatter.author_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {post.frontmatter.author}
            </a>
          </h5>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
            }}
          >
            {post.frontmatter.date}
          </p>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginTop: 0,
              marginBottom: rhythm(1),
              fontWeight: 600,
            }}
          >
            Tags:
            {post.frontmatter.tags.map((tag, index) => {
              return (
                <span
                  key={index}
                  style={{
                    margin: "0 0.3rem 0 0.3rem",
                    color: "#fff",
                    background: "#6e4bb8",
                    padding: "0.4rem",
                    borderRadius: "20%",
                    boxShadow: "7px 8px 16px -3px rgba(0,0,0,0.75)",
                  }}
                >
                  <Link className="links" to={`/tags/${kebabCase(tag)}/`}>
                    {tag}
                  </Link>
                </span>
              )
            })}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        author
        author_link
        title
        tags
        date(formatString: "DD/MM/YYYY")
        description
      }
    }
  }
`
