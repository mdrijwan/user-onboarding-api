import {
  SignUpCommand,
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  AuthFlowType,
  ResendConfirmationCodeCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  ChangePasswordCommand,
  UpdateUserAttributesCommand,
  GetUserCommand,
  ListUsersCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import { formatResponse } from '../../helpers/response'
import { StatusCode } from '../model/dto'
import { getSecret } from '../../config'

const clientId = process.env.CLIENT
const config = { region: process.env.AWS_REGION }
const client = new CognitoIdentityProviderClient(config)

export const signUp = async (event: { body: string }) => {
  const data = event.body as string
  const { username, password, fname, lname, phone } = JSON.parse(data)
  const name = `${fname} ${lname}`
  try {
    const command = new SignUpCommand({
      ClientId: clientId,
      Username: username,
      Password: password,
      UserAttributes: [
        { Name: 'name', Value: name },
        { Name: 'email', Value: username },
        { Name: 'phone_number', Value: phone },
      ],
    })

    console.log('Registering...')

    const result = await client.send(command)
    console.log('RES', result)
    const body = {
      success: `User created - ${username} `,
    }

    return formatResponse(StatusCode.SUCCESS, body)
  } catch (error) {
    console.error('ERROR:', error)
    const body = {
      failure: error,
    }

    return formatResponse(StatusCode.ERROR, body)
  }
}

export const confirmSignUp = async (event: { body: string }) => {
  const data = JSON.parse(event.body)
  const { username, code } = data

  const command = new ConfirmSignUpCommand({
    ClientId: clientId,
    Username: username,
    ConfirmationCode: code,
  })

  return client.send(command)
}

export const initiateAuth = async (event: { body: string }) => {
  const data = JSON.parse(event.body)
  const { username, password } = data

  const command = new InitiateAuthCommand({
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
    ClientId: clientId,
  })

  try {
    const result = await client.send(command)
    return formatResponse(StatusCode.SUCCESS, { success: result })
  } catch (error) {
    return formatResponse(StatusCode.ERROR, { failure: error })
  }
}

export const getToken = async (event: { body: string }) => {
  const data = JSON.parse(event.body)
  const { username, password } = data

  const command = new InitiateAuthCommand({
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
    ClientId: clientId,
  })

  try {
    const result = await client.send(command)
    return formatResponse(StatusCode.SUCCESS, {
      success: { token: result.AuthenticationResult?.AccessToken },
    })
  } catch (error) {
    return formatResponse(StatusCode.ERROR, { failure: error })
  }
}

export const resendConfirmationCode = async (event: { body: string }) => {
  const data = JSON.parse(event.body)
  const { username } = data
  const command = new ResendConfirmationCodeCommand({
    ClientId: clientId,
    Username: username,
  })

  return client.send(command)
}

export const forgotPassword = async (event: { body: string }) => {
  const data = JSON.parse(event.body)
  const { username } = data
  const command = new ForgotPasswordCommand({
    ClientId: clientId,
    Username: username,
  })

  return client.send(command)
}

export const confirmForgotPassword = async (event: { body: string }) => {
  const data = JSON.parse(event.body)
  const { username, password, code } = data
  const command = new ConfirmForgotPasswordCommand({
    ClientId: clientId,
    Username: username,
    ConfirmationCode: code,
    Password: password,
  })

  return client.send(command)
}

export const changePassword = async (event: { body: string }) => {
  const data = JSON.parse(event.body)
  const { old_password, new_password, token } = data
  const command = new ChangePasswordCommand({
    PreviousPassword: old_password,
    ProposedPassword: new_password,
    AccessToken: token,
  })

  return client.send(command)
}

export const getUser = async (event: { headers: { authorization: string } }) => {
  const bearerToken = event.headers.authorization
  const accessToken = bearerToken.replace('Bearer ', '')

  try {
    const command = new GetUserCommand({
      AccessToken: accessToken,
    })

    const response = await client.send(command)
    const body = {
      userAttributes: response.UserAttributes,
    }

    return formatResponse(StatusCode.SUCCESS, body)
  } catch (error) {
    const body = {
      failure: error,
    }

    return formatResponse(StatusCode.ERROR, body)
  }
}

export const listUsers = async () => {
  const secrets = await getSecret()
  const userPoolId = secrets.userPool
  const command = new ListUsersCommand({
    UserPoolId: userPoolId,
  })

  return client.send(command)
}

export const updateUser = async (event: { body: string }) => {
  const data = JSON.parse(event.body)
  const { token, fname, lname, phone } = data
  const name = fname && lname ? `${fname} ${lname}` : undefined
  const userAttributes = []
  if (name) {
    const nameData = { Name: 'name', Value: name }
    userAttributes.push(nameData)
  }

  if (phone) {
    const phoneData = { Name: 'phone_number', Value: phone }
    userAttributes.push(phoneData)
  }

  if (name || phone) {
    const command = new UpdateUserAttributesCommand({
      AccessToken: token,
      UserAttributes: userAttributes,
    })

    return client.send(command)
  }

  return 'No Update Done'
}
