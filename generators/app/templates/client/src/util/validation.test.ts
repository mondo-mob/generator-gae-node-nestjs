import { isEmail, minLength, required } from "./validation";

describe('validation', () => {

  describe('required', () => {
    const validator = required('validation failed message');

    it('returns message when value not present', () => {
      [null, undefined, ''].forEach(value => {
        expect(validator(value)).toBe('validation failed message');
      })
    });

    it('returns undefined when value is present', () => {
      ['0', 'value'].forEach(value => {
        console.log('Validating: ', value);
        expect(validator(value)).toBeUndefined();
      })
    });
  });

  describe('isEmail', () => {
    const validator = isEmail('validation failed message');

    it('returns undefined when value not present', () => {
      [null, undefined, ''].forEach(value => {
        expect(validator(value)).toBeUndefined();
      })
    });

    it('returns undefined when valid email', () => {
      ['foo-to.be@bar.com', `michael.o'leary!@ryanair.com`].forEach(value => {
        console.log('Validating: ', value);
        expect(validator(value)).toBeUndefined();
      })
    });

    it('returns message when value is invalid email', () => {
      ['@email.com', 'value', ' ', 'foo@', 'Joe Smith <email@example.com>'].forEach(value => {
        console.log('Validating: ', value);
        expect(validator(value)).toBe('validation failed message');
      })
    });
  });

  describe('minLength', () => {
    const validator = minLength('validation failed message', 2);

    it('returns undefined values meet min length', () => {
      [['1', '2'], ['', '', '']].forEach(value => {
        console.log('Validating: ', value);
        expect(validator(value)).toBeUndefined();
      })
    });

    it('returns message when value not present', () => {
      [null, undefined].forEach(value => {
        expect(validator(value)).toBe('validation failed message');
      })
    });

    it('returns message values below min length', () => {
      [[], ['1']].forEach(value => {
        console.log('Validating: ', value);
        expect(validator(value)).toBe('validation failed message');
      })
    });
  });

});
