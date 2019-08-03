import React from 'react';
import styled from 'styled-components/macro';
import HeaderNavLink from '../NavLink';
import HeaderBalanceText from './Text';

const Wrapper = styled(HeaderNavLink)`
  flex-shrink: 1;
  border-left: 1px solid ${props => props.theme.border};
  border-right: 1px solid ${props => props.theme.border};
  min-width: 0;
`;

const HeaderBalance = props => (
  <Wrapper to={`/u/${props.username}`}>
    <HeaderBalanceText>{`${props.balance} CRDD`}</HeaderBalanceText>
  </Wrapper>
);

export default HeaderBalance;
