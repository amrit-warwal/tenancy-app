import { makeExecutableSchema } from '@graphql-tools/schema';

import resolvers from '@/graphql/resolvers';
import typeDefs from '@/graphql/types/merge-types';

const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default executableSchema;
