const createAppleService = ({ httpClient }) => {
  const uploadDevDomainAssociationFile = (file) => {
    const data = new FormData();
    const url = `${process.env.API_URL}/settings/uploads/apple-domain-association`;

    data.append('file', file);

    return httpClient.post(url, data);
  };

  const uploadAppSiteAssociationFile = (fileContent) => {
    const url = `${process.env.API_URL}/settings/uploads/apple-app-site-association`;
    const body = {
      contents: fileContent,
    };

    return httpClient.post(url, body);
  };

  return {
    uploadAppSiteAssociationFile,
    uploadDevDomainAssociationFile,
  };
};

export default createAppleService;
