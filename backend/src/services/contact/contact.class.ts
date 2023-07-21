// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Contact, ContactData, ContactPatch, ContactQuery } from './contact.schema'

export type { Contact, ContactData, ContactPatch, ContactQuery }

export interface ContactParams extends KnexAdapterParams<ContactQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class ContactService<ServiceParams extends Params = ContactParams> extends KnexService<
  Contact,
  ContactData,
  ContactParams,
  ContactPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'contact',
    multi: ['remove', 'patch']
  }
}
