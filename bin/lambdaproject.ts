#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AppLambdaStack } from '../lib/lambdaproject-stack';

const app = new cdk.App();
new AppLambdaStack(app, 'AppLambdaStack');
