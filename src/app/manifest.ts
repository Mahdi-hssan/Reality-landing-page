import type { MetadataRoute } from 'next';
import { PLAY_STORE_ID } from '@/content/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Reality Sports',
    short_name: 'Reality',
    description: 'Sports club management software and the Reality Sports player app.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050913',
    theme_color: '#007AFF',
    icons: [{ src: '/logo.svg', sizes: 'any', type: 'image/svg+xml' }],
    related_applications: [
      { platform: 'play', id: PLAY_STORE_ID, url: `https://play.google.com/store/apps/details?id=${PLAY_STORE_ID}` },
      { platform: 'itunes', url: 'https://apps.apple.com/app/reality-sports/id6743450293' },
    ],
  };
}
