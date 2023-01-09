import { isMetric } from '../test-validators.js'
import { ServiceTester } from '../tester.js'

export const t = new ServiceTester({
  id: 'grabcad',
  title: 'GrabCAD',
})

t.create('URL')
  .get('/url/arduino-uno-r3-1')
  .expectBadge({
    label: 'GrabCAD',
    message: '',
    link: 'https://grabcad.com/library/arduino-uno-r3-1',
  })

t.create('Invalid Model ID (non-existent)')
  .get('/likes/model-that-should-not-exist-123')
  .expectBadge({
    label: 'Likes',
    message: 'not found',
  })

t.create('Invalid Model ID (just-spaces)')
  .get('/likes/%20%20')
  .expectBadge({
    label: 'Likes',
    message: 'undefined',
  })

t.create('Likes')
  .get('/likes/arduino-uno-r3-1')
  .expectBadge({
    label: 'Likes',
    message: isMetric,
    link: [
      'https://grabcad.com/library/arduino-uno-r3-1',
      'https://grabcad.com/library/arduino-uno-r3-1/likes',
    ],
  })

t.create('Downloads').get('/downloads/arduino-uno-r3-1')
.expectBadge({
    label: 'Downloads',
    message: isMetric,
    link: 'https://grabcad.com/library/arduino-uno-r3-1',
  })

t.create('Comments').get('/comments/arduino-uno-r3-1')
  .expectBadge({
    label: 'Comments',
    message: isMetric,
    link: 'https://grabcad.com/library/arduino-uno-r3-1',
  })
