const apiInfo = {
  dev: {
    protocol: "http",
    url: "localhost",
    port: 2000,
  },
  pro: {},
};

function isLocalEnvironment() {
  const ipAddress = window.location.hostname;

  // Regex pattern for local IP address ranges
  const localIPRegex = /^(127\.0\.0\.1|::1|localhost|192\.168\.|10\.|172\.)/;

  return localIPRegex.test(ipAddress);
}

function protocol() {
  return isLocalEnvironment() ? apiInfo.dev.protocol : apiInfo.pro.protocol;
}

function getPort() {
  return isLocalEnvironment() ? apiInfo.dev.port : apiInfo.pro.port;
}

function getApiUrl() {
  return isLocalEnvironment() ? apiInfo.dev.url : apiInfo.pro.url;
}

export default {
  getPort,
  getApiUrl,
  isLocalEnvironment,
  protocol,
};
