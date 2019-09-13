import { pause } from '~/utils';

const createAppleServiceMock = () => {
  const uploadDevDomainAssociationFile = async () => {
    await pause(400);
  };

  const uploadAppSiteAssociationFileContents = async () => {
    await pause(400);
  };

  return {
    uploadDevDomainAssociationFile,
    uploadAppSiteAssociationFileContents,
  };
};

export default createAppleServiceMock;
