// const User = require('./model/model');

// const resolvers = {
//     Query: {
//         hello: () => {
//             return "hello world";
//         },
//         getAll: async (parent, args, context, info) => {
//             const { search, page = 1, pageSize = 10 } = args;
//             let query = {};
//             if (search) {
//                 query = {
//                     $or: [
//                         { name: { $regex: search, $options: 'i' } },
//                         { country: { $regex: search, $options: 'i' } }
//                     ]
//                 };
//             }
//             const totalCount = await User.countDocuments(query);
//             const totalPages = Math.ceil(totalCount / pageSize);
//             const results = await User.find(query)
//                 .skip((page - 1) * pageSize)
//                 .limit(pageSize);
//             return {
//                 totalCount,
//                 totalPages,
//                 currentPage: page,
//                 pageSize: pageSize,
//                 results
//             };
//         }
//     },
//     Mutation: {
//         createUser: async (_, { post }) => {
//             const { name, age, country } = post;
//             const newUser = await new User({ name, age, country }).save();
//             return newUser;
//         },
//         updateUser: async (_, { id, input }) => {
//             const { name, age, country } = input;
//             const updatedUser = await User.findByIdAndUpdate(id, { name, age, country }, { new: true });
//             return updatedUser;
//         },
//         deleteUser: async (_, { id }) => {
//             await User.findByIdAndDelete(id);
//             return "Data Delete";
//         }
//     }
// };

// module.exports = resolvers;

const User = require('./model/model');
const UserInquiry = require('./model/enquiry');

const resolvers = {
  Query: {
    hello: () => "hello world",
    getAllUsers: async (_, args) => {
      const { search, page = 1, pageSize = 10 } = args;
      let query = {};
      if (search) {
        query = {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { country: { $regex: search, $options: 'i' } }
          ]
        };
      }
      const totalCount = await User.countDocuments(query);
      const totalPages = Math.ceil(totalCount / pageSize);
      const results = await User.find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize);
      return {
        totalCount,
        totalPages,
        currentPage: page,
        pageSize: pageSize,
        results
      };
    },

    getAllUserInquiries: async (_, args) => {
        const { userId, search, page = 1, pageSize = 10 } = args;
        let query = {};
        if (userId) {
          query.userId = userId; // Filter by userId if provided
        }
        if (search) {
          query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
          ];
        }
        const totalCount = await UserInquiry.countDocuments(query);
        const totalPages = Math.ceil(totalCount / pageSize);
        const results = await UserInquiry.find(query)
          .skip((page - 1) * pageSize)
          .limit(pageSize);
        return {
          totalCount,
          totalPages,
          currentPage: page,
          pageSize: pageSize,
          results
        };
      },

      getSingleUserInquiry: async (_, { userId, search, page = 1, pageSize = 10 }) => {
        let query = { userId }; // Filter by userId
        if (search) {
          query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
          ];
        }
        const totalCount = await UserInquiry.countDocuments(query);
        const totalPages = Math.ceil(totalCount / pageSize);
        const results = await UserInquiry.find(query)
          .skip((page - 1) * pageSize)
          .limit(pageSize);
        return {
          totalCount,
          totalPages,
          currentPage: page,
          pageSize: pageSize,
          results
        };
      }

  },

  
  Mutation: {
    createUser: async (_, { post }) => {
      const { name, age, country } = post;
      const newUser = await new User({ name, age, country }).save();
      return newUser;
    },
    updateUser: async (_, { id, input }) => {
      const { name, age, country } = input;
      const updatedUser = await User.findByIdAndUpdate(id, { name, age, country }, { new: true });
      return updatedUser;
    },
    deleteUser: async (_, { id }) => {
        const user = await User.findById(id);
        if (!user) {
          throw new Error('User not found');
        }
        await User.findByIdAndDelete(id);
        return "User deleted successfully";
      },
    createUserInquiry: async (_, { post }) => {
      const { userId, title, description } = post;
      const newUserInquiry = await new UserInquiry({ userId, title, description }).save();
      return newUserInquiry;
    },
    updateUserInquiry: async (_, { id, input }) => {
      const { userId, title, description } = input;
      const updatedUserInquiry = await UserInquiry.findByIdAndUpdate(id, { userId, title, description }, { new: true });
      return updatedUserInquiry;
    },
    deleteUserInquiry: async (_, { id }) => {
        const user = await UserInquiry.findById(id);
        if (!user) {
          throw new Error('User not found');
        }
      await UserInquiry.findByIdAndDelete(id);
      return "User inquiry deleted successfully";
    }
  }
};

module.exports = resolvers;
