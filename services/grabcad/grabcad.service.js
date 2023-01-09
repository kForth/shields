import Joi from 'joi'
import { metric } from '../text-formatters.js'
import { BaseJsonService } from '../index.js'

class GrabCadURL extends BaseJsonService {
  static category = 'social'

  static route = {
    base: 'grabcad/url',
    pattern: ':id',
  }

  static examples = [
    {
      title: 'GrabCAD URL',
      namedParams: {
        id: 'arduino-uno-r3-1',
      },
      queryParams: {},
      // hard code the static preview
      // because link[] is not allowed in examples
      staticPreview: {
        label: 'GrabCAD',
        message: '',
        style: 'social',
      },
    },
  ]

  static defaultBadgeData = {
    namedLogo: 'grabcad',
    label: 'GrabCad',
  }

  static render({ id }) {
    return {
      label: 'GrabCAD',
      color: 'blue',
      message: '',
      style: 'social',
      link: `https://grabcad.com/library/${id}`,
    }
  }

  async handle({ id }) {
    return this.constructor.render({ id })
  }
}

const schema = Joi.object({
  likes_count: Joi.number(),
  downloads_count: Joi.number(),
  comments_count: Joi.number(),
}).required()

class GrabCadLikeCount extends BaseJsonService {
  static category = 'social'

  static route = {
    base: 'grabcad/likes',
    pattern: ':id',
  }

  static examples = [
    {
      title: 'GrabCAD Likes',
      namedParams: {
        id: 'arduino-uno-r3-1',
      },
      queryParams: {},
      // hard code the static preview
      // because link[] is not allowed in examples
      staticPreview: {
        label: 'Likes',
        message: metric(1586),
        style: 'social',
      },
    },
  ]

  static defaultBadgeData = {
    namedLogo: 'grabcad',
    label: 'Likes',
  }

  static render({ id, val }) {
    const route = encodeURIComponent(id)
    return {
      label: 'Likes',
      color: 'blue',
      message: metric(val),
      style: 'social',
      link: [
        `https://grabcad.com/library/${route}`,
        `https://grabcad.com/library/${route}/likes`,
      ],
    }
  }

  async fetch({ id }) {
    return this._requestJson({
      schema,
      url: `https://grabcad.com/community/api/v1/models/${id}`,
    })
  }

  async handle({ id }) {
    const { likes_count } = await this.fetch({ id })
    return this.constructor.render({ id, val: likes_count })
  }
}

class GrabCadDownloadCount extends BaseJsonService {
  static category = 'social'

  static route = {
    base: 'grabcad/downloads',
    pattern: ':id',
  }

  static examples = [
    {
      title: 'GrabCAD Downloads',
      namedParams: {
        id: 'arduino-uno-r3-1',
      },
      queryParams: {},
      // hard code the static preview
      // because link[] is not allowed in examples
      staticPreview: {
        label: 'Downloads',
        message: metric(71486),
        style: 'social',
      },
    },
  ]

  static defaultBadgeData = {
    namedLogo: 'grabcad',
    label: 'Downloads',
  }

  static render({ id, val }) {
    const route = encodeURIComponent(id)
    return {
      label: 'Downloads',
      color: 'blue',
      message: metric(val),
      style: 'social',
      link: `https://grabcad.com/library/${route}`,
    }
  }

  async fetch({ id }) {
    return this._requestJson({
      schema,
      url: `https://grabcad.com/community/api/v1/models/${id}`,
    })
  }

  async handle({ id }) {
    const { downloads_count } = await this.fetch({ id })
    return this.constructor.render({ id, val: downloads_count })
  }
}

class GrabCadCommentCount extends BaseJsonService {
  static category = 'social'

  static route = {
    base: 'grabcad/comments',
    pattern: ':id',
  }

  static examples = [
    {
      title: 'GrabCad Comments',
      namedParams: {
        id: 'arduino-uno-r3-1',
      },
      queryParams: {},
      // hard code the static preview
      // because link[] is not allowed in examples
      staticPreview: {
        label: 'Comments',
        message: metric(174),
        style: 'social',
      },
    },
  ]

  static defaultBadgeData = {
    namedLogo: 'grabcad',
    label: 'Comments',
  }

  static render({ id, val }) {
    const route = encodeURIComponent(id)
    return {
      label: 'Comments',
      color: 'blue',
      message: metric(val),
      style: 'social',
      link: `https://grabcad.com/library/${route}`,
    }
  }

  async fetch({ id }) {
    return this._requestJson({
      schema,
      url: `https://grabcad.com/community/api/v1/models/${id}`,
    })
  }

  async handle({ id }) {
    const { comments_count } = await this.fetch({ id })
    return this.constructor.render({ id, val: comments_count })
  }
}

export default [
  GrabCadURL,
  GrabCadLikeCount,
  GrabCadDownloadCount,
  GrabCadCommentCount,
]
