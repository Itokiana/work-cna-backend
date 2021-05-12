/**
 * Defines Custom method types over Express's Request
 *
 * @author Mike Christopher SYLVESTRE <faiz@geeekyants.com>
 */

import { Request } from 'express';
import * as multer from 'multer';

export interface IRequest extends Request {
    flash(message: string, callback: any): any;

    file: multer.file;

    logIn(user: any, callback: any): any;
    user(): any;
    logout(): void;
}
