/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['mongodb']);

const nextConfig = withTM({
  reactStrictMode: true,
})

module.exports = nextConfig
