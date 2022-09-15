import { ImageBackground } from 'react-native';

import imageBackground from '../../assets/background-galaxy.png'

import { styles } from './styles';

interface Props {
  children: React.ReactNode
}

export function Background({ children }: Props) {
  return (
    <ImageBackground 
      source={imageBackground}
      defaultSource={imageBackground}
      style={styles.container}
    >
      {children}
    </ImageBackground>
  );
}