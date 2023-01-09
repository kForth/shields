import Joi from 'joi'
import { metric } from '../text-formatters.js'
import { BaseJsonService } from '../index.js'

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

const schema = Joi.object({
  url: Joi.string(),
  like_count: Joi.number(),
  collect_count: Joi.number(),
  comment_count: Joi.number(),
  download_count: Joi.number(),
  view_count: Joi.number(),
  remix_count: Joi.number(),
  make_count: Joi.number(),
})

class ThingiverseURL extends BaseJsonService {
  static category = 'social'

  static route = {
    base: 'thingiverse/url',
    pattern: ':thing',
  }

  static examples = [
    {
      title: 'Thingiverse URL',
      namedParams: {
        thing: '2738211',
      },
      staticPreview: this.render({
        thing: '2738211',
        sample: true,
      }),
    },
  ]

  static defaultBadgeData = {
    namedLogo: 'thingiverse',
    color: 'blue',
  }

  static render({ thing, sample }) {
    const route = encodeURIComponent(thing)
    const shield = {
      style: 'social',
      label: 'Thingiverse',
      message: '',
      link: `https://thingiverse.com/thing:${route}`,
    }

    if (sample) delete shield.link
    return shield
  }

  async handle({ thing }) {
    return this.constructor.render({ thing })
  }
}

class ThingiverseQuery extends BaseJsonService {
  static formats = [
    'url',
    'likes',
    'collects',
    'comments',
    'downloads',
    'views',
    'remixes',
    'makes',
  ]

  static _thing = '2738211'
  static _model = {
    like_count: 33139,
    collect_count: 47333,
    comment_count: 404,
    download_count: 349490,
    view_count: 619467,
    remix_count: 112,
    make_count: 1338,
  }

  static category = 'social'

  static route = {
    base: 'thingiverse',
    pattern: `:format(${this.formats.join('|')})/:thing`,
  }

  static auth = {
    passKey: 'thingiverse_app_token',
    authorizedOrigins: ['https://api.thingiverse.com'],
    isRequired: true,
  }

  static examples = this.formats.map(format => ({
    title: `Thingiverse ${toTitleCase(format)}`,
    namedParams: {
      format,
      thing: this._thing,
    },
    staticPreview: this.render({
      format,
      thing: this._thing,
      model: this._model,
      sample: true,
    }),
  }))

  static defaultBadgeData = {
    namedLogo: 'thingiverse',
    color: 'blue',
  }

  static render({ format, thing, model, sample }) {
    const route = encodeURIComponent(thing)
    let link = `https://thingiverse.com/thing:${route}`
    let label = 'Thingiverse'
    let message = ''

    switch (format) {
      case 'url':
        label = 'Thingiverse'
        message = ''
        break
      case 'likes':
        label = 'Likes'
        message = metric(model.like_count)
        link = [link, `${link}/likes`]
        break
      case 'collects':
        label = 'Collects'
        message = metric(model.collect_count)
        break
      case 'comments':
        label = 'Comments'
        message = metric(model.comment_count)
        break
      case 'downloads':
        label = 'Downloads'
        message = metric(model.download_count)
        break
      case 'views':
        label = 'Views'
        message = metric(model.view_count)
        break
      case 'remixes':
        label = 'Remixes'
        message = metric(model.remix_count)
        break
      case 'makes':
        label = 'Makes'
        message = metric(model.make_count)
        break
      default:
        break
    }

    const shield = {
      style: 'social',
      label,
      message,
      link,
    }

    if (sample) delete shield.link
    return shield
  }

  async fetch({ thing }) {
    return this._requestJson(
      this.authHelper.withBearerAuthHeader(
        {
          schema,
          url: `https://api.thingiverse.com/things/${thing}`,
        },
        'Bearer'
      )
    )
  }

  async handle({ format, thing }) {
    const model = await this.fetch({ thing })
    return this.constructor.render({ format, thing, model, sample: false })
  }
}

export default [ThingiverseURL, ThingiverseQuery]
