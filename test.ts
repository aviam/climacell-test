import { Router } from 'express';
import * as restify from 'express-restify-mongoose';
import { User } from '@codespread/database-repo';

export const users = Router();

restify.serve(users, User, { prefix: '', version: '' });

console.log('test')
