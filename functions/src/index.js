"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRecaptcha = void 0;
const functions = __importStar(require("firebase-functions"));
const axios_1 = __importDefault(require("axios"));
const RECAPTCHA_SECRET_KEY = 'YOUR_SECRET_KEY'; // Замініть на ваш секретний ключ reCAPTCHA
exports.verifyRecaptcha = functions.https.onRequest((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Перевірка методу запиту (тільки POST)
    if (req.method !== 'POST') {
        res.status(405).send({ error: 'Only POST requests are accepted' });
        return; // Потрібно повернути після відправки відповіді
    }
    try {
        const token = req.body.token; // Отримуємо токен reCAPTCHA з клієнта
        if (!token) {
            res.status(400).send({ error: 'Token is required' });
            return; // Потрібно повернути після відправки відповіді
        }
        // Відправляємо запит на Google API для перевірки токена
        const response = yield axios_1.default.post('https://www.google.com/recaptcha/api/siteverify', null, {
            params: {
                secret: RECAPTCHA_SECRET_KEY,
                response: token,
            },
        });
        const data = response.data;
        // Перевірка валідності токена
        if (!data.success) {
            res.status(400).send({ error: 'Invalid reCAPTCHA token' });
            return; // Потрібно повернути після відправки відповіді
        }
        // Успішна перевірка
        res.status(200).send({ success: true, score: data.score });
    }
    catch (error) {
        console.error('Error verifying reCAPTCHA:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}));
