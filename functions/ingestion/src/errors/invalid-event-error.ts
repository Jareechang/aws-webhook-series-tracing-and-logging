import CommonError from './common-error';

class InvalidEventError extends CommonError {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export default InvalidEventError;
