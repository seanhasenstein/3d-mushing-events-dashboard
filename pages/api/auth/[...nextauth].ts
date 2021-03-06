import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import nodemailer from 'nodemailer';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { mongoClientPromise } from '../../../db/connect';
import { html, text } from '../../../utils/email';
import { createReceiptNumber } from '../../../utils/misc';

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('Must provide NEXTAUTH_SECRET in .env.local');
}

export default NextAuth({
  providers: [
    EmailProvider({
      server: process.env.NEXTAUTH_EMAIL_SERVER,
      from: process.env.NEXTAUTH_EMAIL_FROM,
      sendVerificationRequest: async ({
        identifier: email,
        url,
        provider: { server, from },
      }) => {
        const id = createReceiptNumber();
        const { host } = new URL(url);
        const transport = nodemailer.createTransport(server);
        await transport.sendMail({
          to: email,
          from,
          subject: `Sign in to ${host} [#${id}]`,
          text: text({ url, host }),
          html: html({ url }),
        });
      },
    }),
  ],
  adapter: MongoDBAdapter(mongoClientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn(context) {
      const allowedEmailAccounts = ['seanhasenstein@gmail.com'];
      if (
        context.user.email &&
        allowedEmailAccounts.includes(context.user.email)
      ) {
        return true;
      } else {
        return '/unauthorized';
      }
    },
  },
  pages: {
    signIn: '/login',
    error: '/authentication-error',
    verifyRequest: '/verify-login',
  },
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
});
