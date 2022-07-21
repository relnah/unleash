import { FromSchema } from 'json-schema-to-ts';
import { variantSchema } from './variant-schema';
import { overrideSchema } from './override-schema';

export const playgroundFeatureSchema = {
    $id: '#/components/schemas/playgroundFeatureSchema',
    description:
        'A simplified feature toggle model intended for the Unleash playground.',
    type: 'object',
    additionalProperties: false,
    required: ['name', 'projectId', 'isEnabled', 'variant', 'variants'],
    properties: {
        name: { type: 'string', examples: ['my-feature'] },
        projectId: { type: 'string', examples: ['my-project'] },
        isEnabled: { type: 'boolean', examples: [true] },
        variant: {
            type: 'object',
            additionalProperties: false,
            required: ['name', 'enabled'],
            properties: {
                name: { type: 'string' },
                enabled: { type: 'boolean' },
                payload: {
                    type: 'object',
                    additionalProperties: false,
                    required: ['type', 'value'],
                    properties: {
                        type: {
                            type: 'string',
                            enum: ['json', 'csv', 'string'],
                        },
                        value: { type: 'string' },
                    },
                },
            },
            nullable: true,
            examples: ['green'],
        },
        variants: { type: 'array', items: { $ref: variantSchema.$id } },
    },
    components: { schemas: { variantSchema, overrideSchema } },
} as const;

export type PlaygroundFeatureSchema = FromSchema<
    typeof playgroundFeatureSchema
>;