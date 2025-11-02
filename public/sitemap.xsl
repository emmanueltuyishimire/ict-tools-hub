<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

<xsl:template match="/">
  <html>
    <head>
      <title>XML Sitemap</title>
      <style type="text/css">
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          font-size: 16px;
          color: #333;
          background-color: #f8f9fa;
          margin: 0;
          padding: 20px;
        }
        #main {
          max-width: 900px;
          margin: 0 auto;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          padding: 20px 40px;
        }
        h1 {
          font-size: 24px;
          color: #212529;
          border-bottom: 1px solid #dee2e6;
          padding-bottom: 10px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #dee2e6;
        }
        th {
          background-color: #f2f2f2;
          font-weight: 600;
        }
        tr:hover {
          background-color: #f1f1f1;
        }
        a {
          color: #007bff;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        p {
            color: #6c757d;
        }
      </style>
    </head>
    <body>
      <div id="main">
        <h1>XML Sitemap</h1>
        <p>This is an XML sitemap, intended for consumption by search engines.</p>
        <p>You can find more information about XML sitemaps at <a href="http://sitemaps.org">sitemaps.org</a>.</p>
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Last Modified</th>
              <th>Change Frequency</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <tr>
                <td>
                  <xsl:variable name="loc" select="sitemap:loc"/>
                  <a href="{$loc}"><xsl:value-of select="$loc"/></a>
                </td>
                <td><xsl:value-of select="sitemap:lastmod"/></td>
                <td><xsl:value-of select="sitemap:changefreq"/></td>
                <td><xsl:value-of select="sitemap:priority"/></td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </div>
    </body>
  </html>
</xsl:template>
</xsl:stylesheet>