import colors from 'vuetify/es5/util/colors'

export default {
  // Enable server-side rendering for static generation (link previews, SEO)
  ssr: true,
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Benjamin Sturgeon website',
    title: 'Benjamin Sturgeon website',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    script: [
      { src: '//gc.zgo.at/count.js', async: true, 'data-goatcounter': 'https://sturb.goatcounter.com/count' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/goatcounter.client.js',
    '~/plugins/stale-reload.client.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/content',
    '@nuxtjs/feed',
    ['@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyAXf49oUoLuzFTNeFukbThqGJnEAe9Lvbc",
          authDomain: "personal-f9db9.firebaseapp.com",
          databaseURL: "https://personal-f9db9-default-rtdb.europe-west1.firebasedatabase.app",
          projectId: "personal-f9db9",
          storageBucket: "personal-f9db9.appspot.com",
          messagingSenderId: "732308394978",
          appId: "1:732308394978:web:610a78f144af24da959fbb"
        },
        services: {
          database: true // Just as example. Can be any other service.
        }
      }]

  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.red.darken2,
          accent: colors.blue.darken2,
          secondary: colors.blue.darken2,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#5EC3FF',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken1,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3

        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  feed: [
    {
      path: '/feed.xml',
      async create(feed) {
        feed.options = {
          title: "Benjamin Sturgeon",
          link: 'https://benjaminsturgeon.com/feed.xml',
          description: 'Posts by Benjamin Sturgeon',
        }

        const fs = require('fs')
        const path = require('path')
        const contentDir = path.resolve(__dirname, 'content')
        const files = fs.readdirSync(contentDir)
          .filter(f => f.startsWith('inkhaven-day-') && f.endsWith('.md'))

        const posts = files.map(file => {
          const slug = file.replace(/\.md$/, '')
          const day = parseInt(slug.replace('inkhaven-day-', ''), 10)
          const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8')
          const titleMatch = raw.match(/^#\s+(.+)$/m)
          const title = titleMatch ? titleMatch[1].trim() : slug
          const stat = fs.statSync(path.join(contentDir, file))
          return { slug, day, title, content: raw, date: stat.mtime }
        })

        posts.sort((a, b) => b.day - a.day)

        for (const post of posts) {
          feed.addItem({
            title: post.title,
            id: `https://benjaminsturgeon.com/${post.slug}`,
            link: `https://benjaminsturgeon.com/${post.slug}`,
            date: post.date,
            description: post.content.slice(0, 300),
            content: post.content,
            author: [{ name: 'Benjamin Sturgeon' }],
          })
        }
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    },
  ],
}
