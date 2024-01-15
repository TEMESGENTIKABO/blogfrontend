const siteUrl = "http://localhost:8000";

export default {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: "/secret" },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [`${siteUrl}/sitemap.xml`],
  },
  exclude: ["/secret"],
};
