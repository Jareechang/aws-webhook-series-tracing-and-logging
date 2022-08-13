import CommonError from './common-error';

class AwsSqsServiceError extends CommonError {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export default AwsSqsServiceError;
