// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import type { FromSchema } from '@feathersjs/schema'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const contactSchema = {
  $id: 'Contact',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'fullname', 'city', 'gender', 'address'],
  properties: {
    id: { type: 'number' },
    fullname: {type: 'string'},
    city: {type: 'string'},
    gender: {type: 'string'},
    address: {type: 'string'},
    text: { type: 'string' }
  }
} as const
export type Contact = FromSchema<typeof contactSchema>
export const contactValidator = getValidator(contactSchema, dataValidator)
export const contactResolver = resolve<Contact, HookContext>({})

export const contactExternalResolver = resolve<Contact, HookContext>({})

// Schema for creating new data
export const contactDataSchema = {
  $id: 'ContactData',
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    ...contactSchema.properties
  }
} as const
export type ContactData = FromSchema<typeof contactDataSchema>
export const contactDataValidator = getValidator(contactDataSchema, dataValidator)
export const contactDataResolver = resolve<ContactData, HookContext>({})

// Schema for updating existing data
export const contactPatchSchema = {
  $id: 'ContactPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...contactSchema.properties
  }
} as const
export type ContactPatch = FromSchema<typeof contactPatchSchema>
export const contactPatchValidator = getValidator(contactPatchSchema, dataValidator)
export const contactPatchResolver = resolve<ContactPatch, HookContext>({})

// Schema for allowed query properties
export const contactQuerySchema = {
  $id: 'ContactQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(contactSchema.properties)
  }
} as const
export type ContactQuery = FromSchema<typeof contactQuerySchema>
export const contactQueryValidator = getValidator(contactQuerySchema, queryValidator)
export const contactQueryResolver = resolve<ContactQuery, HookContext>({})
