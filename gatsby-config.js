module.exports = {
  siteMetadata: {
    title: "React && TypeScript",
    subtitle: "Build more reliable, type-safe applications",
    description:
      "The companion website for Steve's \"React and TypeScript\" workshop for Frontend Masters",
    keywords: [
      "react",
      "typescript",
      "frontend masters"
    ]
  },
  pathPrefix: "/react-and-typescript", // if you're using GitHub Pages, put the name of the repo here with a leading slash
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-plugin-layout`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/lessons`,
        name: "markdown-pages"
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-prismjs`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: true,
              sizeByPixelDensity: false
            }
          }
        ]
      }
    }
  ]
};
