/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

import fs from 'fs'
import path from 'path'

const verifyEmailTemplate = fs.readFileSync(path.resolve('src/templates/verify-email.html'), 'utf8')

const sendVerifyEmail = (toAddress: string, subject: string, body: string) => {
  // const sendEmailCommand = createSendEmailCommand({
  //   fromAddress: envConfig.sesFromAddress,
  //   toAddresses: toAddress,
  //   body,
  //   subject
  // })
  // return sesClient.send(sendEmailCommand)
}

export const sendVerifyRegisterEmail = (
  toAddress: string,
  email_verify_token: string,
  template: string = verifyEmailTemplate
) => {
  // return sendVerifyEmail(
  // )
}

// export const sendForgotPasswordEmail = (
//   toAddress: string,
//   forgot_password_token: string,
//   template: string = verifyEmailTemplate
// ) => {
//   return sendVerifyEmail(
//     toAddress,
//     'Forgot Password',
//     template
//       .replace('{{title}}', 'You are receiving this email because you requested to reset your password')
//       .replace('{{content}}', 'Click the button below to reset your password')
//       .replace('{{titleLink}}', 'Reset Password')
//       .replace('{{link}}', `${envConfig.clientUrl}/forgot-password?token=${forgot_password_token}`)
//   )
// }
