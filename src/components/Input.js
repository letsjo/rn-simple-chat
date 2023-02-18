import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.View`
  flex-direction: column;
  width: 100%;
  margin: 10px 0;
`

const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  color: ${({ theme, isFocused }) => (isFocused ? theme.text : theme.label)};
`

const StyledTextInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.inputPlaceholder,
}))`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding: 20px 10px;
  font-size: 16px;
  border: 1px solid ${({ theme, isFocused }) => (isFocused ? theme.text : theme.inputBorder)};
  border-radius: 4px;
`;

const Input = ({
  label,
  value,
  onChangeText,
  onSubmitEditing,
  onBlur,
  placeholder,
  isPassword,
  returnKeyType,
  maxLength,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container>
      <Label isFocused={ isFocused }>{ label }</Label>
      <StyledTextInput
        isFocused={ isFocused }
        value={ value }
        onChangeText={ onChangeText }
        onSubmitEditing={ onSubmitEditing }
        onFocus={ () => setIsFocused(true) }
        onBlur={ () => {
          setIsFocused(false);
          onBlur();
        } }
        placeholder={ placeholder }
        secureTextEntry={ isPassword }
        returnKeyType={ returnKeyType }
        maxLength={ maxLength }
        autoCapitalize='none'
        textContentType='none'
        underlineColorAndroid='transparent'
      />
    </Container>
  )
}

Input.defaultProps = {
  onBlur: () => { },
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  isPassword: PropTypes.bool,
  returnKeyType: PropTypes.oneOf(['done', 'text']),
  maxLength: PropTypes.number,
}

export default Input;
