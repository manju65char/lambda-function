import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambdaNodejs from '@aws-cdk/aws-lambda-nodejs';

export class AppLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create a new Lambda function
    const lambdaFn = new lambdaNodejs.NodejsFunction(this, 'AppLambda', {
      entry: './lambda-handler.ts',
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_14_X,
    });
  }
}
