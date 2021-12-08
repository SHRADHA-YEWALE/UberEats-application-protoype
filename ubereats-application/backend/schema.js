const graphql = require('graphql');
const Users = require("./Models/CustomerModel");
const Restaurant = require("./Models/RestaurantModel");
const Menu = require("./Models/MenuModel");


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;
const { customerSignUp } = require("./mutation/signUp");

const CustomerSignupType = new GraphQLObjectType({
    name: "cust_signup",
    fields: () => ({
      _id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
      country: { type: GraphQLString },
      status: { type: GraphQLString },
      message: { type: GraphQLString },
    })
  });

  const RestaurantSignupType = new GraphQLObjectType({
    name: "resto_signup",
    fields: () => ({
      _id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
      location: { type: GraphQLString },
      error: { type: GraphQLString }
    })
  });

  const RestaurantDataType = new GraphQLObjectType({
    name: "resto_profile",
    fields: () => ({
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      description: { type: GraphQLString },
      location: { type: GraphQLString },
      phonenumber: { type: GraphQLString },
      timings: { type: GraphQLString },
      res_image: { type: GraphQLString },
      error: { type: GraphQLString },
    })
  });
  
  const addMenuType = new GraphQLObjectType({
    name: "add_menu",
    fields: () => ({
      _id: { type: GraphQLID },
      restoid: { type: GraphQLString },
      itemname: { type: GraphQLString },
      itemdescription: { type: GraphQLString },
      itemprice: { type: GraphQLString },
      itemcategory: { type: GraphQLString },
      itemimage: { type: GraphQLString }
    })
  });

  const placeOrderType = new GraphQLObjectType({
    name: "place_order",
    fields: () => ({
      userid: { type: GraphQLString },
      restoid: { type: GraphQLString },
      address: { type: GraphQLString },
      custname: { type: GraphQLString },
      restoname: { type: GraphQLString },
      orderstatus: { type: GraphQLString },
      tax: { type: GraphQLString },
      delivery: { type: GraphQLString },
      totalprice: { type: GraphQLString }
    })
  });

  const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Root Query',
    fields: {
      fetchRestaurantData: {
            type: RestaurantDataType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
              return new Promise(async (resolve, reject) => {
                Restaurant.findOne({ _id: args.id }).then(result => {
                  console.log("Get Restaurant data result", result);
                  resolve(result);
                }).catch(err => {
                  console.log("Error:",err);
                  reject(err);
                })
              });
            },
          },
    }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    
    customerSignUp: {
        type: CustomerSignupType,
        args: {
            name: { type: GraphQLString },
            email: { type: GraphQLString },
            password: { type: GraphQLString },
            country: { type: GraphQLString }
        },
        resolve(parent, args) {
          return new Promise((resolve, reject) => {
            const data = {
              email: args.email.toLowerCase(),
              name: args.name,
              password: args.password,
              country: args.country
            };
            console.log("Signup data", data);
            const up = new Users(data);
            console.log("User signup data", up);
            up.save(function (err, result) {
              let res = {};
              if (err && err.message.includes("duplicate key")) {
                console.log("Error", error);  
                res.error = "ER_DUP_ENTRY"
              } else {
                console.log("Result", result);
                res = result;
              }
              resolve(res);
            });
          });
        },
      },

      restaurantSignup: {
        type: RestaurantSignupType,
        args: {
            name: { type: GraphQLString },
            email: { type: GraphQLString },
            password: { type: GraphQLString },
            location: { type: GraphQLString },
            
        },
        resolve(parent, args) {
          return new Promise((resolve, reject) => {
            const data = {
              email: args.email ,
              name: args.name,
              password: args.password,
              location: args.location

            };
            console.log("Signup data", data);
            const up = new Restaurant(data);
            console.log("Restaurant signup data", up);
            up.save(function (err, result) {
              let res = {};
              if (err && err.message.includes("duplicate key")) {
                console.log("Error", error);  
                res.error = "ER_DUP_ENTRY"
              } else {
                console.log("Restaurant Signup Result:", result);
                res = result;
              }
              return result;
            });
          });
        },
      },

      addMenu: {
        type: addMenuType,
        args: {
          restoid: { type: GraphQLString },
          itemname: { type: GraphQLString },
          itemdescription: { type: GraphQLString },
          itemprice: { type: GraphQLString },
          itemcategory: { type: GraphQLString },
          itemimage: { type: GraphQLString }
        },
        resolve(parent, args) {
          return new Promise((resolve, reject) => {
            const data = {
              restoid: args.restoid,
              itemname: args.itemname,
              itemdescription: args.itemdescription,
              itemprice: args.itemprice,
              itemcategory: args.itemcategory,
              itemimage: args.itemimage
            };
            console.log("Add Menu request data:", data);
            const up = new Menu(data);
            console.log("Add menu data:", up);
            up.save(function (err, result) {
              let menuData = {};
              if (err && err.message.includes("duplicate key")) {
                console.log("Error", error);  
                res.error = "ER_DUP_ENTRY"
              } else {
                console.log("Add menu Result:", result._id);
                menuData = {
                  _id: result._id,
                  itemname: result.itemname,
                  itemdescription: result.itemdescription,
                  itemprice: result.itemprice,
                  itemcategory: result.itemcategory
                }
              }
              resolve(menuData);
            });
          });
        },
      },
      addMenu: {
        type: placeOrderType,
      }  
  }
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

module.exports = schema;
