/*----------------------------------------------------------------------------------------------------
                                   Admin resolver
----------------------------------------------------------------------------------------------------*/

import {SevenBoom as Boom} from 'graphql-apollo-errors';
import {AuthPayload, Resolvers} from '../generated/graphql';
import {Role} from "../types";
import {createTokensPair, encryptCredential, validateCredential} from "../utils";

/*--------------------------------------------------------------------------------------------------*/


/**
 * Admin resolvers
 */
const resolver: Resolvers = {
    Query: {},
    Mutation: {
        /**
         * Admin sign in via email and password
         *
         * @return accessToken, secretToken
         */
        adminSignIn: async (_, args, {models, appSecret}): Promise<AuthPayload> => {
            const {Admin: adminModel} = models;
            const {email, password} = args;

            const admin = await adminModel.findOne({
                where: {
                    email,
                },
                raw: true,
            });

            if (!admin) throw Boom.unauthorized('This email address is not registered');

            const validate = await validateCredential(password, admin.password);

            if (!validate) throw Boom.unauthorized('Password is not correct');

            const tokens = await createTokensPair(admin.id, Role.Admin);

            return {...tokens, admin};
        },

        /**
         * Admin sign in via email and password
         *
         * @return accessToken, secretToken
         */
        adminSignUp: async (_, args, {models, appSecret}): Promise<AuthPayload> => {
            const {Admin: adminModel} = models;
            const {email, password} = args;

            const admin = await adminModel.findOne({
                where: {
                    email,
                },
                raw: true,
            });

            if (admin) throw Boom.unauthorized('This email address registered');

            const validate = await encryptCredential(password);
            console.log(validate);

            await adminModel.create({email, password});

            // if (!validate) throw Boom.unauthorized('Password is not correct');

            const tokens = await createTokensPair(admin.id, Role.Admin);

            return {...tokens, admin};
        },
    },
};

export default resolver;
