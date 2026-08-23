import {
  defineConfig,
  minimal2023Preset,
} from '@vite-pwa/assets-generator/config'

// icon glyph is transparent; give maskable/apple variants the app's dark background
export default defineConfig({
  headLinkOptions: {
    preset: '2023',
  },
  preset: {
    ...minimal2023Preset,
    maskable: {
      ...minimal2023Preset.maskable,
      resizeOptions: { background: '#121212', fit: 'contain' },
    },
    apple: {
      ...minimal2023Preset.apple,
      resizeOptions: { background: '#121212', fit: 'contain' },
    },
  },
  images: ['public/logo.svg'],
})
