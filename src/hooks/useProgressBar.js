import { useContext } from 'react';
import { ProgressBarContext } from '~/components/shared/TopProgressBar';

const useProgressBar = () => {
  return useContext(ProgressBarContext);
};

export default useProgressBar;
