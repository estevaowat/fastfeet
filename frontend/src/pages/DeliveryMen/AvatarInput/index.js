import React, { useEffect, useState, useRef } from 'react';
import { MdImage } from 'react-icons/md';
import { useField } from '@unform/core';
import { Container, Preview } from './styles';
import { colourOptions } from '~/utils/colors';

export default function AvatarInput({ name, ...rest }) {
  const [backgroundColor, setBackgroundColor] = useState('');

  useEffect(() => {
    const colorRandom = Math.round(Math.random() * (colourOptions.length - 1));

    setBackgroundColor(colourOptions[colorRandom]);
  }, []);

  return (
    <Container>
      <label htmlFor={name}>
        <Preview backgroundColor={backgroundColor}>
          <MdImage size={40} color="#DDD" />
          Adicionar foto
        </Preview>

        <input type="file" id={name} accept="image/*" />
      </label>
    </Container>
  );
}
