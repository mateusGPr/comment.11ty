const htmlmin = require('html-minifier')
const now = String(Date.now())

module.exports = function (eleventyConfig) {
    eleventyConfig.addWatchTarget('./styles/tailwind.config.js')
    eleventyConfig.addWatchTarget('./styles/tailwind.css')

    eleventyConfig.addPassthroughCopy({
        './_tmp/style.css': './styles/style.css'
    })

    eleventyConfig.addPassthroughCopy({
        './resources/comment.png': './img/comment.png'
    })
    
    eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
        if (
            process.env.ELEVENTY_PRODUCTION &&
            outputPath &&
            outputPath.endsWith('.html')
        ) {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
            });
            return minified
        }

        return content
    })
    eleventyConfig.addShortcode('version', () => { return now; })
};