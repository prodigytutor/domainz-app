const db = require('../models');
const Users = db.users;

const Apis = db.apis;

const Domains = db.domains;

const Hostings = db.hostings;

const Websites = db.websites;

const AssetFarms = db.asset_farms;

const Subdomains = db.subdomains;

const ApisData = [
  {
    url: 'https://api.example.com',

    host: 'api.example.com',

    api_credentials: 'api_key:12345',

    monitoring_info: 'Uptime: 99.9%',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    url: 'https://api.mywebsite.org',

    host: 'api.mywebsite.org',

    api_credentials: 'api_key:67890',

    monitoring_info: 'Uptime: 99.8%',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    url: 'https://api.techhub.net',

    host: 'api.techhub.net',

    api_credentials: 'api_key:54321',

    monitoring_info: 'Uptime: 99.7%',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    url: 'https://api.creativelabs.io',

    host: 'api.creativelabs.io',

    api_credentials: 'api_key:98765',

    monitoring_info: 'Uptime: 99.6%',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    url: 'https://api.nextgen.dev',

    host: 'api.nextgen.dev',

    api_credentials: 'api_key:11223',

    monitoring_info: 'Uptime: 99.5%',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const DomainsData = [
  {
    name: 'example.com',

    url: 'https://example.com',

    registrar: 'GoDaddy',

    price: 12.99,

    registration_date: new Date('2022-01-15T00:00:00Z'),

    renewal_date: new Date('2023-01-15T00:00:00Z'),

    name_servers: 'ns1.example.com, ns2.example.com',

    dns_records: 'A: 192.0.2.1, MX: mail.example.com',

    admin_credentials: 'admin:password',

    // type code here for "relation_one" field
  },

  {
    name: 'mywebsite.org',

    url: 'https://mywebsite.org',

    registrar: 'Namecheap',

    price: 9.99,

    registration_date: new Date('2021-05-20T00:00:00Z'),

    renewal_date: new Date('2022-05-20T00:00:00Z'),

    name_servers: 'ns1.mywebsite.org, ns2.mywebsite.org',

    dns_records: 'A: 192.0.2.2, MX: mail.mywebsite.org',

    admin_credentials: 'admin:password',

    // type code here for "relation_one" field
  },

  {
    name: 'techhub.net',

    url: 'https://techhub.net',

    registrar: 'Bluehost',

    price: 15.99,

    registration_date: new Date('2020-11-10T00:00:00Z'),

    renewal_date: new Date('2021-11-10T00:00:00Z'),

    name_servers: 'ns1.techhub.net, ns2.techhub.net',

    dns_records: 'A: 192.0.2.3, MX: mail.techhub.net',

    admin_credentials: 'admin:password',

    // type code here for "relation_one" field
  },

  {
    name: 'creativelabs.io',

    url: 'https://creativelabs.io',

    registrar: 'HostGator',

    price: 10.99,

    registration_date: new Date('2021-03-25T00:00:00Z'),

    renewal_date: new Date('2022-03-25T00:00:00Z'),

    name_servers: 'ns1.creativelabs.io, ns2.creativelabs.io',

    dns_records: 'A: 192.0.2.4, MX: mail.creativelabs.io',

    admin_credentials: 'admin:password',

    // type code here for "relation_one" field
  },

  {
    name: 'nextgen.dev',

    url: 'https://nextgen.dev',

    registrar: 'Google Domains',

    price: 8.99,

    registration_date: new Date('2022-07-30T00:00:00Z'),

    renewal_date: new Date('2023-07-30T00:00:00Z'),

    name_servers: 'ns1.nextgen.dev, ns2.nextgen.dev',

    dns_records: 'A: 192.0.2.5, MX: mail.nextgen.dev',

    admin_credentials: 'admin:password',

    // type code here for "relation_one" field
  },
];

const HostingsData = [
  {
    provider: 'AWS',

    account_credentials: 'aws_key:12345',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    provider: 'Azure',

    account_credentials: 'azure_key:67890',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    provider: 'Google Cloud',

    account_credentials: 'gcloud_key:54321',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    provider: 'DigitalOcean',

    account_credentials: 'do_key:98765',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    provider: 'Heroku',

    account_credentials: 'heroku_key:11223',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const WebsitesData = [
  {
    url: 'https://example.com',

    host: 'example.com',

    site_credentials: 'user:password',

    monitoring_info: 'Uptime: 99.9%',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    url: 'https://blog.example.com',

    host: 'blog.example.com',

    site_credentials: 'user:password',

    monitoring_info: 'Uptime: 99.8%',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    url: 'https://mywebsite.org',

    host: 'mywebsite.org',

    site_credentials: 'user:password',

    monitoring_info: 'Uptime: 99.7%',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    url: 'https://shop.mywebsite.org',

    host: 'shop.mywebsite.org',

    site_credentials: 'user:password',

    monitoring_info: 'Uptime: 99.6%',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    url: 'https://techhub.net',

    host: 'techhub.net',

    site_credentials: 'user:password',

    monitoring_info: 'Uptime: 99.5%',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const AssetFarmsData = [
  {
    name: 'Tech Innovators',
  },

  {
    name: 'Web Solutions',
  },

  {
    name: 'Digital Pioneers',
  },

  {
    name: 'Creative Minds',
  },

  {
    name: 'NextGen Developers',
  },
];

const SubdomainsData = [
  {
    url: 'https://sub.example.com',

    host: 'sub.example.com',

    site_credentials: 'user:password',

    monitoring_info: 'Uptime: 99.9%',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    url: 'https://sub.mywebsite.org',

    host: 'sub.mywebsite.org',

    site_credentials: 'user:password',

    monitoring_info: 'Uptime: 99.8%',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    url: 'https://sub.techhub.net',

    host: 'sub.techhub.net',

    site_credentials: 'user:password',

    monitoring_info: 'Uptime: 99.7%',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    url: 'https://sub.creativelabs.io',

    host: 'sub.creativelabs.io',

    site_credentials: 'user:password',

    monitoring_info: 'Uptime: 99.6%',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    url: 'https://sub.nextgen.dev',

    host: 'sub.nextgen.dev',

    site_credentials: 'user:password',

    monitoring_info: 'Uptime: 99.5%',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

// Similar logic for "relation_many"

async function associateUserWithAsset_farm() {
  const relatedAsset_farm0 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setAsset_farm) {
    await User0.setAsset_farm(relatedAsset_farm0);
  }

  const relatedAsset_farm1 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setAsset_farm) {
    await User1.setAsset_farm(relatedAsset_farm1);
  }

  const relatedAsset_farm2 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setAsset_farm) {
    await User2.setAsset_farm(relatedAsset_farm2);
  }

  const relatedAsset_farm3 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const User3 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (User3?.setAsset_farm) {
    await User3.setAsset_farm(relatedAsset_farm3);
  }

  const relatedAsset_farm4 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const User4 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (User4?.setAsset_farm) {
    await User4.setAsset_farm(relatedAsset_farm4);
  }
}

async function associateApiWithDomain() {
  const relatedDomain0 = await Domains.findOne({
    offset: Math.floor(Math.random() * (await Domains.count())),
  });
  const Api0 = await Apis.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Api0?.setDomain) {
    await Api0.setDomain(relatedDomain0);
  }

  const relatedDomain1 = await Domains.findOne({
    offset: Math.floor(Math.random() * (await Domains.count())),
  });
  const Api1 = await Apis.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Api1?.setDomain) {
    await Api1.setDomain(relatedDomain1);
  }

  const relatedDomain2 = await Domains.findOne({
    offset: Math.floor(Math.random() * (await Domains.count())),
  });
  const Api2 = await Apis.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Api2?.setDomain) {
    await Api2.setDomain(relatedDomain2);
  }

  const relatedDomain3 = await Domains.findOne({
    offset: Math.floor(Math.random() * (await Domains.count())),
  });
  const Api3 = await Apis.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Api3?.setDomain) {
    await Api3.setDomain(relatedDomain3);
  }

  const relatedDomain4 = await Domains.findOne({
    offset: Math.floor(Math.random() * (await Domains.count())),
  });
  const Api4 = await Apis.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Api4?.setDomain) {
    await Api4.setDomain(relatedDomain4);
  }
}

async function associateApiWithAsset_farm() {
  const relatedAsset_farm0 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const Api0 = await Apis.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Api0?.setAsset_farm) {
    await Api0.setAsset_farm(relatedAsset_farm0);
  }

  const relatedAsset_farm1 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const Api1 = await Apis.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Api1?.setAsset_farm) {
    await Api1.setAsset_farm(relatedAsset_farm1);
  }

  const relatedAsset_farm2 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const Api2 = await Apis.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Api2?.setAsset_farm) {
    await Api2.setAsset_farm(relatedAsset_farm2);
  }

  const relatedAsset_farm3 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const Api3 = await Apis.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Api3?.setAsset_farm) {
    await Api3.setAsset_farm(relatedAsset_farm3);
  }

  const relatedAsset_farm4 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const Api4 = await Apis.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Api4?.setAsset_farm) {
    await Api4.setAsset_farm(relatedAsset_farm4);
  }
}

async function associateDomainWithAsset_farm() {
  const relatedAsset_farm0 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const Domain0 = await Domains.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Domain0?.setAsset_farm) {
    await Domain0.setAsset_farm(relatedAsset_farm0);
  }

  const relatedAsset_farm1 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const Domain1 = await Domains.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Domain1?.setAsset_farm) {
    await Domain1.setAsset_farm(relatedAsset_farm1);
  }

  const relatedAsset_farm2 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const Domain2 = await Domains.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Domain2?.setAsset_farm) {
    await Domain2.setAsset_farm(relatedAsset_farm2);
  }

  const relatedAsset_farm3 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const Domain3 = await Domains.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Domain3?.setAsset_farm) {
    await Domain3.setAsset_farm(relatedAsset_farm3);
  }

  const relatedAsset_farm4 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const Domain4 = await Domains.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Domain4?.setAsset_farm) {
    await Domain4.setAsset_farm(relatedAsset_farm4);
  }
}

async function associateHostingWithDomain() {
  const relatedDomain0 = await Domains.findOne({
    offset: Math.floor(Math.random() * (await Domains.count())),
  });
  const Hosting0 = await Hostings.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Hosting0?.setDomain) {
    await Hosting0.setDomain(relatedDomain0);
  }

  const relatedDomain1 = await Domains.findOne({
    offset: Math.floor(Math.random() * (await Domains.count())),
  });
  const Hosting1 = await Hostings.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Hosting1?.setDomain) {
    await Hosting1.setDomain(relatedDomain1);
  }

  const relatedDomain2 = await Domains.findOne({
    offset: Math.floor(Math.random() * (await Domains.count())),
  });
  const Hosting2 = await Hostings.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Hosting2?.setDomain) {
    await Hosting2.setDomain(relatedDomain2);
  }

  const relatedDomain3 = await Domains.findOne({
    offset: Math.floor(Math.random() * (await Domains.count())),
  });
  const Hosting3 = await Hostings.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Hosting3?.setDomain) {
    await Hosting3.setDomain(relatedDomain3);
  }

  const relatedDomain4 = await Domains.findOne({
    offset: Math.floor(Math.random() * (await Domains.count())),
  });
  const Hosting4 = await Hostings.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Hosting4?.setDomain) {
    await Hosting4.setDomain(relatedDomain4);
  }
}

async function associateHostingWithAsset_farm() {
  const relatedAsset_farm0 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const Hosting0 = await Hostings.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Hosting0?.setAsset_farm) {
    await Hosting0.setAsset_farm(relatedAsset_farm0);
  }

  const relatedAsset_farm1 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const Hosting1 = await Hostings.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Hosting1?.setAsset_farm) {
    await Hosting1.setAsset_farm(relatedAsset_farm1);
  }

  const relatedAsset_farm2 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const Hosting2 = await Hostings.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Hosting2?.setAsset_farm) {
    await Hosting2.setAsset_farm(relatedAsset_farm2);
  }

  const relatedAsset_farm3 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const Hosting3 = await Hostings.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Hosting3?.setAsset_farm) {
    await Hosting3.setAsset_farm(relatedAsset_farm3);
  }

  const relatedAsset_farm4 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const Hosting4 = await Hostings.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Hosting4?.setAsset_farm) {
    await Hosting4.setAsset_farm(relatedAsset_farm4);
  }
}

async function associateWebsiteWithDomain() {
  const relatedDomain0 = await Domains.findOne({
    offset: Math.floor(Math.random() * (await Domains.count())),
  });
  const Website0 = await Websites.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Website0?.setDomain) {
    await Website0.setDomain(relatedDomain0);
  }

  const relatedDomain1 = await Domains.findOne({
    offset: Math.floor(Math.random() * (await Domains.count())),
  });
  const Website1 = await Websites.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Website1?.setDomain) {
    await Website1.setDomain(relatedDomain1);
  }

  const relatedDomain2 = await Domains.findOne({
    offset: Math.floor(Math.random() * (await Domains.count())),
  });
  const Website2 = await Websites.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Website2?.setDomain) {
    await Website2.setDomain(relatedDomain2);
  }

  const relatedDomain3 = await Domains.findOne({
    offset: Math.floor(Math.random() * (await Domains.count())),
  });
  const Website3 = await Websites.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Website3?.setDomain) {
    await Website3.setDomain(relatedDomain3);
  }

  const relatedDomain4 = await Domains.findOne({
    offset: Math.floor(Math.random() * (await Domains.count())),
  });
  const Website4 = await Websites.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Website4?.setDomain) {
    await Website4.setDomain(relatedDomain4);
  }
}

async function associateWebsiteWithAsset_farm() {
  const relatedAsset_farm0 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const Website0 = await Websites.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Website0?.setAsset_farm) {
    await Website0.setAsset_farm(relatedAsset_farm0);
  }

  const relatedAsset_farm1 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const Website1 = await Websites.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Website1?.setAsset_farm) {
    await Website1.setAsset_farm(relatedAsset_farm1);
  }

  const relatedAsset_farm2 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const Website2 = await Websites.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Website2?.setAsset_farm) {
    await Website2.setAsset_farm(relatedAsset_farm2);
  }

  const relatedAsset_farm3 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const Website3 = await Websites.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Website3?.setAsset_farm) {
    await Website3.setAsset_farm(relatedAsset_farm3);
  }

  const relatedAsset_farm4 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const Website4 = await Websites.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Website4?.setAsset_farm) {
    await Website4.setAsset_farm(relatedAsset_farm4);
  }
}

async function associateSubdomainWithDomain() {
  const relatedDomain0 = await Domains.findOne({
    offset: Math.floor(Math.random() * (await Domains.count())),
  });
  const Subdomain0 = await Subdomains.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Subdomain0?.setDomain) {
    await Subdomain0.setDomain(relatedDomain0);
  }

  const relatedDomain1 = await Domains.findOne({
    offset: Math.floor(Math.random() * (await Domains.count())),
  });
  const Subdomain1 = await Subdomains.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Subdomain1?.setDomain) {
    await Subdomain1.setDomain(relatedDomain1);
  }

  const relatedDomain2 = await Domains.findOne({
    offset: Math.floor(Math.random() * (await Domains.count())),
  });
  const Subdomain2 = await Subdomains.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Subdomain2?.setDomain) {
    await Subdomain2.setDomain(relatedDomain2);
  }

  const relatedDomain3 = await Domains.findOne({
    offset: Math.floor(Math.random() * (await Domains.count())),
  });
  const Subdomain3 = await Subdomains.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Subdomain3?.setDomain) {
    await Subdomain3.setDomain(relatedDomain3);
  }

  const relatedDomain4 = await Domains.findOne({
    offset: Math.floor(Math.random() * (await Domains.count())),
  });
  const Subdomain4 = await Subdomains.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Subdomain4?.setDomain) {
    await Subdomain4.setDomain(relatedDomain4);
  }
}

async function associateSubdomainWithAsset_farm() {
  const relatedAsset_farm0 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const Subdomain0 = await Subdomains.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Subdomain0?.setAsset_farm) {
    await Subdomain0.setAsset_farm(relatedAsset_farm0);
  }

  const relatedAsset_farm1 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const Subdomain1 = await Subdomains.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Subdomain1?.setAsset_farm) {
    await Subdomain1.setAsset_farm(relatedAsset_farm1);
  }

  const relatedAsset_farm2 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const Subdomain2 = await Subdomains.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Subdomain2?.setAsset_farm) {
    await Subdomain2.setAsset_farm(relatedAsset_farm2);
  }

  const relatedAsset_farm3 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const Subdomain3 = await Subdomains.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Subdomain3?.setAsset_farm) {
    await Subdomain3.setAsset_farm(relatedAsset_farm3);
  }

  const relatedAsset_farm4 = await AssetFarms.findOne({
    offset: Math.floor(Math.random() * (await AssetFarms.count())),
  });
  const Subdomain4 = await Subdomains.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Subdomain4?.setAsset_farm) {
    await Subdomain4.setAsset_farm(relatedAsset_farm4);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Apis.bulkCreate(ApisData);

    await Domains.bulkCreate(DomainsData);

    await Hostings.bulkCreate(HostingsData);

    await Websites.bulkCreate(WebsitesData);

    await AssetFarms.bulkCreate(AssetFarmsData);

    await Subdomains.bulkCreate(SubdomainsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithAsset_farm(),

      await associateApiWithDomain(),

      await associateApiWithAsset_farm(),

      await associateDomainWithAsset_farm(),

      await associateHostingWithDomain(),

      await associateHostingWithAsset_farm(),

      await associateWebsiteWithDomain(),

      await associateWebsiteWithAsset_farm(),

      await associateSubdomainWithDomain(),

      await associateSubdomainWithAsset_farm(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('apis', null, {});

    await queryInterface.bulkDelete('domains', null, {});

    await queryInterface.bulkDelete('hostings', null, {});

    await queryInterface.bulkDelete('websites', null, {});

    await queryInterface.bulkDelete('asset_farms', null, {});

    await queryInterface.bulkDelete('subdomains', null, {});
  },
};
