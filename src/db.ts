interface IUserSignUpInput {
    password: string;
}

interface IUserSignUpOutput {
    id: string;
}

export const createUser = async (inputs: IUserSignUpInput): Promise<IUserSignUpOutput> =>
    Promise.resolve({ id: 'some-uuid/perhaps-ksuid-if-dynamodb' });
