import gql from 'graphql-tag'
import Joi from 'joi'
import { metric, starRating } from '../text-formatters.js'
import { BaseService, BaseGraphqlService } from '../index.js'

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

const schema = Joi.object({
  data: Joi.object({
    print: Joi.object({
      ratingAvg: Joi.string(),
      ratingCount: Joi.number(),
      shareCount: Joi.number(),
      likesCount: Joi.number(),
      makesCount: Joi.number(),
      downloadCount: Joi.number(),
      displayCount: Joi.number(),
      collectionsCount: Joi.number(),
      commentCount: Joi.number(),
      remixCount: Joi.number(),
    }).required(),
  }).required(),
}).required()

class PrintablesURL extends BaseService {
  static category = 'social'

  static route = {
    base: 'printables/url',
    pattern: ':id',
  }

  static examples = [
    {
      title: 'Printables URL',
      namedParams: {
        id: '3161',
      },
      // hard code the static preview
      // because link[] is not allowed in examples
      staticPreview: this.render({
        id: '3161',
        sample: true,
      }),
    },
  ]

  static defaultBadgeData = {
    namedLogo: 'printables',
    color: 'orange',
  }

  static render({ id, sample }) {
    const route = encodeURIComponent(id)
    const shield = {
      style: 'social',
      label: 'Printables',
      message: '',
      link: [`https://printables.com/model/${route}`],
    }

    if (sample) delete shield.link
    return shield
  }

  async handle({ id }) {
    return this.constructor.render({ id })
  }
}

class PrintablesQuery extends BaseGraphqlService {
  static formats = [
    'rating',
    'stars',
    'likes',
    'makes',
    'downloads',
    'views',
    'collections',
    'comments',
    'remixes',
  ]

  static _id = '3161'
  static _model = {
    ratingAvg: '4.96',
    ratingCount: 750,
    likesCount: 2774,
    makesCount: 2149,
    downloadCount: 42439,
    displayCount: 71458,
    collectionsCount: 1443,
    commentCount: 2333,
    remixCount: 56,
  }

  static category = 'social'

  static route = {
    base: 'printables',
    pattern: `:format(${this.formats.join('|')})/:id`,
  }

  static examples = this.formats.map(format => ({
    title: `Printables ${toTitleCase(format)}`,
    namedParams: {
      format,
      id: this._id,
    },
    staticPreview: this.render({
      format,
      id: this._id,
      model: this._model,
      sample: true,
    }),
  }))

  static defaultBadgeData = {
    namedLogo: 'printables',
    color: 'orange',
  }

  static render({ format, id, model, sample }) {
    const route = encodeURIComponent(id)
    const link = `https://printables.com/model/${route}`
    const label = toTitleCase(format)
    let message = ''

    switch (format) {
      case 'rating':
        message =
          model.ratingCount === 0
            ? 'unrated'
            : `${parseFloat(model.ratingAvg).toFixed(1)}/5 (${metric(
                model.ratingCount
              )})`
        break
      case 'stars':
        message =
          model.ratingCount === 0
            ? 'unrated'
            : starRating(parseFloat(model.ratingAvg))
        break
      case 'likes':
        message = metric(model.likesCount)
        break
      case 'makes':
        message = metric(model.makesCount)
        break
      case 'downloads':
        message = metric(model.downloadCount)
        break
      case 'views':
        message = metric(model.displayCount)
        break
      case 'collections':
        message = metric(model.collectionsCount)
        break
      case 'comments':
        message = metric(model.commentCount)
        break
      case 'remixes':
        message = metric(model.remixCount)
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

  async fetch({ id }) {
    return this._requestGraphql({
      url: 'https://api.printables.com/graphql/',
      query: gql`
        query ($id: ID!) {
          print(id: $id) {
            ratingAvg
            ratingCount
            shareCount
            likesCount
            makesCount
            downloadCount
            displayCount
            collectionsCount
            commentCount
            remixCount
          }
        }
      `,
      variables: { id },
      schema,
    })
  }

  async handle({ format, id }) {
    console.log(id)
    console.log('start')
    const model = await this.fetch({ id })
    console.log('done')
    console.log(model)
    console.log('end')
    return this.constructor.render({ format, id, model, sample: false })
  }
}

export default [PrintablesURL, PrintablesQuery]
