import styled from 'styled-components/macro';
import { wideFont } from '../../shared/helpers';

const HeaderBalanceText = styled.span`
  ${wideFont};

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${props => props.theme.mutedText};
`;

export default HeaderBalanceText;
