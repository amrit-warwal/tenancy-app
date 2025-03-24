import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

// const typesArray = loadFilesSync('src/apps/api/graphql/types/**/*.graphql');

const typesArray = loadFilesSync('src/graphql/types/**/*.graphql');

const typeDefs = mergeTypeDefs(typesArray);
export default typeDefs;
