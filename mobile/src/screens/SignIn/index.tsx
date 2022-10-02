import { Image, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as AuthSession from 'expo-auth-session'

import { Background } from '../../components/Background'
import { Heading } from '../../components/Heading'

import { THEME } from '../../theme'
import { styles } from './styles'
import logoImg from '../../assets/logo-nlw-esports.png'
import { GameController } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'

type AuthResponse = {
  params: {
    access_token: string
  },
  type: string
}

export function SignIn() {

  const navigation = useNavigation()

  function handleGoHome() {
    navigation.navigate('home')
  }

  async function handleDicordSignIn() {
    const res = await AuthSession.startAsync({ 
      authUrl: 'https://discord.com/api/oauth2/authorize?client_id=1025828361546764439&redirect_uri=https%3A%2F%2Fauth.expo.io%2F%40fpstos%2Fmobile&response_type=token&scope=identify' 
    }) as AuthResponse

    fetch('https://discord.com/api/users/@me', {
      headers: {
        'authorization': `Bearer ${res.params.access_token}`
      }
    })
    .then(res => res.json())
    .then(() => handleGoHome());
  }

  return(
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading 
          title='Entrar'
          subtitle='Encontre seu duo para jogar.'
        />

        <TouchableOpacity 
          style={styles.button}
          onPress={handleDicordSignIn}
        >
          <GameController 
            color={THEME.COLORS.TEXT}
            size={20}
          />

          <Text style={styles.buttonTitle}>
            Entrar com Discord
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Background>
  )
}