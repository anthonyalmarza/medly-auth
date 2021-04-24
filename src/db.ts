interface IUserSignUpInput {
    password: string;
}

interface IUserSignUpOutput {
    id: string;
}

// NOTE: this is the data we want (min) - use something like dynamodb-toolbox
// id, created, passwordHash, lastedLogin
// TODO: setup aws ddb clients (DynamoDb & DocumentClient), setup table, setup User Entity

export const createUser = async (inputs: IUserSignUpInput): Promise<IUserSignUpOutput> =>
    Promise.resolve({ id: 'some-uuid/perhaps-ksuid-if-dynamodb' });
