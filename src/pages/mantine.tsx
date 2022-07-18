import {
  ActionIcon,
  Container,
  TextInput,
  useMantineColorScheme,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Badge, MoonStars, Sun } from 'tabler-icons-react'

const Mantine = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const matches = useMediaQuery('(min-width: 900px)')

  return (
    <Container>
      <ActionIcon variant="default" onClick={() => toggleColorScheme()}>
        {colorScheme === 'dark' ? <Sun /> : <MoonStars />}
      </ActionIcon>
      <TextInput />
    </Container>
  )
}

export default Mantine
