/**
 *
 * T
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { PropTypes } from 'prop-types';
import If from '@components/If';
import { fonts } from '@app/themes';

const StyledParagraph = styled.p`
  && {
    ${props => props.marginBottom && `margin-bottom: ${props.marginBottom}px;`};
    ${props => props.font()};
  }
`;

const StyledSpan = styled.span`
  && {
    ${props => props.marginBottom && `margin-bottom: ${props.marginBottom}px;`};
    ${props => props.font()};
  }
`;
const getFontStyle = type => (fonts.style[type] ? fonts.style[type] : () => {});
export const T = ({ type, text, id, marginBottom, values, span, ...otherProps }) => {
  const TextContainer = span ? StyledSpan : StyledParagraph;
  return (
    <TextContainer data-testid="t" font={getFontStyle(type)} marginBottom={marginBottom} {...otherProps}>
      <If condition={id} otherwise={text}>
        <FormattedMessage id={id} values={values} />
      </If>
    </TextContainer>
  );
};

T.propTypes = {
  id: PropTypes.string,
  marginBottom: PropTypes.number,
  span: PropTypes.bool,
  values: PropTypes.object,
  text: PropTypes.string,
  type: PropTypes.oneOfType(Object.keys(fonts.style))
};

T.defaultProps = {
  values: {},
  type: 'standard'
};

const TextComponent = memo(T);
export default TextComponent;
