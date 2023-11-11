import { useMemo } from 'react';
import { RemoteReveal, WrappedRemoteReveal } from '../types';

const URL_SAFE_ENCODE: Record<string, string> = {
  '+': '-',
  '/': '_',
};

const URL_SAFE_DECODE: Record<string, string> = {
  '-': '+',
  _: '/',
  '.': '=',
};

const toBase64 = (buffer: Uint8Array): string =>
  btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')).replace(
    /[+/]/g,
    (m) => URL_SAFE_ENCODE[m],
  );

const toBuffer = (base64: string): Uint8Array =>
  Uint8Array.from(atob(base64.replace(/[-_.]/g, (m) => URL_SAFE_DECODE[m])), (ch) => ch.charCodeAt(0));

const getPasswordKey = (password: string) =>
  window.crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);

const deriveKey = (passwordKey: CryptoKey, salt: Uint8Array, keyUsage: Iterable<KeyUsage>) =>
  window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 250000,
      hash: 'SHA-256',
    },
    passwordKey,
    { name: 'AES-GCM', length: 256 },
    false,
    keyUsage,
  );

const wrap = async (reveal: RemoteReveal, password: string): Promise<WrappedRemoteReveal> => {
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  const passwordKey = await getPasswordKey(password);
  const aesKey = await deriveKey(passwordKey, salt, ['encrypt']);
  const wrapped = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    aesKey,
    new TextEncoder().encode(JSON.stringify(reveal)),
  );

  const wrappedArr = new Uint8Array(wrapped);

  const buffer = new Uint8Array(salt.byteLength + iv.byteLength + wrappedArr.byteLength);
  buffer.set(salt, 0);
  buffer.set(iv, salt.byteLength);
  buffer.set(wrappedArr, salt.byteLength + iv.byteLength);

  return toBase64(buffer);
};

const unwrap = async (wrapped: WrappedRemoteReveal, password: string): Promise<RemoteReveal> => {
  const wrappedBuffer = toBuffer(wrapped);
  const salt = wrappedBuffer.slice(0, 16);
  const iv = wrappedBuffer.slice(16, 16 + 12);
  const data = wrappedBuffer.slice(16 + 12);

  const passwordKey = await getPasswordKey(password);
  const aesKey = await deriveKey(passwordKey, salt, ['decrypt']);
  const unwrapped = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    aesKey,
    data,
  );

  return JSON.parse(new TextDecoder().decode(unwrapped)) as RemoteReveal;
};

export const useRemoteReveal = (password: string) => {
  return useMemo(
    () => ({
      wrap: (reveal: RemoteReveal) => wrap(reveal, password),
      unwrap: (wrapped: WrappedRemoteReveal) => unwrap(wrapped, password),
    }),
    [password],
  );
};
