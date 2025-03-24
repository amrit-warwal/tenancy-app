import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: './src/graphql/types/**/*.graphql',
    documents: ['./src/**/!(*.test).{ts,tsx}'],
    ignoreNoDocuments: true,
    generates: {
        './src/graphql/__generated/resolvers-types.ts': {
            plugins: ['typescript', 'typescript-resolvers'],
            config: {
                useIndexSignature: true,
            },
        },
        './src/graphql/__generated/gql/': {
            preset: 'client',
            plugins: [],
        },
    },
};

export default config;
