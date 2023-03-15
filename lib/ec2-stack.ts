import * as cdk from 'aws-cdk-lib';
import { App, Stack, StackProps } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

class EC2Stack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create VPC
    const vpc = new ec2.Vpc(this, 'MyVpc', {
      cidr: '10.0.0.0/16',
      maxAzs: 2,
      natGateways: 1,
    });

    // Create Security Group
    const securityGroup = new ec2.SecurityGroup(this, 'devops-security-group', {
      vpc,
      securityGroupName: 'devops-security-group',
      description: 'DevOps Security Group',
    });

    // Allow inbound traffic on port 80
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80));

    // Create EC2 Instance
    const ec2Instance = new ec2.Instance(this, 'QA-server', {
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: new ec2.AmazonLinuxImage(),
      vpc,
      securityGroup,
    });

    // Add a tag to the EC2 instance
    cdk.Tags.of(ec2Instance).add('Name', 'QA-server');
  }
}

const app = new App();

new EC2Stack(app, 'MyEC2Stack');

app.synth();
