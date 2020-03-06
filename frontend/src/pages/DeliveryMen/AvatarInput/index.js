import React, { useRef, useEffect, useState } from 'react';
import { MdImage } from 'react-icons/md';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import { Container, AddPhoto } from './styles';
import api from '~/services/api';

export default function ImageInput({ name, image, ...rest }) {
  const { registerField, defaultValue } = useField('avatar_id');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const inputRef = useRef();

  async function handlePreview(e) {
    if (!e.target.files[0]) {
      setPreview(null);
    } else {
      const previewURL = URL.createObjectURL(e.target.files[0]);
      setPreview(previewURL);
    }

    const data = new FormData();

    data.append('file', e.target.files[0]);

    if (file) {
      const response = await api.post('files', data);
      const { id, url } = response.data;
      setFile(id);
      setPreview(url);
    } else {
      const response = await api.post(`files/${file}`, data);

      const { url } = response.data;
      setPreview(url);
    }
  }

  useEffect(() => {
    registerField({
      name,
      ref: inputRef.current,
      path: 'dataset.file',
      clearValue(ref) {
        ref.value = '';
        setPreview(null);
      },
      setValue(_, value) {
        setFile(value);
      }
    });
  }, [name, registerField]);

  return (
    <Container>
      <label htmlFor="avatar">
        {!preview && (
          <AddPhoto>
            <MdImage size={40} color="#DDD" />
            Adicionar foto
          </AddPhoto>
        )}

        {preview && <img src={preview} alt="Preview" />}
        <input
          id="avatar"
          type="file"
          data-file={file}
          ref={inputRef}
          accept="image/*"
          onChange={handlePreview}
          {...rest}
        />
      </label>
    </Container>
  );
}

ImageInput.propTypes = {
  name: PropTypes.string.isRequired
};
