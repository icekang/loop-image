const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');// ... or using `require()`
// const { GraphQLServer } = require('graphql-yoga')

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

const Num = mongoose.model('Num', {
    no: Number
});

const typeDefs = `
  type Query {
    no(num: Int): String!
    nums: [Num]
  }
  type Num {
    id: ID!
    no: Int!
  }
  type Mutation {
    createNum(no: Int!): Num
    updateNum(id: ID!,no: Int): Int
  }

`

const resolvers = {
  Query: {
    no: (_, { num }) => `Number is ${num || 0}`,
    nums: () => Num.find()
  },
  Mutation: {
      createNum: async (_, { no }) => {
        const nums = new Num({no});
        await nums.save();
        return nums;
      },
      updateNum: async (_, { id, no }) => {
          await Num.findByIdAndUpdate(id, {no});
          return true;
      }
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })
mongoose.connection.once('open', function() {
    server.start(() => console.log('Server is running on localhost:4000'))
});