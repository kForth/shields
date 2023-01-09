import { isMetric } from '../test-validators.js'
import { ServiceTester } from '../tester.js'

export const t = new ServiceTester({
  id: 'thingiverse',
  title: 'Thingiverse',
})

t.create('URL').get('/url/3161').expectBadge({
  label: 'URL',
  message: '',
  link: 'https://thingiverse.com/thing:3161',
})

t.create('Invalid Model ID (non-existent)')
  .get('/likes/model-that-should-not-exist-123')
  .expectBadge({
    label: 'Likes',
    message: 'not found',
  })

t.create('Invalid Model ID (just-spaces)').get('/likes/%20%20').expectBadge({
  label: 'Likes',
  message: 'undefined',
})

t.create('Rating').get('/rating/3161').expectBadge({
  label: 'Rating',
  message: isMetric,
  link: 'https://thingiverse.com/thing:3161',
})

t.create('Stars').get('/stars/3161').expectBadge({
  label: 'Stars',
  message: isMetric,
  link: 'https://thingiverse.com/thing:3161',
})

t.create('Likes').get('/likes/3161').expectBadge({
  label: 'Likes',
  message: isMetric,
  link: 'https://thingiverse.com/thing:3161',
})

t.create('Makes').get('/makes/3161').expectBadge({
  label: 'Makes',
  message: isMetric,
  link: 'https://thingiverse.com/thing:3161',
})

t.create('Downloads').get('/downloads/3161').expectBadge({
  label: 'Downloads',
  message: isMetric,
  link: 'https://thingiverse.com/thing:3161',
})

t.create('Views').get('/views/3161').expectBadge({
  label: 'Views',
  message: isMetric,
  link: 'https://thingiverse.com/thing:3161',
})

t.create('Collections').get('/collections/3161').expectBadge({
  label: 'Collections',
  message: isMetric,
  link: 'https://thingiverse.com/thing:3161',
})

t.create('Comments').get('/comments/3161').expectBadge({
  label: 'Comments',
  message: isMetric,
  link: 'https://thingiverse.com/thing:3161',
})

t.create('Remixes').get('/remixes/3161').expectBadge({
  label: 'Remixes',
  message: isMetric,
  link: 'https://thingiverse.com/thing:3161',
})
