const AWS = require('aws-sdk');

const fetchSubnetIds = async (region) => {
  AWS.config.update({
    region,
  });

  const ec2 = new AWS.EC2();
  
  const result = await ec2.describeSubnets().promise();
  
  if (!result.Subnets) {
    return [];
  }

  const subnetIds = result.Subnets.map((item) => (item?.SubnetId));

  return subnetIds;
};

const fetchSecurityGroupIds = async (region) => {
  AWS.config.update({
    region,
  });

  const ec2 = new AWS.EC2();
  
  const result = await ec2.describeSecurityGroups().promise();
  
  if (!result.SecurityGroups) {
    return [];
  }

  const securityGroupIds = result.SecurityGroups.map((item) => (item?.GroupId));

  return securityGroupIds;
};

const buildTimeAsCron = (secsInFuture = 0) => {
  const timestamp = Date.now() + (secsInFuture * 1000);

  const date = new Date(timestamp);

  // example: cron(59 23 31 12 ? 1999) (one minute to the new millenium in 2000)
  return `cron(${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth() + 1} ? ${date.getFullYear()})`;
};

module.exports = async ({ resolveVariable }) => {
  const region = await resolveVariable('opt:region, self:provider.region, "eu-west-1"');
  const subnetIds = await fetchSubnetIds(region);
  const securityGroupIds = await fetchSecurityGroupIds(region);

  const secsInFuture = 300;
  const timeAsCron = buildTimeAsCron(secsInFuture);

  return {
    subnetIds,
    securityGroupIds,
    timeAsCron,
  }
}
