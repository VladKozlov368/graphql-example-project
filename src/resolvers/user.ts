import {Resolvers} from "../generated/graphql";
import {createTokensPair, encryptCredential} from "../utils";
import {Role} from "../types";
import {SevenBoom as Boom} from "graphql-apollo-errors";
import sequelize from "../db";
import {User} from "../models/User";

const resolver: Resolvers = {
    Query: {
        user: async (_, args, {models}): Promise<any> => {
            const {id} = args;

            return models.User.findByPk(id);
        },
        showArr: async (_, args, {models}): Promise<any> => {

            return args.show;
        },
    },
    Mutation: {
        userSignUp: async (_, args, {models}): Promise<any> => {
            let user: User = await models.User.findOne({
                where: {
                    email: args.email
                }
            });

            if (user) throw Boom.unauthorized('This email address registered');

            const encryptPassword = await encryptCredential(args.password);

            let transaction = await sequelize.transaction();
            let newUser: any;

            try {
                newUser = await models.User.create({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: encryptPassword,
                }, {
                    transaction
                });
                transaction.commit();
            } catch (e) {
                transaction.rollback();
            }

            if (!newUser) throw Boom.badData('user not created successfully');

            const tokens = await createTokensPair(newUser.dataValues.id, Role.User);

            return {
                ...tokens
            };
        },
    }
};

export default resolver;
