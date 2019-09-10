import { pause } from '~/utils';

const createAppleServiceMock = () => {
  const uploadDevDomainAssociationFile = async () => {
    await pause(400);
  };

  const uploadAppSiteAssociationFile = async () => {
    await pause(400);
  };

  return {
    uploadDevDomainAssociationFile,
    uploadAppSiteAssociationFile,
  };
};

export default createAppleServiceMock;
